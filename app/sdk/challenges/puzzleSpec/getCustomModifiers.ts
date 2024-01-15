import SpecString from "./SpecString";

const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const Modifier = require('app/sdk/modifiers/modifier');
const ModifierAbsorbDamageOnce = require('app/sdk/modifiers/modifierAbsorbDamageOnce');
const ModifierDeathWatchBuffSelf = require('app/sdk/modifiers/modifierDeathWatchBuffSelf');
const ModifierMyMinionOrGeneralDamagedWatchBuffSelf = require('app/sdk/modifiers/modifierMyMinionOrGeneralDamagedWatchBuffSelf');

export default function getCustomModifiers(cardId: number) {
  switch (cardId) {
    case Cards.Artifact.ArclyteRegalia: {
      const type = ModifierAbsorbDamageOnce.type;
      return [
        getBooleanModifier({
          turnOffDescription: 'Reset damage reduction',
          turnOnDescription: 'Remove damage reduction',
          getValue: (card: typeof Card) =>
            card.getArtifactModifierByType(type).canAbsorb === false,
          setValue: (card: typeof Card, isDamaged: boolean) => {
            card.getArtifactModifierByType(type).canAbsorb = !isDamaged;
          },
        }),
      ];
    }
    case Cards.Artifact.SoulGrimwar:
      return getModifierForArtifactWithWatchBuff({
        description: 'Set death procs',
        modifierType: ModifierDeathWatchBuffSelf.type,
        triggerWatchBuff: modifier => modifier.onDeathWatch(),
      });
    case Cards.Artifact.TwinFang:
      return getModifierForArtifactWithWatchBuff({
        description: 'Set damage procs',
        modifierType: ModifierMyMinionOrGeneralDamagedWatchBuffSelf.type,
        triggerWatchBuff: modifier => modifier.onDamageDealtToMinionOrGeneral(),
      });
    default:
      return [];
  }
}

function getModifierForArtifactWithWatchBuff({
  description,
  modifierType,
  triggerWatchBuff,
}: {
  description: string,
  modifierType: string,
  triggerWatchBuff: (modifier: typeof Modifier) => void,
}) {
  const getProcs = (card: typeof Card) =>
    card.getArtifactModifierByType(modifierType).getSubModifierIndices().length;
  const setProcs = (card: typeof Card, procs: number) => {
    const parentModifier = card.getArtifactModifierByType(modifierType);
    const subModifiers = parentModifier.getSubModifiers();
    if (procs === subModifiers.length) {
      return;
    }
    const gameSession = card.getGameSession();
    if (procs < subModifiers.length) {
      subModifiers.slice(procs).forEach((modifier: typeof Modifier) => {
        gameSession.removeModifier(modifier);
      });
    } else {
      for (let i = subModifiers.length; i < procs; i++) {
        triggerWatchBuff(parentModifier);
      }
    };
    gameSession.simulateAction();
  };
  return [
    getNumberModifier({
      description,
      getValue: getProcs,
      setValue: setProcs,
    }),
  ];
}

function getBooleanModifier({
  turnOffDescription,
  turnOnDescription,
  getValue,
  setValue,
}: {
  turnOffDescription: string,
  turnOnDescription: string,
  getValue: (card: typeof Card) => boolean,
  setValue: (card: typeof Card, value: boolean) => void,
}): CustomModifier<boolean> {
  return {
    getData: card => {
      const value = getValue(card);
      const description = value ? turnOffDescription : turnOnDescription;
      return { description, value };
    },
    setValue: (card, value) => {
      if (typeof value !== 'boolean') {
        throw Error('invalid');
      }
      setValue(card, value);
    },
    fromSpecString: specString => specString.readNBits(1) === 1,
    toString: value => {
      if (typeof value !== 'boolean') {
        throw Error('invalid');
      }
      return SpecString.boolToBit(value);
    },
  };
}

function getNumberModifier({
  description,
  getValue,
  setValue,
}: {
  description: string,
  getValue: (card: typeof Card) => number,
  setValue: (card: typeof Card, value: number) => void,
}): CustomModifier<number> {
  return {
    getData: card => ({ description, value: getValue(card) }),
    setValue: (card, value) => {
      if (typeof value !== 'number') {
        throw Error('invalid');
      }
      setValue(card, value);
    },
    fromSpecString: specString => specString.countZeroes() ?? 0,
    toString: value => {
      if (typeof value !== 'number') {
        throw Error('invalid');
      }
      return SpecString.writeNZeroes(value);
    },
  };
}

type CustomModifier<T> = {
  getData: (card: typeof Card) => { description: string, value: T },
  setValue: (card: typeof Card, value: CustomModifierValue) => void,
  fromSpecString: (specString: SpecString) => T,
  toString: (value: CustomModifierValue) => string,
};

export type CustomModifierValue = boolean | number;
