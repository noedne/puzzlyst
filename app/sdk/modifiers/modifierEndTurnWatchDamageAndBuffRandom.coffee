DamageAction = require 'app/sdk/actions/damageAction'
Modifier = require './modifier'
ModifierEndTurnWatch = require './modifierEndTurnWatch'

class ModifierEndTurnWatchDamageAndBuffRandom extends ModifierEndTurnWatch

  type:"ModifierEndTurnWatchDamageAndBuffRandom"
  @type:"ModifierEndTurnWatchDamageAndBuffRandom"

  @description:"At the end of your turn, deal %X damage to a random minion or General. If they are an ally, give them %X/+0."

  fxResource: ["FX.Modifiers.ModifierEndTurnWatch", "FX.Modifiers.ModifierGenericChainLightning"]

  @createContextObject: (damageAmount=0, options) ->
    contextObject = super(options)
    contextObject.damageAmount = damageAmount
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      replaceText = @description.replace /%X/, modifierContextObject.damageAmount

      return replaceText
    else
      return @description

  onTurnWatch: (action) ->
    super(action)

    if @getGameSession().getIsRunningAsAuthoritative()
      units = @getGameSession().getBoard().getUnits()
      if units.length > 0
        unitToDamage = units[@getGameSession().getRandomIntegerForExecution(units.length)]
        damageAction = new DamageAction(@getGameSession())
        damageAction.setOwnerId(@getCard().getOwnerId())
        damageAction.setSource(@getCard())
        damageAction.setTarget(unitToDamage)
        damageAction.setDamageAmount(@damageAmount)
        @getGameSession().executeAction(damageAction)
        if unitToDamage.getIsSameTeamAs(@getCard())
          @getGameSession().applyModifierContextObject(
            Modifier.createContextObjectWithAttributeBuffs(@damageAmount),
            unitToDamage,
          )
    return

module.exports = ModifierEndTurnWatchDamageAndBuffRandom
