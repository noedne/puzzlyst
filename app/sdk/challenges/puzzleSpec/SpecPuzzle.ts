const Cards = require('app/sdk/cards/cardsLookupComplete');
const GameSession = require('app/sdk/gameSession');
const Tile = require('app/sdk/entities/tile');
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import ArithmeticDecoder from "./arithmeticCoding/ArithmeticDecoder";
import ArithmeticEncoder from "./arithmeticCoding/ArithmeticEncoder";
import { getUniformBooleanCoding, getWeightedNumberCoding } from "./arithmeticCoding/utils";
import Player from './Player';
import { areEqual as arePositionsEqual, fromCard as getPositionFromCard, Position } from './Position';
import PositionableType from './PositionableType';
import PositionCoder from "./PositionCoder";
import SpecString from './SpecString';

const getPlayerModifiers = require('app/sdk/challenges/puzzleSpec/getPlayerModifiers');

export default class SpecPuzzle {
  private static readonly manaIndexLengthInBits = 3;
  private static readonly bottomManaTilePosition: Position = [4, 0];
  private static readonly centerManaTilePosition: Position = [5, 2];
  private static readonly topManaTilePosition: Position = [4, 4];

  constructor(
    public isPlayer1: boolean,
    public mana: number,
    public hasBottomManaTile: boolean,
    public hasCenterManaTile: boolean,
    public hasTopManaTile: boolean,
    public playerModifiers: any,
    public you: Player,
    public opponent: Player,
  ) {}

  public static fromSpecString(specString: SpecString): SpecPuzzle | null {
    const isPlayer1 = specString.readNBits(1) === 0;
    if (isPlayer1 === null) {
      return null;
    }
    const manaIndex = specString.readNBits(SpecPuzzle.manaIndexLengthInBits);
    if (manaIndex === null) {
      return null;
    }
    const mana = manaIndex + 2;
    const hasBottomManaTile = specString.readNBits(1) === 1;
    const hasCenterManaTile = specString.readNBits(1) === 1;
    const hasTopManaTile = specString.readNBits(1) === 1;
    const playerModifiers =
      getPlayerModifiers().map(({ modifier }: {
        modifier: (specString: SpecString) => any,
      }) => modifier(specString));
    const you = Player.fromSpecString(specString);
    if (you === null) {
      return null;
    }
    const opponent = Player.fromSpecString(specString);
    if (opponent === null) {
      return null;
    }
    return new SpecPuzzle(
      isPlayer1,
      mana,
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
      playerModifiers,
      you,
      opponent,
    );
  }

  public static fromGameSession(
    gameSession: typeof GameSession,
  ): SpecPuzzle | null {
    const myPlayer = gameSession.getMyPlayer();
    if (myPlayer == null) {
      return null;
    }
    const you = Player.fromPlayer(myPlayer);
    if (you === null) {
      return null;
    }
    const opponentPlayer = gameSession.getOpponentPlayer();
    if (opponentPlayer == null) {
      return null;
    }
    const opponent = Player.fromPlayer(opponentPlayer);
    if (opponent === null) {
      return null;
    }
    const {
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
    } = SpecPuzzle.getTileData(gameSession);
    return new SpecPuzzle(
      gameSession.getMyPlayerId() === gameSession.getPlayer1Id(),
      myPlayer.getRemainingMana(),
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
      [],
      you,
      opponent,
    )
  }

  public encode(): string {
    const encoder = new ArithmeticEncoder();
    SpecPuzzle.updateCoder(encoder, this);
    return encoder.flush();
  }

  public static decode(encoded: string): SpecPuzzle {
    return this.updateCoder(new ArithmeticDecoder(encoded));
  }

  public toString(): string {
    const isPlayer1 = SpecString.boolToBit(!this.isPlayer1);
    const manaIndex = SpecString.writeNumWithNBits(
      this.mana - 2,
      SpecPuzzle.manaIndexLengthInBits,
    );
    const hasBottomManaTile = SpecString.boolToBit(this.hasBottomManaTile);
    const hasCenterManaTile = SpecString.boolToBit(this.hasCenterManaTile);
    const hasTopManaTile = SpecString.boolToBit(this.hasTopManaTile);
    return `\
${isPlayer1}\
${manaIndex}\
${hasBottomManaTile}\
${hasCenterManaTile}\
${hasTopManaTile}\
${this.you}\
${this.opponent}\
`;
  }

  private static getTileData(gameSession: typeof GameSession): {
    hasBottomManaTile: boolean,
    hasCenterManaTile: boolean,
    hasTopManaTile: boolean,
  } {
    let hasBottomManaTile = false,
      hasCenterManaTile = false,
      hasTopManaTile = false;
    gameSession
      .getBoard()
      .getTiles(true)
      .forEach((tile: typeof Tile) => {
        if (tile.getId() !== Cards.Tile.BonusMana) {
          return;
        }
        const position = getPositionFromCard(tile);
        if (arePositionsEqual(position, this.bottomManaTilePosition)) {
          hasBottomManaTile = true;
        } else if (arePositionsEqual(position, this.centerManaTilePosition)) {
          hasCenterManaTile = true;
        } else if (arePositionsEqual(position, this.topManaTilePosition)) {
          hasTopManaTile = true;
        }
      });
    return { hasBottomManaTile, hasCenterManaTile, hasTopManaTile };
  }

  private static updateCoder(
    coder: ArithmeticCoder,
    specPuzzle?: SpecPuzzle,
  ): SpecPuzzle {
    const positionCoder = new PositionCoder();
    const isPlayer1 = this.getPlayerCoding()
      .updateCoder(coder, specPuzzle?.isPlayer1);
    const mana = this.getManaCoding()
      .updateCoder(coder, specPuzzle?.mana);
    const manaTileCoding = this.getManaTileCoding();
    const hasBottomManaTile = manaTileCoding
      .updateCoder(coder, specPuzzle?.hasBottomManaTile);
    if (hasBottomManaTile) {
      positionCoder.removePosition(
        this.bottomManaTilePosition,
        PositionableType.Tile,
      );
    }
    const hasCenterManaTile = manaTileCoding
      .updateCoder(coder, specPuzzle?.hasCenterManaTile);
    if (hasCenterManaTile) {
      positionCoder.removePosition(
        this.centerManaTilePosition,
        PositionableType.Tile,
      );
    }
    const hasTopManaTile = manaTileCoding
      .updateCoder(coder, specPuzzle?.hasTopManaTile);
    if (hasTopManaTile) {
      positionCoder.removePosition(
        this.topManaTilePosition,
        PositionableType.Tile,
      );
    }
    const you = Player.updateCoder(coder, specPuzzle?.you, true, positionCoder);
    const opponent =
      Player.updateCoder(coder, specPuzzle?.opponent, false, positionCoder);
    return specPuzzle ?? new SpecPuzzle(
      isPlayer1,
      mana,
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
      [],
      you,
      opponent,
    );
  }

  private static getPlayerCoding() {
    return getUniformBooleanCoding();
  }

  private static getManaCoding() {
    return getWeightedNumberCoding(
      [1/256, 1/256, 1/128, 1/128, 1/128, 1/32, 1/32, 1/32],
      1,
    );
  }

  private static getManaTileCoding() {
    return getUniformBooleanCoding();
  }
}
