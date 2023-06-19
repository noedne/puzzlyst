import SpecString from "./SpecString";

const Card = require('app/sdk/cards/card');
const Cards = require('app/sdk/cards/cardsLookupComplete');
const Modifier = require('app/sdk/modifiers/modifier');
const ModifierAbsorbDamage = require('app/sdk/modifiers/modifierAbsorbDamage');

export default function getCustomModifiers(cardId: number, _version = 0) {
  switch (cardId) {
    case Cards.Artifact.ArclyteRegalia: {
      const getModifierAbsorbDamage = (card: typeof Card) =>
        card
          .getGameSession()
          .getGeneralForPlayerId(card.getOwnerId())
          .getArtifactModifiers()
          .find((modifier: typeof Modifier) =>
            modifier.type === ModifierAbsorbDamage.type);
      return [
        {
          description: 'Damaged at start of turn',
          fromSpecString: (specString: SpecString) => {
            const isDamaged = specString.readNBits(1);
            return (card: typeof Card) => {
              const modifierAbsorbDamage = getModifierAbsorbDamage(card);
              if (modifierAbsorbDamage != null && isDamaged) {
                modifierAbsorbDamage.canAbsorb = false;
              }
            };
          },
          toString: (card: typeof Card) => {
            const modifierAbsorbDamage = getModifierAbsorbDamage(card);
            return SpecString.boolToBit(modifierAbsorbDamage?.canAbsorb === false);
          }
        },
      ];
    }
    default:
      return [];
  }
}
