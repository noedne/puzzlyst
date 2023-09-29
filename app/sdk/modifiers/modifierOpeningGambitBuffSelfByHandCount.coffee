ModifierOpeningGambit = require './modifierOpeningGambit'
Stringifiers = require 'app/sdk/helpers/stringifiers'
Modifier = require './modifier'

class ModifierOpeningGambitBuffSelfByHandCount extends ModifierOpeningGambit

  type: "ModifierOpeningGambitBuffSelfByHandCount"
  @type: "ModifierOpeningGambitBuffSelfByHandCount"

  @description: "Gains %X for each card in your opponent\'s action bar"

  fxResource: ["FX.Modifiers.ModifierOpeningGambit", "FX.Modifiers.ModifierGenericBuff"]
  useOpponentHand: true

  getPrivateDefaults: (gameSession) ->
    p = super(gameSession)

    p.numCardsInHand = 0

    return p

  @createContextObject: (attackBuff = 0, maxHPBuff = 0, appliedName = "Power of The Hand", options = undefined) ->
    contextObject = super(options)
    buffContextObject = Modifier.createContextObjectWithAttributeBuffs(attackBuff,maxHPBuff)
    buffContextObject.appliedName = appliedName
    contextObject.modifiersContextObjects = [buffContextObject]
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      subContextObject = modifierContextObject.modifiersContextObjects[0]
      return @description.replace /%X/, Stringifiers.stringifyAttackHealthBuff(subContextObject.attributeBuffs.atk,subContextObject.attributeBuffs.maxHP)
    else
      return @description

  applyManagedModifiersFromModifiersContextObjects: (modifiersContextObjects, card) ->
    # apply once per card in opponent's hand
    for i in [0...@_private.numCardsInHand]
      super(modifiersContextObjects, card)
    return

  onOpeningGambit: () ->
    super()
    playerId = @getCard().getOwnerId()
    if @useOpponentHand
      playerId = @getGameSession().getOpponentPlayerIdOfPlayerId(playerId)
    @_private.numCardsInHand = @getGameSession().getPlayerById(playerId).getDeck().getNumCardsInHand()
    @applyManagedModifiersFromModifiersContextObjects(@modifiersContextObjects, @getCard())

module.exports = ModifierOpeningGambitBuffSelfByHandCount
