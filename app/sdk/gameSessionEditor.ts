import type { ContextObject } from "./challenges/puzzleSpec/getContextObjectData";

const audio_engine = require('app/audio/audio_engine');
const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');
const Modifier = require('app/sdk/modifiers/modifier');
const RSX = require('app/data/resources');

const cachedCardsByType: Record<typeof CardType, typeof Card[]> = {};
const editingBench: typeof Card[] = [];
const isEditing: boolean = false;
export const _private = {
  cachedCardsByType,
  editingBench,
  isEditing,
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

export function getCardsByType(
  this: typeof GameSession,
  type: typeof CardType,
): typeof Card[] {
  if (this._private.cachedCardsByType[type] === undefined) {
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
    this._private.cachedCardsByType[type] = collectibleCards.concat(tokenCards);
  }
  return this._private.cachedCardsByType[type];
}

export function getBottomDeckCardAtIndex(
  this: typeof GameSession,
  index: number
): typeof Card | undefined {
  if (this.getIsEditing()) {
    return this._private.editingBench[index];
  }
  return this.getMyPlayer().getDeck().getCardInHandAtIndex(index);
}

export function addCardToBench(this: typeof GameSession, card: typeof Card) {
  card.canBeAppliedAnywhere = true;
  const existingIndex = this._private.editingBench.findIndex(
    (existingCard: typeof Card) => existingCard.getId() === card.getId(),
  );
  let bench = this._private.editingBench;
  if (existingIndex !== -1) {
    const leftBench = bench.slice(0, existingIndex)
    const rightBench = bench.slice(
      existingIndex + 1,
      this._private.editingBench.length,
    );
    bench = leftBench.concat(rightBench);
  }
  this._private.editingBench = [card].concat(bench).slice(0, 6);
  pushEvent(this, { bindHand: true, setInitialBenchSelected: true });
}

export function setSelectedBenchIndex(this: typeof GameSession, index: number) {
  if (this.getIsEditing() && index < this._private.editingBench.length) {
    pushEvent(this, { selectBenchIndex: index });
  }
}

export function applyBenchCardToBoard(
  this: typeof GameSession,
  selectedBenchIndex: number,
  boardX: number,
  boardY: number,
) {
  const benchCard = this._private.editingBench[selectedBenchIndex];
  const position = { x: boardX, y: boardY };
  if (!benchCard.getIsPositionValidTarget(position)) {
    audio_engine.current().play_effect_for_interaction(
      RSX.sfx_ui_error.audio,
      CONFIG.ERROR_SFX_PRIORITY,
    );
    return;
  }
  const card = this.getChallenge().applyCardToBoard(
    { id: benchCard.getId() },
    boardX,
    boardY,
    this.getMyPlayerId(),
  );
  pushEvent(this, { addNodeForSdkCard: { card, position }});
}

export function getIsEditing(this: typeof GameSession): boolean {
  return this._private.isEditing;
}

export function setIsEditing(this: typeof GameSession, isEditing: boolean) {
  if (isEditing === this.getIsEditing()) {
    return;
  }
  this._private.isEditing = isEditing;
  if (isEditing) {
    this.getChallenge().challengeReset();
  } else {
    this.getChallenge().snapshotChallenge();
  }
  pushEvent(this, {
    bindHand: !isEditing,
    bindSubmitTurn: true,
    setMouseOver: isEditing,
  });
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
    selectBenchIndex?: number,
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
      selectBenchIndex: options.selectBenchIndex ?? null,
      setInitialBenchSelected: options.setInitialBenchSelected ?? false,
      setMouseOver: options.setMouseOver ?? false,
      showHP: options.showHP ?? null,
      showModifiers: options.showModifiers ?? null,
      showDeactivatedModifier: options.showDeactivatedModifier ?? null,
    },
  });
}
