PlayerModifier = require './playerModifier'
CardType = require 'app/sdk/cards/cardType'
ApplyCardToBoardAction = require 'app/sdk/actions/applyCardToBoardAction'
PlayCardAsTransformAction = require 'app/sdk/actions/playCardAsTransformAction'
CloneEntityAsTransformAction = require 'app/sdk/actions/cloneEntityAsTransformAction'
Rarity = require 'app/sdk/cards/rarityLookup'

class PlayerModifierSummonWatch extends PlayerModifier

  type:"PlayerModifierSummonWatch"
  @type:"PlayerModifierSummonWatch"

  includeTokens: true

  onAction: (e) ->
    super(e)

    action = e.action

    if @getIsActionRelevant(action)
      @onSummonWatch(action)

  getIsActionRelevant: (action) ->
    # watch for a unit being summoned in any way by the player who owns this entity
    if action instanceof ApplyCardToBoardAction and action.getOwnerId() is @getCard().getOwnerId() and action.getCard()?.type is CardType.Unit and action.getCard() isnt @getCard() and action.getCard() isnt @getSourceCard()
      # don't react to transforms
      if !(action instanceof PlayCardAsTransformAction or action instanceof CloneEntityAsTransformAction)
        if @includeTokens or
            action.getCard().getRarityId() isnt Rarity.TokenUnit
          return true
    return false

  onSummonWatch: (action) ->
    # override me in sub classes to implement special behavior

module.exports = PlayerModifierSummonWatch
