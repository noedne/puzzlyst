DamageAction = require 'app/sdk/actions/damageAction'
HealAction = require 'app/sdk/actions/healAction'
ModifierMyAttackOrCounterattackWatch = require './modifierMyAttackOrCounterattackWatch'
ModifierStrikeback = require './modifierStrikeback'

class ModifierMyAttackOrCounterattackWatchHealOrDamageGeneral extends ModifierMyAttackOrCounterattackWatch

  type:"ModifierMyAttackOrCounterattackWatchHealOrDamageGeneral"
  @type:"ModifierMyAttackOrCounterattackWatchHealOrDamageGeneral"

  @createContextObject: (healAmount = 0, damageAmount = 0, options=undefined) ->
    contextObject = super(options)
    contextObject.healAmount = healAmount
    contextObject.damageAmount = damageAmount
    return contextObject

  onMyAttackOrCounterattackWatch: (a) ->
    if a.getTriggeringModifier() instanceof ModifierStrikeback
      action = new DamageAction(@getGameSession())
      action.setTarget(
        @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
      )
      action.setDamageAmount(@damageAmount)
    else
      action = new HealAction(@getGameSession())
      action.setTarget(@getGameSession().getGeneralForPlayerId(@getOwnerId()))
      action.setHealAmount(@healAmount)
    action.setSource(@getCard())
    action.setOwnerId(@getOwnerId())
    @getGameSession().executeAction(action)

module.exports = ModifierMyAttackOrCounterattackWatchHealOrDamageGeneral
