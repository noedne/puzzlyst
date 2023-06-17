const Card = require('app/sdk/cards/card');
import type SpecString from "./SpecString";

export type Position = [number, number];

const WIDTH = 9;
const HEIGHT = 5;
const LENGTH = 6;

export function fromSpecString(specString: SpecString): Position | null {
  const positionIndex = specString.readNBits(LENGTH);
  if (positionIndex === null || positionIndex >= WIDTH * HEIGHT) {
    return null;
  }
  const x = positionIndex % WIDTH;
  const y = (positionIndex - x) / WIDTH;
  return [x, y];
}

export function fromCard(card: typeof Card): Position {
  const { x, y } = card.getPosition();
  return [x, y];
}

export function areEqual(position1: Position, position2: Position): boolean {
  return position1[0] === position2[0] && position1[1] === position2[1];
}

export function toString(position: Position): string {
  return (position[1] * WIDTH + position[0]).toString(2).padStart(LENGTH, '0');
}
