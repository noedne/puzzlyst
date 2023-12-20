import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getWeightedArrayCoding } from "./arithmeticCoding/utils";
import { Position, toSDKPosition } from "./Position";
import PositionableType from "./PositionableType";
import type PositionCoder from "./PositionCoder";
import type SpecString from "./SpecString";

const Board = require('app/sdk/board');
const Cards = require('app/sdk/cards/cardsLookupComplete');

export default class StartingManaTiles {
  private static readonly positions: Position[] = [[4, 0], [5, 2], [4, 4]];

  private constructor(public tiles: Tile[]) {}

  public static fromSpecString(specString: SpecString): StartingManaTiles {
    const tiles = this.positions.map(position => ({
      position,
      state: specString.matchRegex(/0|1[01]/) as TileState,
    }));
    return new StartingManaTiles(tiles);
  }

  public static fromBoard(board: typeof Board): StartingManaTiles {
    const tiles = this.positions.map(position => {
      const tile = board.getTileAtPosition(toSDKPosition(position), true);
      let state = TileState.Available;
      if (tile?.getBaseCardId() !== Cards.Tile.BonusMana) {
        state = TileState.Missing;
      } else if (tile.getDepleted()) {
        state = TileState.Depleted;
      }
      return { position, state };
    });
    return new StartingManaTiles(tiles);
  }

  public static updateCoder(
    coder: ArithmeticCoder,
    startingManaTiles: StartingManaTiles | undefined,
    positionCoder: PositionCoder,
  ): StartingManaTiles {
    const coding = this.getTileCoding();
    const tiles = this.positions.map((position, i) => {
      const state = coding.updateCoder(
        coder,
        startingManaTiles?.tiles[i]?.state,
      );
      if (state !== TileState.Missing) {
        positionCoder.removePosition(position, PositionableType.Tile);
        if (state === TileState.Available) {
          positionCoder.removePosition(position, PositionableType.Unit);
        }
      }
      return { position, state };
    });
    return startingManaTiles ?? new StartingManaTiles(tiles);
  }

  public toString(): string {
    return this.tiles.reduce((acc, { state }) => `${acc}${state}`, '');
  }

  private static getTileCoding() {
    return getWeightedArrayCoding(
      [TileState.Available, TileState.Depleted, TileState.Missing],
      [3/16, 3/4],
    );
  }
}

type Tile = {
  position: Position,
  state: TileState,
};

export const enum TileState {
  Available = '0',
  Depleted = '10',
  Missing = '11',
}
