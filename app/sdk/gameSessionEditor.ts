import Puzzle from "./challenges/Puzzle";
import type { ContextObject } from "./challenges/puzzleSpec/getContextObjectData";

const Artifact = require('app/sdk/artifacts/artifact');
const audio_engine = require('app/audio/audio_engine');
const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');
const Modifier = require('app/sdk/modifiers/modifier');
const RSX = require('app/data/resources');

const enum Mode {
  Edit,
  Play,
  Setup,
}

const cachedCardsByType: Record<typeof CardType, typeof Card[]> = {};
const editingBench: typeof Card[] = [];
const mode: Mode = Mode.Play;
export const editorProperties = {
  cachedCardsByType,
  editingBench,
  mode,
};

export function copyCard(
  this: typeof GameSession,
  oldCard: typeof Card,
): typeof Card {
  const card = this.createCardForIdentifier(oldCard.getId());
  this._indexCardAsNeeded(card);
  return card;
}

export function setCardDamage(
  this: typeof GameSession,
  card: typeof Card,
  damage: number,
) {
  if (damage === card.getDamage()) {
    return;
  }
  card.setDamage(damage);
  pushEvent(this, { showHP: { card }});
}

export function setArtifactDurability(
  this: typeof GameSession,
  artifact: typeof Artifact,
  durability: number,
) {
  if (durability === artifact.durability) {
    return;
  }
  artifact.durability = durability;
  artifact.getArtifactModifiers()
    .forEach((modifier: typeof Modifier) => modifier.setDurability(durability));
  pushEvent(this, {
    setArtifactDurability: {
      artifact,
      durability,
    },
  });
}

export function applyModifierContextObjectToCard(
  this: typeof GameSession,
  card: typeof Card,
  contextObject: ContextObject['contextObject'],
  count: number = 1,
) {
  const indices = Array.from(Array(count)).map(_ => this.generateIndex());
  indices.forEach(index => this.applyModifierContextObject({
    ...contextObject,
    index,
  }, card));
  pushEvent(this, {
    showModifiers: {
      card,
      modifiers: this.getModifiersByIndices(indices),
    },
  });
}

export function showDeactivatedModifier(
  this: typeof GameSession,
  card: typeof Card,
  modifier: typeof Modifier,
) {
  pushEvent(this, {
    showDeactivatedModifier: {
      card,
      modifier,
    },
  });
}

export function removeCardFromBoardWhileEditing(
  this: typeof GameSession,
  card: typeof Card,
) {
  this.removeCardFromBoard(card, card.getPositionX(), card.getPositionY());
  pushEvent(this, {
    destroyNodeForSdkCard: card,
  });
}

export function removeArtifact(
  this: typeof GameSession,
  artifact: typeof Artifact,
) {
  artifact.getArtifactModifiers()
    .forEach((modifier: typeof Modifier) => this.removeModifier(modifier));
  this.syncState();
  pushEvent(this, {
    removeArtifact: artifact,
  });
}

export function getCardsByType(
  this: typeof GameSession,
  type: typeof CardType,
): typeof Card[] {
  if (this.getCachedCardsByType(type) === undefined) {
    let cache = this
      .getCardCaches()
      .getIsPrismatic(false)
      .getIsGeneral(false);
    if (type !== CardType.Card) {
      cache = cache.getType(type);
    }
    if (type === CardType.Tile) {
      return cache.getCards();
    }
    const collectibleCards = cache.getIsHiddenInCollection(false).getCards();
    const tokenCards = cache.getIsToken(true).getCards();
    this.setCachedCardsByType(type, collectibleCards.concat(tokenCards));
  }
  return this.getCachedCardsByType(type);
}

export function getBottomDeckCardAtIndex(
  this: typeof GameSession,
  index: number
): typeof Card | undefined {
  if (this.getIsEditing()) {
    return this.getEditingBench()[index];
  }
  return this.getMyPlayer().getDeck().getCardInHandAtIndex(index);
}

export function addCardToBench(this: typeof GameSession, card: typeof Card) {
  card.canBeAppliedAnywhere = true;
  card.setOwnerId(this.getMyPlayerId());
  const existingIndex = this.getEditingBench().findIndex(
    (existingCard: typeof Card) => existingCard.getId() === card.getId(),
  );
  let bench = this.getEditingBench();
  if (existingIndex !== -1) {
    const leftBench = bench.slice(0, existingIndex)
    const rightBench = bench.slice(
      existingIndex + 1,
      this.getEditingBench().length,
    );
    bench = leftBench.concat(rightBench);
  }
  this.setEditingBench([card].concat(bench).slice(0, 6));
  pushEvent(this, { bindHand: true, setInitialBenchSelected: true });
}

export function setSelectedBenchIndex(this: typeof GameSession, index: number) {
  if (this.getIsEditing() && index < this.getEditingBench().length) {
    pushEvent(this, { selectBenchIndex: index });
  }
}

export function toggleOwnership(
  this: typeof GameSession,
  card: typeof Card | null,
) {
  if (card === null) {
    return;
  }
  card.setOwnerId(this.getOpponentPlayerIdOfPlayerId(card.getOwnerId()));
  pushEvent(this, {
    bindHand: true,
  });
}

export function applyBenchCardToBoard(
  this: typeof GameSession,
  selectedBenchIndex: number,
  boardX: number,
  boardY: number,
) {
  const benchCard = this.getEditingBench()[selectedBenchIndex];
  const position = { x: boardX, y: boardY };
  if (!benchCard.getIsPositionValidTarget(position)) {
    audio_engine.current().play_effect_for_interaction(
      RSX.sfx_ui_error.audio,
      CONFIG.ERROR_SFX_PRIORITY,
    );
    return;
  }
  const playerId = CardType.getIsArtifactCardType(benchCard.getType())
    // artifacts target generals
    ? this.getBoard().getUnitAtPosition(position).getOwnerId()
    : benchCard.getOwnerId();
  const card = this.getChallenge().applyCardToBoard(
    { id: benchCard.getId() },
    boardX,
    boardY,
    playerId,
  );
  pushEvent(this, { addNodeForSdkCard: { card, position }});
}

export function getCachedCardsByType(
  this: typeof GameSession,
  type: typeof CardType,
): typeof Card[] | undefined {
  return this._private.editorProperties.cachedCardsByType[type];
}

export function setCachedCardsByType(
  this: typeof GameSession,
  type: typeof CardType,
  cards: typeof Card[],
) {
  this._private.editorProperties.cachedCardsByType[type] = cards;
}

export function getEditingBench(this: typeof GameSession): typeof Card[] {
  return this._private.editorProperties.editingBench;
}

export function setEditingBench(
  this: typeof GameSession,
  editingBench: typeof Card[],
) {
  this._private.editorProperties.editingBench = editingBench;
}

export function getEditingMode(this: typeof GameSession): Mode {
  return this._private.editorProperties.mode;
}

export function setEditingMode(this: typeof GameSession, mode: Mode) {
  return this._private.editorProperties.mode = mode;
}

export function getIsEditing(this: typeof GameSession): boolean {
  return this.getEditingMode() === Mode.Edit;
}

export function setIsEditing(this: typeof GameSession) {
  if (this.getIsEditing()) {
    return;
  }
  const wasSettingUp = this.getIsSettingUp();
  this.setEditingMode(Mode.Edit);
  if (wasSettingUp) {
    return;
  }
  this.getChallenge().challengeReset();
  pushEvent(this, {
    bindSubmitTurn: true,
    setMouseOver: true,
  });
}

export function getIsPlaying(this: typeof GameSession): boolean {
  return this.getEditingMode() === Mode.Play;
}

export function setIsPlaying(this: typeof GameSession) {
  if (this.getIsPlaying()) {
    return;
  }
  this.setEditingMode(Mode.Play);
  this.getChallenge().snapshotChallenge();
  pushEvent(this, {
    bindHand: true,
    bindSubmitTurn: true,
  });
}

export function getIsSettingUp(this: typeof GameSession): boolean {
  return this.getEditingMode() === Mode.Setup;
}

export function setIsSettingUp(this: typeof GameSession) {
  this.setEditingMode(Mode.Setup);
}

export function setupPuzzleForString(this: typeof GameSession, string: string) {
  Puzzle.fromBase64(string).setupSession(this);
  pushUndo(this);
}

function pushEvent(
  gameSession: typeof GameSession,
  options: {
    addNodeForSdkCard?: {
      card: typeof Card,
      position: { x: number, y: number },
    },
    bindHand?: boolean,
    bindSubmitTurn?: boolean,
    destroyNodeForSdkCard?: typeof Card,
    removeArtifact?: typeof Artifact,
    selectBenchIndex?: number,
    setArtifactDurability?: {
      artifact: typeof Artifact,
      durability: number,
    },
    setInitialBenchSelected?: boolean,
    setMouseOver?: boolean,
    showHP?: {
      card: typeof Card,
    },
    showModifiers?: {
      card: typeof Card,
      modifiers: typeof Modifier[],
    },
    showDeactivatedModifier?: {
      card: typeof Card,
      modifier: typeof Modifier,
    },
  }) {
  gameSession.pushEvent({
    type: EVENTS.editing_event,
    options: {
      addNodeForSdkCard: options.addNodeForSdkCard ?? null,
      bindHand: options.bindHand ?? false,
      bindSubmitTurn: options.bindSubmitTurn ?? false,
      destroyNodeForSdkCard: options.destroyNodeForSdkCard ?? null,
      removeArtifact: options.removeArtifact ?? null,
      selectBenchIndex: options.selectBenchIndex ?? null,
      setArtifactDurability: options.setArtifactDurability ?? null,
      setInitialBenchSelected: options.setInitialBenchSelected ?? false,
      setMouseOver: options.setMouseOver ?? false,
      showHP: options.showHP ?? null,
      showModifiers: options.showModifiers ?? null,
      showDeactivatedModifier: options.showDeactivatedModifier ?? null,
    },
  });
}
