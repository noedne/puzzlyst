ModifierDyingWish =  require './modifierDyingWish'
CardType = require 'app/sdk/cards/cardType'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class ModifierDyingWishPutCardInHand extends ModifierDyingWish

  type:"ModifierDyingWishPutCardInHand"
  @type:"ModifierDyingWishPutCardInHand"

  @description:"Put %X in your Action Bar"

  cardDataOrIndexToPutInHand: null
  shouldFill: false

  @createContextObject: (cardDataOrIndexToPutInHand, cardDescription,options) ->
    contextObject = super(options)
    contextObject.cardDataOrIndexToPutInHand = cardDataOrIndexToPutInHand
    contextObject.cardDescription = cardDescription
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return @description.replace /%X/, modifierContextObject.cardDescription
    else
      return @description

  onDyingWish: () ->
    if @shouldFill
      deck = @getOwner().getDeck()
      count = deck.getHand().length - deck.getNumCardsInHand()
    else
      count = 1

    for [0...count]
      a = new PutCardInHandAction(
        @getGameSession(),
        @getCard().getOwnerId(),
        @getCardDataOrIndexToPutInHand(),
      )
      this.getGameSession().executeAction(a)

    return
  
  getCardDataOrIndexToPutInHand: () ->
    if @cardDataOrIndexToPutInHand?
      return @cardDataOrIndexToPutInHand
    return @getCard().createNewCardData()

module.exports = ModifierDyingWishPutCardInHand
