const Cards = require('app/sdk/cards/cardsLookupComplete');
const GameSession = require('app/sdk/gameSession');
const ModifierImmuneToDamage = require('app/sdk/modifiers/modifierImmuneToDamage');

export type ContextObject = {
  allowMultiple: boolean,
  contextObject: {
    cardId: number,
    durationIsUntilYourNextTurn?: boolean,
    indexOfContextObject: number,
    type: string,
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

export const contextObjectCardIds = [
  Cards.Artifact.Winterblade,
];

export function getDescription({ contextObject }: ContextObject): string {
  let { description } = GameSession.current().getModifierClassForType(
    contextObject.type,
  );
  if (contextObject.durationIsUntilYourNextTurn === true) {
    description += ' until your next turn';
  }
  return description;
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
