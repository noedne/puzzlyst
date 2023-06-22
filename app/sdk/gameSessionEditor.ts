const Card = require('app/sdk/cards/card');
const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');

const editingBench: typeof Card[] = [];
const isEditing: boolean = false;
export const _private = {
  editingBench,
  isEditing,
};

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
  this._private.editingBench = [card].concat(this._private.editingBench);
  pushEvent(this, { bindHand: true });
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
  });
}

function pushEvent(
  gameSession: typeof GameSession,
  options: {
    bindHand?: boolean,
    bindSubmitTurn?: boolean,
  }) {
  gameSession.pushEvent({
    type: EVENTS.editing_event,
    options: {
      bindHand: options.bindHand ?? false,
      bindSubmitTurn: options.bindSubmitTurn ?? false,
    },
  });
}
