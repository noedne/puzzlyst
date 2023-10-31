ModifierCounter = require './modifierCounter'
ModifierCounterMechazorBuildProgressDescription = require './modifierCounterMechazorBuildProgressDescription'

i18next = require('i18next')

###
  Counts current progress towards mechaz0r build
###
class ModifierCounterMechazorBuildProgress extends ModifierCounter

  type:"ModifierCounterMechazorBuildProgress"
  @type:"ModifierCounterMechazorBuildProgress"

  maxStacks: 1

  @createContextObject: (mechazorProgressType) ->
    contextObject = super()
    contextObject.mechazorProgressType = mechazorProgressType
    return contextObject

  getModifierContextObjectToApply: () ->
    modContextObject = ModifierCounterMechazorBuildProgressDescription.createContextObject(@getCurrentCount())
    modContextObject.appliedName = i18next.t("modifiers.mechazor_counter_applied_name")

    return modContextObject

  getCurrentCount: () ->
    modifierMechazorProgress = @getGameSession().getModifierClassForType(@mechazorProgressType)
    return modifierMechazorProgress.getPercentComplete(@getOwner())

module.exports = ModifierCounterMechazorBuildProgress
