import { getArtifactIds, getMinionIds, getSpellIds } from '../../gameVersion';
import type ArithmeticCoder from './arithmeticCoding/ArithmeticCoder';
import ArithmeticDecoder from "./arithmeticCoding/ArithmeticDecoder";
import ArithmeticEncoder from "./arithmeticCoding/ArithmeticEncoder";
import { getExponentialNumberCoding, getUniformBooleanCoding, getWeightedArrayCoding } from "./arithmeticCoding/utils";
import BattleLogCard from './BattleLogCard';
import List from './List';
import Player from './Player';
import PositionCoder from "./PositionCoder";
import SpecString from './SpecString';
import StartingManaTiles from './StartingManaTiles';

const CONFIG = require('app/common/config');
const GameSession = require('app/sdk/gameSession');
const ShowCardInBattleLogAction = require('app/sdk/actions/showCardInBattleLogAction');
const Step = require('app/sdk/step');
const getPlayerModifiers = require('app/sdk/challenges/puzzleSpec/getPlayerModifiers');

export default class SpecPuzzle {
  private static readonly manaIndexLengthInBits = 3;

  constructor(
    public isPlayer1: boolean,
    public mana: number,
    public startingManaTiles: StartingManaTiles,
    public playerModifiers: any,
    public you: Player,
    public opponent: Player,
    public battleLogCards: List<BattleLogCard>,
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
    const startingManaTiles = StartingManaTiles.fromSpecString(specString);
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
    const battleLogCards = List.fromSpecString(BattleLogCard, specString);
    if (battleLogCards === null) {
      return null;
    }
    return new SpecPuzzle(
      isPlayer1,
      mana,
      startingManaTiles,
      playerModifiers,
      you,
      opponent,
      battleLogCards,
    );
  }

  public static fromGameSession(gameSession: typeof GameSession): SpecPuzzle {
    const myPlayer = gameSession.getMyPlayer();
    if (myPlayer == null) {
      throw Error('invalid');
    }
    const you = Player.fromPlayer(myPlayer, true);
    const opponentPlayer = gameSession.getOpponentPlayer();
    if (opponentPlayer == null) {
      throw Error('invalid');
    }
    const opponent = Player.fromPlayer(opponentPlayer, false);
    const startingManaTiles = StartingManaTiles.fromBoard(
      gameSession.getBoard(),
    );
    const battleLogCards = gameSession.getCurrentTurn().getSteps()
      .reduce((acc: BattleLogCard[], step: typeof Step) => {
        if (step.getAction().getType() === ShowCardInBattleLogAction.type) {
          acc.push(BattleLogCard.fromCard(step.getAction().getSource()));
        }
        return acc;
      }, [])
      .slice(-CONFIG.MAX_BATTLELOG_ENTRIES);
    return new SpecPuzzle(
      gameSession.getMyPlayerId() === gameSession.getPlayer1Id(),
      myPlayer.getRemainingMana(),
      startingManaTiles,
      [],
      you,
      opponent,
      new List(battleLogCards),
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
    return `\
${isPlayer1}\
${manaIndex}\
${this.startingManaTiles}\
${this.you}\
${this.opponent}\
${this.battleLogCards}\
`;
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
    const startingManaTiles = StartingManaTiles.updateCoder(
      coder,
      specPuzzle?.startingManaTiles,
      positionCoder,
    );
    const you = Player.updateCoder(coder, specPuzzle?.you, true, positionCoder);
    const opponent =
      Player.updateCoder(coder, specPuzzle?.opponent, false, positionCoder);
    const battleLogCards = List.updateAdaptiveCoder(
      BattleLogCard,
      coder,
      getArtifactIds().concat(getMinionIds(), getSpellIds()),
      getExponentialNumberCoding(1/16, CONFIG.MAX_BATTLELOG_ENTRIES),
      specPuzzle?.battleLogCards,
    );
    return specPuzzle ?? new SpecPuzzle(
      isPlayer1,
      mana,
      startingManaTiles,
      [],
      you,
      opponent,
      battleLogCards,
    );
  }

  private static getPlayerCoding() {
    return getUniformBooleanCoding();
  }

  private static getManaCoding() {
    return getWeightedArrayCoding(
      [2, 1, 3, 4, 5, 6, 7, 8, 9],
      [1/256, 1/256, 1/128, 1/128, 1/128, 1/32, 1/32, 1/32],
    );
  }
}
