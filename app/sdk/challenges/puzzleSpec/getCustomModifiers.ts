import SpecString from "./SpecString";

const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const Modifier = require('app/sdk/modifiers/modifier');
const ModifierAbsorbDamageOnce = require('app/sdk/modifiers/modifierAbsorbDamageOnce');

export default function getCustomModifiers(cardId: number) {
  switch (cardId) {
    case Cards.Artifact.ArclyteRegalia: {
      const getModifierAbsorbDamage = (card: typeof Card) =>
        card
          .getGameSession()
          .getGeneralForPlayerId(card.getOwnerId())
          .getArtifactModifiers()
          .find((modifier: typeof Modifier) =>
            modifier.type === ModifierAbsorbDamageOnce.type);
      const getIsDamaged = (card: typeof Card) =>
        getModifierAbsorbDamage(card)?.canAbsorb === false;
      const setIsDamaged = (card: typeof Card, isDamaged: boolean) => {
        const modifierAbsorbDamage = getModifierAbsorbDamage(card);
        if (modifierAbsorbDamage != null) {
          modifierAbsorbDamage.canAbsorb = !isDamaged;
        }
      };
      return [
        getBooleanModifier({
          turnOffDescription: 'Reset damage reduction',
          turnOnDescription: 'Remove damage reduction',
          getValue: getIsDamaged,
          setValue: setIsDamaged,
        }),
      ];
    }
    default:
      return [];
  }
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
}) {
  return {
    opensModal: false,
    getDescription: (value: boolean) => value
      ? turnOffDescription
      : turnOnDescription,
    getValue,
    setValue,
    fromSpecString: (specString: SpecString) => {
      const value = specString.readNBits(1) === 1;
      return (card: typeof Card) => setValue(card, value);
    },
    toString: (card: typeof Card) => SpecString.boolToBit(getValue(card)),
  };
}
