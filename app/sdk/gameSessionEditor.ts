const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');

export const isEditing: boolean = false;

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
