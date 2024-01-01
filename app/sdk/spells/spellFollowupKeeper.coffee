ModifierKeeper = require 'app/sdk/modifiers/modifierKeeper'
Spell = require './spell'
CardType = require 'app/sdk/cards/cardType'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class SpellFollowupKeeper extends Spell

  atkValue: 1
  hpValue: 1
  costValue: 1

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    super(board,x,y,sourceAction)

    entity = board.getCardAtPosition({x: x, y: y}, CardType.Unit)
    newCardData = entity.createNewCardData()

    newCardData.additionalModifiersContextObjects = [ModifierKeeper.createContextObject()]
    putCardInHandAction = new PutCardInHandAction(@getGameSession(), entity.getOwnerId(), newCardData)
    @getGameSession().executeAction(putCardInHandAction)

module.exports = SpellFollowupKeeper
