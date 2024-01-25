PlayerModifier = require './playerModifier'
PlayerModifierMechazorSummoned = require './playerModifierMechazorSummoned'
ModifierCounterMechazorBuildProgress = require 'app/sdk/modifiers/modifierCounterMechazorBuildProgress'

i18next = require('i18next')

class PlayerModifierMechazorBuildProgress extends PlayerModifier

  type:"PlayerModifierMechazorBuildProgress"
  @type:"PlayerModifierMechazorBuildProgress"

  @isKeyworded: true
  @keywordDefinition: i18next.t("modifiers.mechaz0r_def")

  @modifierName:i18next.t("modifiers.mechaz0r_name")
  @description: "Progress your Mechaz0r build by %X%"

  @isHiddenToUI: true

  @percentPerProgress: 20

  progressContribution: 0 # amount that this tracker contributes to the mechaz0r build, 1 = 20%, 2 = 40%, etc

  @createContextObject: (progressContribution=1, options) ->
    contextObject = super(options)
    contextObject.progressContribution = progressContribution
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      percent = @percentPerProgress * modifierContextObject.progressContribution
      return @description.replace /%X/, percent
    return @description

  onApplyToCardBeforeSyncState: () ->
    # apply a mechaz0r counter to the General when first mechaz0r progress is added
    # once a counter is there, don't need to keep adding - original counter will update on further modifier additions
    if !@getCard().hasActiveModifierClass(ModifierCounterMechazorBuildProgress)
      @getGameSession().applyModifierContextObject(ModifierCounterMechazorBuildProgress.createContextObject(@type), @getCard())

  @followupConditionIsMechazorComplete: (cardWithFollowup, followupCard) ->

    # can we build him?
    return @getNumberCompleted(cardWithFollowup.getOwner()) >= 1

  @getNumberCompleted: (owner) ->
    return Math.floor(@getPercentComplete(owner) / PlayerModifierMechazorSummoned.percentForCompletion)

  @getPercentComplete: (owner) ->
    #get how far progress is
    mechazorProgress = 0
    for modifier in owner.getPlayerModifiersByClass(PlayerModifierMechazorBuildProgress)
      mechazorProgress += modifier.getProgressContribution()

    # check how many times mechaz0r has already been built
    numMechazorsSummoned = owner.getPlayerModifiersByClass(PlayerModifierMechazorSummoned).length

    return mechazorProgress * @percentPerProgress -
      numMechazorsSummoned * PlayerModifierMechazorSummoned.percentForCompletion

  getProgressContribution: () ->
    return @progressContribution

  getStackType: () ->
    # progress contributions should stack only with same contributions
    return super() + "_progress" + @getProgressContribution()

module.exports = PlayerModifierMechazorBuildProgress
