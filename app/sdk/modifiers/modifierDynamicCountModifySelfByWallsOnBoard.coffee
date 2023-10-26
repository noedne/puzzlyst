Modifier = require './modifier'
ModifierDynamicCountModifySelf = require './modifierDynamicCountModifySelf'
ModifierWall = require 'app/sdk/modifiers/modifierWall'
CardType = require 'app/sdk/cards/cardType'

class ModifierDynamicCountModifySelfByWallsOnBoard extends ModifierDynamicCountModifySelf

  type:"ModifierDynamicCountModifySelfByWallsOnBoard"
  @type:"ModifierDynamicCountModifySelfByWallsOnBoard"

  @description:"This minion has %X for each friendly Wall"

  activeInDeck: false
  activeInHand: false
  activeInSignatureCards: false
  activeOnBoard: true

  @createContextObject: (attackBuff = 0, maxHPBuff = 0, description, appliedName, options = undefined) ->
    contextObject = super(options)
    perWallStatBuffContextObject = Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff)
    if appliedName
      perWallStatBuffContextObject.appliedName = appliedName
    contextObject.description = description
    contextObject.modifiersContextObjects = [perWallStatBuffContextObject]
    return contextObject

  @getDescription: (modifierContextObject) ->
    return @description.replace /%X/, modifierContextObject.description

  getCurrentCount: () ->
    wallCount = 0
    for card in @getGameSession().getBoard().getCards(CardType.Unit)
      if card.hasActiveModifierClass(ModifierWall) and card.isOwnedBy(@getCard().getOwner())
        wallCount++
    return wallCount

module.exports = ModifierDynamicCountModifySelfByWallsOnBoard
