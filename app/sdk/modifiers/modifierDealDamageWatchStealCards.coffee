ModifierDealDamageWatch = require './modifierDealDamageWatch'
CardType = require 'app/sdk/cards/cardType'
DrawCardAction = require 'app/sdk/actions/drawCardAction'

class ModifierDealDamageWatchStealCards extends ModifierDealDamageWatch

  type:"ModifierDealDamageWatchStealCards"
  @type:"ModifierDealDamageWatchStealCards"

  @modifierName:"Plunder"
  @description:"Whenever this damages an enemy, shuffle a card from your opponent's deck into yours for each damage it dealt."

  onDealDamage: (action) ->
    super(action)
    deck = @getGameSession()
      .getOpponentPlayerOfPlayerId(@getOwnerId())
      .getDeck()
      .getDrawPile()
      .slice()
    for [0...Math.min(deck.length, action.getTotalDamageAmount())]
      index = @getGameSession().getRandomIntegerForExecution(deck.length)
      action = @getOwner().getDeck().actionPutCardInDeck(deck[index])
      @getGameSession().executeAction(action)
      deck.splice(index, 1)
    return

module.exports = ModifierDealDamageWatchStealCards
