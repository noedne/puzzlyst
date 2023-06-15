Cards = require('app/sdk/cards/cardsLookupComplete')
ModifierAbsorbDamage = require('app/sdk/modifiers/modifierAbsorbDamage')
SDK = require('app/sdk')

getCustomModifiers = (cardId, version = 0) ->
  switch cardId
    when Cards.Artifact.ArclyteRegalia
      return [
        description: 'Damaged at start of turn'
        modifier: (specString) ->
          isDamaged = specString.readNBits(1)
          return (card) ->
            if isDamaged
              SDK.GameSession
                .current()
                .getGeneralForPlayerId(card.getOwnerId())
                .getArtifactModifiers()
                .find (modifier) ->
                  modifier.type == ModifierAbsorbDamage.type
                ?.canAbsorb = false
      ]

module.exports = getCustomModifiers
