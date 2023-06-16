import CardInPlay from './CardInPlay';
import Player from './Player';
import type SpecString from './SpecString';

const getPlayerModifiers = require('app/sdk/challenges/puzzleSpec/getPlayerModifiers');

export default class Puzzle {
  version;
  playerNum;
  mana;
  hasBottomManaTile;
  hasCenterManaTile;
  hasTopManaTile;
  playerModifiers;
  you;
  opponent;
  cards;

  constructor(
    version: number,
    playerNum: 0 | 1,
    mana: number,
    hasBottomManaTile: boolean,
    hasCenterManaTile: boolean,
    hasTopManaTile: boolean,
    playerModifiers: any,
    you: Player,
    opponent: Player,
    cards: CardInPlay[],
  ) {
    this.version = version;
    this.playerNum = playerNum;
    this.mana = mana;
    this.hasBottomManaTile = hasBottomManaTile;
    this.hasCenterManaTile = hasCenterManaTile;
    this.hasTopManaTile = hasTopManaTile;
    this.playerModifiers = playerModifiers;
    this.you = you;
    this.opponent = opponent;
    this.cards = cards;
  }

  static fromSpecString(specString: SpecString): Puzzle | null {
    const version = specString.countZeroes();
    if (version === null) {
      return null;
    }
    const playerNum = specString.readNBits(1) as 0 | 1;
    if (playerNum === null) {
      return null;
    }
    const manaIndex = specString.readNBits(3);
    if (manaIndex === null) {
      return null;
    }
    const mana = manaIndex + 2;
    const hasBottomManaTile = specString.readNBits(1) === 1;
    const hasCenterManaTile = specString.readNBits(1) === 1;
    const hasTopManaTile = specString.readNBits(1) === 1;
    const playerModifiers =
      getPlayerModifiers(version).map(({ modifier }: {
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
    const cards = specString.extractList(CardInPlay.fromSpecString);
    if (cards === null) {
      return null;
    }
    return new Puzzle(
      version,
      playerNum,
      mana,
      hasBottomManaTile,
      hasCenterManaTile,
      hasTopManaTile,
      playerModifiers,
      you,
      opponent,
      cards,
    );
  }
}
