DamageAction = require 'app/sdk/actions/damageAction'
ModifierTakeDamageWatch = require './modifierTakeDamageWatch'

class ModifierTakeDamageWatchDamageMyGeneral extends ModifierTakeDamageWatch

  type:"ModifierTakeDamageWatchDamageMyGeneral"
  @type:"ModifierTakeDamageWatchDamageMyGeneral"

  damageAmount: 0

  fxResource: ["FX.Modifiers.ModifierTakeDamageWatch", "FX.Modifiers.ModifierGenericDamage"]

  @createContextObject: (damageAmount, options) ->
    contextObject = super(options)
    contextObject.damageAmount = damageAmount
    return contextObject

  onDamageTaken: (action) ->
    myGeneral = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@getOwnerId())
    damageAction.setSource(@getCard())
    damageAction.setTarget(myGeneral)
    damageAction.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(damageAction)

module.exports = ModifierTakeDamageWatchDamageMyGeneral
