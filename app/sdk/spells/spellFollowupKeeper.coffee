Modifier = require 'app/sdk/modifiers/modifier'
ModifierManaCostChange = require 'app/sdk/modifiers/modifierManaCostChange'
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

    statContextObject = Modifier.createContextObjectWithAbsoluteAttributeBuffs(
      @atkValue,
      @hpValue,
    )
    statContextObject.isRemovable = false

    costChangeContextObject = ModifierManaCostChange.createContextObject(
      @costValue
    )
    costChangeContextObject.attributeBuffsAbsolute = ['manaCost']
    costChangeContextObject.isRemovable = false

    newCardData.additionalModifiersContextObjects = [
      statContextObject,
      costChangeContextObject,
    ]
    putCardInHandAction = new PutCardInHandAction(@getGameSession(), entity.getOwnerId(), newCardData)
    @getGameSession().executeAction(putCardInHandAction)

module.exports = SpellFollowupKeeper
