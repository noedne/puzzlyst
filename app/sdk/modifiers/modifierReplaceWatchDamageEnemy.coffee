ModifierReplaceWatch = require './modifierReplaceWatch'
DamageAction = require 'app/sdk/actions/damageAction'
RandomDamageAction = require 'app/sdk/actions/randomDamageAction'

class ModifierReplaceWatchDamageEnemy extends ModifierReplaceWatch

  type:"ModifierReplaceWatchDamageEnemy"
  @type:"ModifierReplaceWatchDamageEnemy"

  @modifierName:"Replace Watch (damage random enemy)"
  @description: "Whenever you replace a card, deal %X damage to the enemy General and a random enemy minion"

  fxResource: ["FX.Modifiers.ModifierReplaceWatch", "FX.Modifiers.ModifierGenericDamageSmall"]

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
    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@getCard().getOwnerId())
    damageAction.setSource(@getCard())
    damageAction.setTarget(
      @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    )
    damageAction.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(damageAction)

    randomDamageAction = new RandomDamageAction(@getGameSession())
    randomDamageAction.setOwnerId(@getCard().getOwnerId())
    randomDamageAction.setSource(@getCard())
    randomDamageAction.setDamageAmount(@damageAmount)
    randomDamageAction.canTargetGenerals = false
    @getGameSession().executeAction(randomDamageAction)

module.exports = ModifierReplaceWatchDamageEnemy
