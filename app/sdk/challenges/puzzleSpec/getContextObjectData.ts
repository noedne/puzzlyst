const Cards = require('app/sdk/cards/cardsLookupComplete');
const GameSession = require('app/sdk/gameSession');
const ModifierImmuneToDamage = require('app/sdk/modifiers/modifierImmuneToDamage');

export type ContextObject = {
  allowMultiple: boolean,
  contextObject: {
    cardId: number,
    durationIsUntilStartOfNextTurn?: boolean,
    indexOfContextObject: number,
    type: string,
  },
};

function getContextObjectData(cardId: number) {
  switch (cardId) {
    case Cards.Artifact.Winterblade:
      return [
        {
          allowMultiple: false,
          contextObject: ModifierImmuneToDamage.createContextObject({
            durationIsUntilStartOfNextTurn: true,
          }),
        },
      ];
    default:
      return [];
  }
}

export const contextObjectCardIds: number[] = [
  Cards.Artifact.Winterblade,
];

export function getDescription({ contextObject }: ContextObject): string {
  let { description } = GameSession.current().getModifierClassForType(
    contextObject.type,
  );
  if (contextObject.durationIsUntilStartOfNextTurn === true) {
    description += ' until your next turn';
  }
  return description;
}

export default function getContextObjectDataWithIndex(
  cardId: number,
): ContextObject[] {
  return getContextObjectData(cardId).map(
    (data, indexOfContextObject) =>
    ({
      ...data,
      contextObject: {
        ...data.contextObject,
        cardId,
        indexOfContextObject,
      }
    }));
}
