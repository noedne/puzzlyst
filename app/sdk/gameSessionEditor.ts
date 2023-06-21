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

export function getIsEditing(this: typeof GameSession): boolean {
  return this._private.isEditing;
}

export function setIsEditing(this: typeof GameSession, isEditing: boolean) {
  if (isEditing === this._private.isEditing) {
    return;
  }
  this._private.isEditing = isEditing;
  if (isEditing) {
    this.getChallenge().challengeReset();
  } else {
    this.getChallenge().snapshotChallenge();
  }
  this.pushEvent({
    type: EVENTS.toggle_editing,
    isEditing,
    gameSession: this,
  });
}
