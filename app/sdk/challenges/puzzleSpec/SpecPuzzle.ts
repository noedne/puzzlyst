import CardInPlay from './CardInPlay';
import Player from './Player';
import type SpecString from './SpecString';

const getPlayerModifiers = require('app/sdk/challenges/puzzleSpec/getPlayerModifiers');

export default class SpecPuzzle {
  constructor(
    public version: number,
    public playerNum: 0 | 1,
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
    const cardsInPlay = specString.extractList(CardInPlay.fromSpecString);
    if (cardsInPlay === null) {
      return null;
    }
    return new SpecPuzzle(
      version,
      playerNum,
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
}
