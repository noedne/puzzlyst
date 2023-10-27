Modifier = require './modifier'
ModifierDynamicCountModifySelf = require './modifierDynamicCountModifySelf'
CardType = require 'app/sdk/cards/cardType'

class ModifierDynamicCountModifySelfByAlliesNearby extends ModifierDynamicCountModifySelf

  type:"ModifierDynamicCountModifySelfByAlliesNearby"
  @type:"ModifierDynamicCountModifySelfByAlliesNearby"

  @description:"This minion has %X for each nearby ally"

  activeInDeck: false
  activeInHand: false
  activeInSignatureCards: false
  activeOnBoard: true

  @createContextObject: (attackBuff = 0, maxHPBuff = 0, description, appliedName, options = undefined) ->
    contextObject = super(options)
    perAllyStatBuffContextObject = Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff)
    if appliedName
      perAllyStatBuffContextObject.appliedName = appliedName
    contextObject.description = description
    contextObject.modifiersContextObjects = [perAllyStatBuffContextObject]
    return contextObject

  @getDescription: (modifierContextObject) ->
    return @description.replace /%X/, modifierContextObject.description

  getCurrentCount: () ->
    nearbyAllies = @getGameSession().getBoard().getFriendlyEntitiesAroundEntity(
      @getCard(),
      CardType.Unit,
      1, # radius
      true, # allowUntargetable
    )
    return nearbyAllies.length

module.exports = ModifierDynamicCountModifySelfByAlliesNearby
