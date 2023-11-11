Modifier = require './modifier'
ModifierEndTurnWatch = require './modifierEndTurnWatch'
CardType = require 'app/sdk/cards/cardType'
Stringifiers = require 'app/sdk/helpers/stringifiers'

class ModifierEndTurnWatchBuffSelf extends ModifierEndTurnWatch

  type:"ModifierEndTurnWatchBuffSelf"
  @type:"ModifierEndTurnWatchBuffSelf"

  @modifierName:"End Turn Watch"
  @description: "At the end of your turn, this minion gets %X"

  fxResource: ["FX.Modifiers.ModifierEndTurnWatch", "FX.Modifiers.ModifierGenericBuff"]

  @createContextObject: (attackBuff=0, maxHPBuff=0,options) ->
    contextObject = super(options)
    if (attackBuff != 0 or maxHPBuff != 0)
      contextObject.modifiersContextObjects = [
        Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff,{
          modifierName:@modifierName,
          description:Stringifiers.stringifyAttackHealthBuff(attackBuff,maxHPBuff),
        })
      ]
      if options and options.appliedName
        contextObject.modifiersContextObjects[0].appliedName = options.appliedName
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      subContextObject = modifierContextObject.modifiersContextObjects[0]
      return @description.replace /%X/, Stringifiers.stringifyAttackHealthBuff(subContextObject.attributeBuffs.atk,subContextObject.attributeBuffs.maxHP)
    else
      return @description

  onTurnWatch: (action) ->
    # override me in sub classes to implement special behavior
    @applyManagedModifiersFromModifiersContextObjects(@modifiersContextObjects, @getCard())

module.exports = ModifierEndTurnWatchBuffSelf
