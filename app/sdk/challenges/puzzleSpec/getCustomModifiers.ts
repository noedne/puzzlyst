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
