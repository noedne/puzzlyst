PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'
RemoveCardFromHandAction = require 'app/sdk/actions/removeCardFromHandAction'
Spell =   require './spell'

class SpellMindSteal extends Spell

  onApplyOneEffectToBoard: () ->
    @getOwner().getDeck().getHand().forEach (cardIndex, i) =>
      if cardIndex?
        @getGameSession().executeAction(
          new RemoveCardFromHandAction(
            @getGameSession(),
            i,
            @getOwnerId(),
          ),
        )
    @getGameSession()
      .getOpponentPlayerOfPlayerId(@getOwnerId())
      .getDeck()
      .getCardsInHandExcludingMissing()
      .forEach (card) =>
        @getGameSession().executeAction(
          new PutCardInHandAction(
            @getGameSession(),
            @getOwnerId(),
            card.createNewCardData(),
          ),
        )
    return

module.exports = SpellMindSteal
