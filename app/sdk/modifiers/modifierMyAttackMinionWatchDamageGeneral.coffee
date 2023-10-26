DamageAction = require 'app/sdk/actions/damageAction'
ModifierMyAttackMinionWatch = require './modifierMyAttackMinionWatch'

class ModifierMyAttackMinionWatchDamageGeneral extends ModifierMyAttackMinionWatch

  type:"ModifierMyAttackMinionWatchDamageGeneral"
  @type:"ModifierMyAttackMinionWatchDamageGeneral"

  @modifierName:"Damaging Attacks"
  @description:"Whenever this attacks a minion, deal %X damage to the enemy General"

  fxResource: ["FX.Modifiers.ModifierGenericDamageIce"]

  @createContextObject: (damageAmount=0,options) ->
    contextObject = super(options)
    contextObject.damageAmount = damageAmount
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return @description.replace /%X/, modifierContextObject.damageAmount
    else
      return @description

  onMyAttackMinionWatch: (action) ->
    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@getOwnerId())
    damageAction.setSource(@getCard())
    damageAction.setTarget(
      @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    )
    damageAction.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(damageAction)

module.exports = ModifierMyAttackMinionWatchDamageGeneral
