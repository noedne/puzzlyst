import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getUniformRange } from "./arithmeticCoding/utils";
import type ArithmeticDecoder from "./arithmeticCoding/ArithmeticDecoder";
import type ArithmeticEncoder from "./arithmeticCoding/ArithmeticEncoder";
import { WIDTH, HEIGHT, Position } from "./Position";
import PositionableType from "./PositionableType";
import type Range from "./arithmeticCoding/Range";

export default class PositionCoder {
  public updateCoder(
    coder: ArithmeticCoder,
    position: Position | undefined,
    type: PositionableType,
  ): Position {
    if (position != null) {
      this.encodePosition(coder as ArithmeticEncoder, position, type);
      return position;
    }
    return this.decodePosition(coder as ArithmeticDecoder, type);
  }

  private readonly availablePositionIndicesByType = {
    [PositionableType.Tile]: PositionCoder.genAllPositionIndices(),
    [PositionableType.Unit]: PositionCoder.genAllPositionIndices(),
  };

  private static genAllPositionIndices(): number[] {
    return Array(WIDTH * HEIGHT).fill(0).map((_, i) => i);
  }

  private getPositionRange(position: Position, type: PositionableType): Range {
    const availablePositionIndices = this.availablePositionIndicesByType[type];
    const positionIndex = position[1] * WIDTH + position[0];
    const indexOf = availablePositionIndices.indexOf(positionIndex);
    if (indexOf === -1) {
      throw Error('invalid');
    }
    const length = availablePositionIndices.length;
    availablePositionIndices.splice(indexOf, 1);
    return getUniformRange(indexOf, length);
  }

  private encodePosition(
    encoder: ArithmeticEncoder, 
    position: Position, 
    type: PositionableType,
  ): void {
    encoder.update(this.getPositionRange(position, type));
  }

  private decodePosition(
    decoder: ArithmeticDecoder, 
    type: PositionableType,
  ): Position {
    const availablePositionIndices = this.availablePositionIndicesByType[type];
    const indexOf =
      Math.floor(decoder.getValue() * availablePositionIndices.length);
    const positionIndex = availablePositionIndices[indexOf];
    if (positionIndex == null) {
      throw Error('invalid');
    }
    const position: Position = [
      positionIndex % WIDTH,
      Math.floor(positionIndex / WIDTH),
    ];
    decoder.update(this.getPositionRange(position, type));
    return position;
  }
}
