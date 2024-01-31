import Puzzle, { Params } from "./challenges/Puzzle";
import type { ContextObject } from "./challenges/puzzleSpec/getContextObjectData";

const Action = require('app/sdk/actions/action');
const Artifact = require('app/sdk/artifacts/artifact');
const audio_engine = require('app/audio/audio_engine');
const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const CONFIG = require('app/common/config');
const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');
const Modifier = require('app/sdk/modifiers/modifier');
const ModifierBuff = require('app/sdk/modifiers/modifierBuff');
const ModifierKeeper = require('app/sdk/modifiers/modifierKeeper');
const ModifierSilence = require('app/sdk/modifiers/modifierSilence');
const RSX = require('app/data/resources');
const ShowCardInBattleLogAction = require('./actions/showCardInBattleLogAction');
const Step = require('./step');

const enum Mode {
  Edit,
  Play,
  Setup,
}

const cachedCardsByType: Record<typeof CardType, typeof Card[]> = {};
const editingBench: typeof Card[] = [];
const mode: Mode = Mode.Play;
const history: {
  states: string[],
  current: number,
} = {
  states: [],
  current: -1,
};

export const editorProperties = {
  cachedCardsByType,
  editingBench,
  mode,
  history,
};

export function createCard(
  this: typeof GameSession,
  id: number,
  isKeeper: boolean,
): typeof Card {
  const card = this.createCardForIdentifier(id);
  this._indexCardAsNeeded(card);
  if (isKeeper) {
    this.applyModifierContextObject(
      ModifierKeeper.createContextObject(),
      card,
    );
  }
  return card;
}

export function copyCard(
  this: typeof GameSession,
  oldCard: typeof Card,
  isKeeper?: boolean,
): typeof Card {
  isKeeper = isKeeper !== false
    && CardType.getIsUnitCardType(oldCard.getType())
    && (isKeeper ?? oldCard.hasModifierType(ModifierKeeper.type));
  return this.createCard(oldCard.getId(), isKeeper);
}

export function resetUnit(this: typeof GameSession, card: typeof Card) {
  const wasDispelled = card.hasModifierType(ModifierSilence.type);
  this.simulateAction(() => {
    this.setCardStats(card, getDefaultCardStats(card));
    card.getModifiers().forEach((modifier: typeof Modifier) => {
      if (!modifier.getIsInherent()) {
        this.removeModifier(modifier);
      }
    });
    if (wasDispelled) {
      card.getInherentModifiersContextObjects()
        .forEach((contextObject: Object) => {
          this.applyModifierContextObject(contextObject, card);
        });
    }
  });
}

export function dispelUnit(this: typeof GameSession, card: typeof Card) {
  this.applyModifierContextObjectToCard(
    card,
    ModifierSilence.createContextObject(),
  );
}

export type CardStats = {
  damage: number,
  attackBase: number,
  attackBuff: number,
  healthBase: number,
  healthBuff: number,
};

function getDefaultCardStats(card: typeof Card) {
  return {
    damage: 0,
    attackBase: card.atk,
    attackBuff: 0,
    healthBase: card.maxHP,
    healthBuff: 0,
  };
}

export function getCardStats(
  this: typeof GameSession,
  card: typeof Card,
): CardStats {
  const rebaseModifier = getStatModifier(card, true)?.attributeBuffs;
  const buffModifier = getStatModifier(card, false)?.attributeBuffs;
  const defaultStats = getDefaultCardStats(card);
  return {
    damage: card.getDamage(),
    attackBase: rebaseModifier?.atk ?? defaultStats.attackBase,
    attackBuff: buffModifier?.atk ?? defaultStats.attackBuff,
    healthBase: rebaseModifier?.maxHP ?? defaultStats.healthBase,
    healthBuff: buffModifier?.maxHP ?? defaultStats.healthBuff,
  };
}

export function setCardStats(
  this: typeof GameSession,
  card: typeof Card,
  {
    damage,
    attackBase,
    attackBuff,
    healthBase,
    healthBuff,
  }: Partial<CardStats>,
) {
  const stats = this.getCardStats(card);
  if (attackBase !== undefined || healthBase !== undefined) {
    setBaseStats(
      this,
      card,
      attackBase ?? stats.attackBase,
      healthBase ?? stats.healthBase,
      true,
    );
  }
  if (attackBuff !== undefined || healthBuff !== undefined) {
    setBaseStats(
      this,
      card,
      attackBuff ?? stats.attackBuff,
      healthBuff ?? stats.healthBuff,
      false,
    );
  }
  card.setDamage(damage ?? stats.damage);
}

export function changeCardStats(
  this: typeof GameSession,
  card: typeof Card,
  stats: Partial<CardStats>,
) {
  this.setCardStats(card, stats);
  pushUndo(this);
  pushEvent(this, { showStats: { card }});
}

function setBaseStats(
  gameSession: typeof GameSession,
  card: typeof Card,
  atk: number,
  maxHP: number,
  isRebase: boolean,
) {
  const rebaseModifier = getStatModifier(card, isRebase);
  if (rebaseModifier !== undefined) {
    gameSession.removeModifier(rebaseModifier);
  }
  if (
    (isRebase && atk === card.atk && maxHP === card.maxHP)
    || (!isRebase && atk === 0 && maxHP === 0)
   ) {
    return;
  }
  const contextObject = ModifierBuff.createContextObject(atk, maxHP, isRebase);
  gameSession.applyCardModifier(card, contextObject);
}

function getStatModifier(
  card: typeof Card,
  isRebase: boolean,
): typeof ModifierBuff | undefined {
  return card.getModifiers().find((modifier: typeof Modifier) =>
    modifier.type === ModifierBuff.type && modifier.getIsRebase() === isRebase,
  );
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
  pushUndo(this);
  pushEvent(this, {
    setArtifactDurability: {
      artifact,
      durability,
    },
  });
}

export function applyCardModifier(
  this: typeof GameSession,
  card: typeof Card,
  contextObject: ContextObject['contextObject'],
): number {
  return this.applyModifierContextObject(
    {
      ...contextObject,
      wasAppliedByEditor: true,
    },
    card,
  );
}

export function applyModifierContextObjectToCard(
  this: typeof GameSession,
  card: typeof Card,
  contextObject: ContextObject['contextObject'],
  count: number = 1,
) {
  const indices = Array.from(Array(count)).map(_ => this.generateIndex());
  this.simulateAction(() => {
    indices.forEach(index => this.getGameSession().applyCardModifier(card, {
      ...contextObject,
      index,
    }));
  });
  pushUndo(this);
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
  this.simulateAction(() => {
    this.getGameSession()
      .removeCardFromBoard(card, card.getPositionX(), card.getPositionY());
  });
  pushUndo(this);
  pushEvent(this, {
    destroyNodeForSdkCard: card,
  });
}

export function removeArtifact(
  this: typeof GameSession,
  artifact: typeof Artifact,
) {
  this.simulateAction(() => {
    artifact.getArtifactModifiers().forEach((modifier: typeof Modifier) => {
      this.getGameSession().removeModifier(modifier);
    });
  });
  pushUndo(this);
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
  if (card === null || CardType.getIsArtifactCardType(card.getType())) {
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
  const card = this.createCardForIdentifier(benchCard.getId());
  this.simulateAction(() => {
    this.getGameSession().getChallenge().applyCardToBoard(
      card,
      boardX,
      boardY,
      playerId,
    );
  });
  pushUndo(this);
  pushEvent(this, { addNodeForSdkCard: { card, position }});
}

export function moveEntity(
  this: typeof GameSession,
  card: typeof Card,
  position: { x: number, y: number },
) {
  card.setPosition(position);
  this.simulateAction();
}

export function addCardToBattleLog(
  this: typeof GameSession,
  card: typeof Card,
  ownerId?: string,
) {
  const action = new ShowCardInBattleLogAction(this);
  if (ownerId != null) {
    action.setOwnerId(ownerId);
  }
  const index = this._indexCardAsNeeded(card);
  action.setSourceIndex(index);
  card.setOwnerId(action.getOwnerId());
  card.setIsPlayed(true);
  executeAction(this, action);
}

export function flipCardInBattleLog(
  this: typeof GameSession,
  card: typeof Card,
) {
  const newOwnerId = this.getOpponentPlayerIdOfPlayerId(card.getOwnerId());
  card.setOwnerId(newOwnerId);
  const step = getSteps(this).find(getStepPredicateForBattleLogCard(card));
  if (step !== undefined) {
    step.playerId = newOwnerId;
    pushEvent(this, { battleLog: true });
  }
}

export function removeCardFromBattleLog(
  this: typeof GameSession,
  card: typeof Card,
) {
  const steps = getSteps(this);
  const index = steps.findIndex(getStepPredicateForBattleLogCard(card));
  if (index > -1) {
    steps.splice(index, 1);
    pushEvent(this, { battleLog: true });
  }
}

function getSteps(gameSession: typeof GameSession) {
  return gameSession.getCurrentTurn().getSteps();
}

function getStepPredicateForBattleLogCard(card: typeof Card) {
  return (step: typeof Step) =>
    step.getAction().getType() === ShowCardInBattleLogAction.type
    && step.getAction().getSource() === card;
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
    bindReplace: true,
    bindSubmitTurn: true,
    clear: true,
  });
}

export function getIsSettingUp(this: typeof GameSession): boolean {
  return this.getEditingMode() === Mode.Setup;
}

export function setIsSettingUp(this: typeof GameSession) {
  this.setEditingMode(Mode.Setup);
}

function pushHistory(gameSession: typeof GameSession, string: string) {
  const { history } = gameSession._private.editorProperties;
  history.states.length = ++history.current;
  history.states.push(string);
}

function jumpHistory(gameSession: typeof GameSession, step: number) {
  const { history } = gameSession._private.editorProperties;
  const index = history.current + step;
  if (index < 0 || history.states.length <= index) {
    return;
  }
  history.current += step;
  updateFromBase64(gameSession, history.states[index]);
}

export function redo(this: typeof GameSession) {
  jumpHistory(this, 1);
}

export function undo(this: typeof GameSession) {
  jumpHistory(this, -1);
}

export function flipPlayers(this: typeof GameSession) {
  this.getPlayers().reverse();
  updateFromBase64(this, getState(this));
  pushUndo(this);
}

function updateFromBase64(gameSession: typeof GameSession, base64: string) {
  gameSession.getChallenge().updateFromBase64(base64).setupSession(gameSession);
  gameSession.pushRollbackEvent();
}

export function setupPuzzleForParams(this: typeof GameSession, params: Params) {
  Puzzle.fromParams(params).setupSession(this);
  pushUndo(this);
}

export function simulateAction(this: typeof GameSession, executeFn?: Function) {
  this.getEditingBench().forEach(
    (card: typeof Card) => card.flushCachedValidTargetPositions(),
  );
  const action = new Action(this);
  if (executeFn !== undefined) {
    action._execute = executeFn;
  }
  executeAction(this, action);
}

function executeAction(gameSession: typeof GameSession, action: typeof Action) {
  action.setIsAutomatic(true);
  gameSession.executeAction(action);
}

function pushEvent(
  gameSession: typeof GameSession,
  options: {
    addNodeForSdkCard?: {
      card: typeof Card,
      position: { x: number, y: number },
    },
    battleLog?: boolean,
    bindHand?: boolean,
    bindReplace?: boolean,
    bindSubmitTurn?: boolean,
    clear?: boolean,
    destroyNodeForSdkCard?: typeof Card,
    removeArtifact?: typeof Artifact,
    selectBenchIndex?: number,
    setArtifactDurability?: {
      artifact: typeof Artifact,
      durability: number,
    },
    setInitialBenchSelected?: boolean,
    setMouseOver?: boolean,
    showStats?: {
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
      battleLog: options.battleLog ?? false,
      bindHand: options.bindHand ?? false,
      bindReplace: options.bindReplace ?? false,
      bindSubmitTurn: options.bindSubmitTurn ?? false,
      clear: options.clear ?? false,
      destroyNodeForSdkCard: options.destroyNodeForSdkCard ?? null,
      removeArtifact: options.removeArtifact ?? null,
      selectBenchIndex: options.selectBenchIndex ?? null,
      setArtifactDurability: options.setArtifactDurability ?? null,
      setInitialBenchSelected: options.setInitialBenchSelected ?? false,
      setMouseOver: options.setMouseOver ?? false,
      showStats: options.showStats ?? null,
      showModifiers: options.showModifiers ?? null,
      showDeactivatedModifier: options.showDeactivatedModifier ?? null,
    },
  });
}

function getState(gameSession: typeof GameSession): string {
  return gameSession.getChallenge().getState(gameSession);
}

function pushUndo(gameSession: typeof GameSession) {
  pushHistory(gameSession, getState(gameSession));
}
