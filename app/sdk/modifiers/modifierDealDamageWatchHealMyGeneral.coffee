ModifierDealDamageWatch = require './modifierDealDamageWatch'
HealAction = require 'app/sdk/actions/healAction'

class ModifierDealDamageWatchHealMyGeneral extends ModifierDealDamageWatch

  type:"ModifierDealDamageWatchHealMyGeneral"
  @type:"ModifierDealDamageWatchHealMyGeneral"

  @modifierName:"Deal Damage Watch"
  @description:"Whenever this minion deals damage, restore %X Health to your General"

  fxResource: ["FX.Modifiers.ModifierDealDamageWatch", "FX.Modifiers.ModifierGenericHeal"]

  @createContextObject: (healAmount, options) ->
    contextObject = super(options)
    contextObject.healAmount = healAmount
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      if modifierContextObject.healAmount?
        return @description.replace /%X/, modifierContextObject.healAmount
      return "When this deals damage, heal your General for the amount dealt"
    else
      return @description

  onDealDamage: (action) ->
    general = @getCard().getGameSession().getGeneralForPlayerId(@getCard().getOwnerId())

    healAction = new HealAction(this.getGameSession())
    healAction.setOwnerId(@getCard().getOwnerId())
    healAction.setTarget(general)
    healAction.setHealAmount(
      if @healAmount? then @healAmount else action.getTotalDamageAmount()
    )
    @getGameSession().executeAction(healAction)

module.exports = ModifierDealDamageWatchHealMyGeneral
