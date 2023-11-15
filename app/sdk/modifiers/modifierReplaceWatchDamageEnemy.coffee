ModifierReplaceWatch = require './modifierReplaceWatch'
DamageAction = require 'app/sdk/actions/damageAction'
RandomDamageAction = require 'app/sdk/actions/randomDamageAction'

class ModifierReplaceWatchDamageEnemy extends ModifierReplaceWatch

  type:"ModifierReplaceWatchDamageEnemy"
  @type:"ModifierReplaceWatchDamageEnemy"

  @modifierName:"Replace Watch (damage random enemy)"
  @description: "Whenever you replace a card, deal %X damage to the enemy General and a random enemy minion"

  fxResource: ["FX.Modifiers.ModifierReplaceWatch", "FX.Modifiers.ModifierGenericDamageSmall"]

  splitRandomly: false

  @createContextObject: (damageAmount, options=undefined) ->
    contextObject = super(options)
    contextObject.damageAmount = damageAmount
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return @description.replace /%X/, modifierContextObject.damageAmount
    else
      return @description

  onReplaceWatch: (action) ->
    if @splitRandomly
      @damageEnemy()
      @damageEnemy()
    else
      @damageGeneral()
      @damageMinion()

  damageGeneral: () ->
    action = new DamageAction(@getGameSession())
    action.setTarget(
      @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    )
    @executeAction(action)

  damageMinion: () ->
    @executeAction(new RandomDamageAction(@getGameSession()))

  damageEnemy: () ->
    action = new RandomDamageAction(@getGameSession())
    action.canTargetGenerals = true
    @executeAction(action)

  executeAction: (action) ->
    action.setOwnerId(@getOwnerId())
    action.setSource(@getCard())
    action.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(action)

module.exports = ModifierReplaceWatchDamageEnemy
