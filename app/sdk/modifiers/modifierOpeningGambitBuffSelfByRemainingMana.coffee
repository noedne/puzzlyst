Action = require 'app/sdk/actions/action'
ModifierOpeningGambit = require './modifierOpeningGambit'
Stringifiers = require 'app/sdk/helpers/stringifiers'
Modifier = require './modifier'

class ModifierOpeningGambitBuffSelfByRemainingMana extends ModifierOpeningGambit

  type: "ModifierOpeningGambitBuffSelfByRemainingMana"
  @type: "ModifierOpeningGambitBuffSelfByRemainingMana"

  @description: "Gains %X for each remaining mana"

  fxResource: ["FX.Modifiers.ModifierOpeningGambit", "FX.Modifiers.ModifierGenericBuff"]
  useOpponentHand: true

  getPrivateDefaults: (gameSession) ->
    p = super(gameSession)

    p.numManaRemaining = 0

    return p

  @createContextObject: (attackBuff = 0, maxHPBuff = 0, options = undefined) ->
    contextObject = super(options)
    buffContextObject = Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff)
    buffContextObject.appliedName = 'One Side Fits All'
    contextObject.modifiersContextObjects = [buffContextObject]
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      subContextObject = modifierContextObject.modifiersContextObjects[0]
      return @description.replace /%X/, Stringifiers.stringifyAttackHealthBuff(subContextObject.attributeBuffs.atk,subContextObject.attributeBuffs.maxHP)
    else
      return @description

  applyManagedModifiersFromModifiersContextObjects: (modifiersContextObjects, card) ->
    for i in [0...@_private.numManaRemaining]
      super(modifiersContextObjects, card)
    return

  onOpeningGambit: () ->
    super()
    @_private.numManaRemaining = @getOwner().getRemainingMana()
    @applyManagedModifiersFromModifiersContextObjects(@modifiersContextObjects, @getCard())
    action = new Action(@getGameSession())
    action.manaCost = @_private.numManaRemaining
    @getGameSession().executeAction(action)

module.exports = ModifierOpeningGambitBuffSelfByRemainingMana
