const Artifact = require('app/sdk/artifacts/artifact');
const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const GameSession = require('app/sdk/gameSession');
const Modifier = require('app/sdk/modifiers/modifier');
const Tile = require('app/sdk/entities/tile');
const Unit = require('app/sdk/entities/unit');
import CardInPlay from './CardInPlay';
import Player from './Player';
import { areEqual as arePositionsEqual, fromCard as getPositionFromCard } from './Position';
import SpecString from './SpecString';

const getPlayerModifiers = require('app/sdk/challenges/puzzleSpec/getPlayerModifiers');

export default class SpecPuzzle {
  static manaIndexLengthInBits = 3;
  constructor(
    public isPlayer1: boolean,
    public mana: number,
    public hasBottomManaTile: boolean,
    public hasCenterManaTile: boolean,
    public hasTopManaTile: boolean,
    public playerModifiers: any,
    public you: Player,
    public opponent: Player,
    public cardsInPlay: CardInPlay[],
  ) {}

  static fromSpecString(specString: SpecString): SpecPuzzle | null {
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
    const cardsInPlay = specString.extractList(CardInPlay.fromSpecString);
    if (cardsInPlay === null) {
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
      cardsInPlay,
    );
  }

  static fromGameSession(gameSession: typeof GameSession): SpecPuzzle | null {
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
    const board = gameSession.getBoard();
    const artifacts = SpecPuzzle.getArtifacts(gameSession);
    const minions = board
      .getUnits(true)
      .filter((unit: typeof Unit) => !unit.getIsGeneral());
    const {
      tiles,
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
    } = SpecPuzzle.getTileData(gameSession);
    const cardsInPlay = [tiles, minions, artifacts].flat()
      .map((card: typeof Card) => CardInPlay.fromCard(card))
      .reduce<CardInPlay[]>(
        (acc, val) => val === null ? acc : acc.concat([val]),
        [],
      );
    return new SpecPuzzle(
      gameSession.getMyPlayerId() === gameSession.getPlayer1Id(),
      myPlayer.getRemainingMana(),
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
      [],
      you,
      opponent,
      cardsInPlay,
    )
  }

  toString(): string {
    const isPlayer1 = SpecString.boolToBit(!this.isPlayer1);
    const manaIndex = SpecString.writeNumWithNBits(
      this.mana - 2,
      SpecPuzzle.manaIndexLengthInBits,
    );
    const hasBottomManaTile = SpecString.boolToBit(this.hasBottomManaTile);
    const hasCenterManaTile = SpecString.boolToBit(this.hasCenterManaTile);
    const hasTopManaTile = SpecString.boolToBit(this.hasTopManaTile);
    const cardsInPlay = SpecString.constructList(this.cardsInPlay);
    return `\
${isPlayer1}\
${manaIndex}\
${hasBottomManaTile}\
${hasCenterManaTile}\
${hasTopManaTile}\
${this.you}\
${this.opponent}\
${cardsInPlay}\
`;
  }

  private static getArtifacts(gameSession: typeof GameSession):
    (typeof Artifact)[] {
    const artifactIndices =
      [gameSession.getGeneralForPlayer1(), gameSession.getGeneralForPlayer2()]
        .flatMap((general: typeof Unit) => general
          .getArtifactModifiers()
          .map((modifier: typeof Modifier) => modifier.getSourceCardIndex()));
    return [...new Set(artifactIndices)]
      .map((index: number) => gameSession.getCardByIndex(index));
  }

  private static getTileData(gameSession: typeof GameSession): {
    tiles: (typeof Tile)[],
    hasBottomManaTile: boolean,
    hasCenterManaTile: boolean,
    hasTopManaTile: boolean,
  } {
    const tiles: (typeof Tile)[] = [];
    let hasBottomManaTile = false,
      hasCenterManaTile = false,
      hasTopManaTile = false;
    gameSession
      .getBoard()
      .getTiles(true)
      .forEach((tile: typeof Tile) => {
        if (tile.getId() !== Cards.Tile.BonusMana) {
          tiles.push(tile);
          return;
        }
        const position = getPositionFromCard(tile);
        if (arePositionsEqual(position, [4, 0])) {
          hasBottomManaTile = true;
        } else if (arePositionsEqual(position, [5, 2])) {
          hasCenterManaTile = true;
        } else if (arePositionsEqual(position, [4, 4])) {
          hasTopManaTile = true;
        } else {
          tiles.push(tile);
        }
      });
    return { tiles, hasBottomManaTile, hasCenterManaTile, hasTopManaTile };
  }
}
