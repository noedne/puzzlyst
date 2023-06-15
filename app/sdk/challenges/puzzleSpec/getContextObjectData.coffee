Cards = require('app/sdk/cards/cardsLookupComplete');
ModifierImmuneToDamage = require('app/sdk/modifiers/modifierImmuneToDamage');

getContextObjectData = (cardId, version = 0) ->
  switch cardId
    when Cards.Artifact.Winterblade
      return [
        allowMultiple: false,
        contextObject: ModifierImmuneToDamage.createContextObject({
          durationIsUntilYourNextTurn: true,
        }),
      ];
    else return [];

module.exports = getContextObjectData;
