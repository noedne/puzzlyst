const Card = require('app/sdk/cards/card');
const CardType = require('app/sdk/cards/cardType');
const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');

const cachedMinionCards: typeof Card[] | null = null;
const editingBench: typeof Card[] = [];
const isEditing: boolean = false;
export const _private = {
  cachedMinionCards,
  editingBench,
  isEditing,
};

export function getMinionCards(this: typeof GameSession): typeof Card[] {
  if (this._private.cachedMinionCards === null) {
    const minionCache = this
      .getCardCaches()
      .getIsPrismatic(false)
      .getType(CardType.Unit)
      .getIsGeneral(false);
    const collectibleCards = minionCache
      .getIsHiddenInCollection(false)
      .getCards();
    const tokenCards = minionCache.getIsToken(true).getCards();
    this._private.cachedMinionCards = collectibleCards.concat(tokenCards);
  }
  return this._private.cachedMinionCards;
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
  const card = this.getChallenge().applyCardToBoard(
    { id: this._private.editingBench[selectedBenchIndex].getId() },
    boardX,
    boardY,
    this.getMyPlayerId(),
  );
  pushEvent(this, { addNodeForSdkCard: { card, position: card.getPosition() }});
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
    selectBenchIndex?: number,
    setInitialBenchSelected?: boolean,
    setMouseOver?: boolean,
  }) {
  gameSession.pushEvent({
    type: EVENTS.editing_event,
    options: {
      addNodeForSdkCard: options.addNodeForSdkCard ?? null,
      bindHand: options.bindHand ?? false,
      bindSubmitTurn: options.bindSubmitTurn ?? false,
      selectBenchIndex: options.selectBenchIndex ?? null,
      setInitialBenchSelected: options.setInitialBenchSelected ?? false,
      setMouseOver: options.setMouseOver ?? false,
    },
  });
}
