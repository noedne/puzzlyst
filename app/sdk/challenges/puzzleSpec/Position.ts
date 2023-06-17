const Card = require('app/sdk/cards/card');
import type SpecString from "./SpecString";

export type Position = [number, number];

const WIDTH = 9;
const HEIGHT = 5;

export function fromSpecString(specString: SpecString): Position | null {
  const positionIndex = specString.readNBits(6);
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