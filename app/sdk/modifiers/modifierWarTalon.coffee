AttackAction = require 'app/sdk/actions/attackAction'
DamageAction = require 'app/sdk/actions/damageAction'
ModifierDealDamageWatch = require './modifierDealDamageWatch'
ModifierStrikeback = require './modifierStrikeback'

class ModifierWarTalon extends ModifierDealDamageWatch

  type:"ModifierWarTalon"
  @type:"ModifierWarTalon"

  enemyOnly: true
  minionOnly: true

  @createContextObject: (attackOnly = false, options) ->
    contextObject = super(options)
    contextObject.attackOnly = attackOnly
    return contextObject

  getIsActionRelevant: (action) ->
    isRelevant = super(action) and action instanceof AttackAction
    if @attackOnly
      isCounterattack =
        action.getTriggeringModifier() instanceof ModifierStrikeback
      isRelevant = isRelevant and not isCounterattack
    return isRelevant

  onDealDamage: (action) ->
    super()
    target = action.getTarget()
    if target.getIsGeneral()
      return

    excessDamage = target.getDamage() - target.getMaxHP()
    if excessDamage is 0
      return

    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@getOwnerId())
    damageAction.setSource(@getCard())
    damageAction.setTarget(
      @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    )
    damageAction.setDamageAmount(excessDamage)
    @getGameSession().executeAction(damageAction)

module.exports = ModifierWarTalon
