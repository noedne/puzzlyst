const Cards = require('app/sdk/cards/cardsLookupComplete');
const ModifierImmuneToDamage = require('app/sdk/modifiers/modifierImmuneToDamage');

export type ContextObject = {
  allowMultiple: boolean,
  contextObject: {
    cardId: number,
    indexOfContextObject: number,
    version: number,
  },
};

function getContextObjectData(cardId: number, _version = 0) {
  switch (cardId) {
    case Cards.Artifact.Winterblade:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierImmuneToDamage.createContextObject({
            durationIsUntilYourNextTurn: true,
          }),
        },
      ];
    default:
      return [];
  }
}

export default function getContextObjectDataWithIndex(
  cardId: number, version = 0,
): ContextObject[] {
  return getContextObjectData(cardId, version).map(
    (data, indexOfContextObject) =>
    ({
      ...data,
      contextObject: {
        ...data.contextObject,
        cardId,
        indexOfContextObject,
        version,
      }
    }));
}
