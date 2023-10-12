ModifierOpeningGambit = require './modifierOpeningGambit'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class ModifierOpeningGambitPutCardInHand extends ModifierOpeningGambit

  type:"ModifierOpeningGambitPutCardInHand"
  @type:"ModifierOpeningGambitPutCardInHand"

  cardDataOrIndexToPutInHand: null
  count: 1

  @createContextObject: (cardDataOrIndexToPutInHand, options) ->
    contextObject = super(options)
    contextObject.cardDataOrIndexToPutInHand = cardDataOrIndexToPutInHand
    return contextObject

  onOpeningGambit: (action) ->
    super(action)
    for [0...@count]
      a = new PutCardInHandAction(this.getGameSession(), @getCard().getOwnerId(), @cardDataOrIndexToPutInHand)
      this.getGameSession().executeAction(a)
    return

module.exports = ModifierOpeningGambitPutCardInHand
