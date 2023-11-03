ModifierOpeningGambit = require './modifierOpeningGambit'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class ModifierOpeningGambitPutCardInHand extends ModifierOpeningGambit

  type:"ModifierOpeningGambitPutCardInHand"
  @type:"ModifierOpeningGambitPutCardInHand"

  count: 1

  @createContextObject: (cardDataOrIndexToPutInHand = null, options) ->
    contextObject = super(options)
    contextObject.cardDataOrIndexToPutInHand = cardDataOrIndexToPutInHand
    return contextObject

  onOpeningGambit: (action) ->
    super(action)
    for [0...@count]
      a = new PutCardInHandAction(
        this.getGameSession(),
        @getCard().getOwnerId(),
        @getCardDataOrIndexToPutInHand(),
      )
      this.getGameSession().executeAction(a)
    return

  getCardDataOrIndexToPutInHand: () ->
    return @cardDataOrIndexToPutInHand

module.exports = ModifierOpeningGambitPutCardInHand
