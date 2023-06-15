import CardInPlay from './CardInPlay';
import Player from './Player';
import type SpecString from './SpecString';

const getPlayerModifiers = require('./getPlayerModifiers');

export default class Puzzle {
  version;
  mana;
  playerModifiers;
  you;
  opponent;
  cards;

  constructor(
    version: number,
    mana: number,
    playerModifiers: any,
    you: Player,
    opponent: Player,
    cards: CardInPlay[],
  ) {
    this.version = version;
    this.mana = mana;
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
    const manaIndex = specString.readNBits(3);
    if (manaIndex === null) {
      return null;
    }
    const mana = manaIndex + 2;
    const playerModifiers =
      getPlayerModifiers(version).forEach(({ modifier }: {
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
    return new Puzzle(version, mana, playerModifiers, you, opponent, cards);
  }
}
