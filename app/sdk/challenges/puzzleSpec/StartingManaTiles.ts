import type ArithmeticCoder from "./arithmeticCoding/ArithmeticCoder";
import { getWeightedArrayCoding } from "./arithmeticCoding/utils";
import * as Position from "./Position";
import type { Position as PositionType } from "./Position";
import PositionableType from "./PositionableType";
import type PositionCoder from "./PositionCoder";
import type SpecString from "./SpecString";

const Board = require('app/sdk/board');
const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');

export default class StartingManaTiles {
  private static readonly positions: PositionType[] = [[4, 0], [5, 2], [4, 4]];
  private static readonly manaTileId: number = Cards.Tile.BonusMana;

  private constructor(public tiles: Tile[]) {}

  public static isStartingManaTile(card: typeof Card): boolean {
    if (!this.isManaTile(card)) {
      return false;
    }
    const cardPosition = Position.fromCard(card);
    return this.positions.some(
      position => Position.areEqual(position, cardPosition),
    );
  }

  public static fromSpecString(specString: SpecString): StartingManaTiles {
    const tiles = this.positions.map(position => ({
      position,
      state: specString.matchRegex(/0|1[01]/) as TileState,
    }));
    return new StartingManaTiles(tiles);
  }

  public static fromBoard(board: typeof Board): StartingManaTiles {
    const tiles = this.positions.map(position => {
      const tile = board.getTileAtPosition(Position.toSDKPosition(position), true);
      let state = TileState.Available;
      if (tile == null || !this.isManaTile(tile)) {
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

  private static isManaTile(card: typeof Card): boolean {
    return card.getBaseCardId() === this.manaTileId;
  }
}

type Tile = {
  position: PositionType,
  state: TileState,
};

export const enum TileState {
  Available = '0',
  Depleted = '10',
  Missing = '11',
}
