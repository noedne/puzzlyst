const EVENTS = require('app/common/event_types');
const GameSession = require('./gameSession');

export const isEditing: boolean = false;

export function getIsEditing(this: typeof GameSession): boolean {
  return this.isEditing;
}

export function setIsEditing(this: typeof GameSession, isEditing: boolean) {
  if (isEditing === this.isEditing) {
    return;
  }
  this.isEditing = isEditing;
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