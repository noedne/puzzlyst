ModifierStartTurnWatch = require './modifierStartTurnWatch'
DamageAction = require 'app/sdk/actions/damageAction'

CONFIG = require 'app/common/config'

class ModifierStartTurnWatchDamageGenerals extends ModifierStartTurnWatch

  type:"ModifierStartTurnWatchDamageGenerals"
  @type:"ModifierStartTurnWatchDamageGenerals"

  fxResource: ["FX.Modifiers.ModifierStartTurnWatch", "FX.Modifiers.ModifierGenericChainLightningRed"]

  @createContextObject: (ownersGeneralDamageAmount, opponentsGeneralDamageAmount = 0, options) ->
    contextObject = super(options)
    contextObject.ownersGeneralDamageAmount = ownersGeneralDamageAmount
    contextObject.opponentsGeneralDamageAmount = opponentsGeneralDamageAmount
    return contextObject
  
  onTurnWatch: (action) ->
    super(action)

    ownerId = @getCard().getOwnerId()
    ownersGeneral = @getGameSession().getGeneralForPlayerId(ownerId)
    opponentsGeneral = @getGameSession().getGeneralForOpponentOfPlayerId(ownerId)
    @damageGeneralByAmount(ownersGeneral, @ownersGeneralDamageAmount)
    @damageGeneralByAmount(opponentsGeneral, @opponentsGeneralDamageAmount)
  
  damageGeneralByAmount: (general, damageAmount) ->
    if general? && damageAmount? && damageAmount > 0
      damageAction = new DamageAction(this.getGameSession())
      damageAction.setOwnerId(@getCard().getOwnerId())
      damageAction.setSource(@getCard())
      damageAction.setTarget(general)
      damageAction.setDamageAmount(damageAmount)
      @getGameSession().executeAction(damageAction)

module.exports = ModifierStartTurnWatchDamageGenerals
