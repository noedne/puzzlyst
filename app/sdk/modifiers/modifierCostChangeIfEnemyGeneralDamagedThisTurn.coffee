DamageAction = require 'app/sdk/actions/damageAction'
Modifier = require './modifier'
ModifierManaCostChange = require './modifierManaCostChange'
i18next = require 'i18next'

class ModifierCostChangeIfEnemyGeneralDamagedThisTurn extends Modifier

  type:"ModifierCostChangeIfEnemyGeneralDamagedThisTurn"
  @type:"ModifierCostChangeIfEnemyGeneralDamagedThisTurn"

  activeInHand: true
  activeInDeck: true
  activeInSignatureCards: false
  activeOnBoard: false

  fxResource: ["FX.Modifiers.ModifierEnemyTakeDamageWatch"]

  @createContextObject: (costChange=0, appliedName="", options) ->
    contextObject = super(options)
    costChangeContextObject = ModifierManaCostChange.createContextObject(costChange)
    costChangeContextObject.appliedName = appliedName
    costChangeContextObject.durationEndTurn = 1
    contextObject.modifiersContextObjects = [costChangeContextObject]
    return contextObject

  onAfterCleanupAction: (actionEvent) ->
    super(actionEvent)

    action = actionEvent.action
    # check if action is a damage action targeting enemy General
    if action instanceof DamageAction
      target = action.getTarget()
      if target? and
          not target.getIsSameTeamAs(@getCard()) and
          target.getWasGeneral() and
          @willDealDamage(action)
        @onDamageDealtToGeneral(action)

  willDealDamage: (action) ->
    # total damage should be calculated during modify_action_for_execution phase
    return action.getTotalDamageAmount() > 0

  onDamageDealtToGeneral: (action) ->
    if !@getSubModifiers() || @getSubModifiers()?.length == 0 # if no sub modifiers currently attached to this card
      # apply mana modifier
      @applyManagedModifiersFromModifiersContextObjects(@modifiersContextObjects, @getCard())

module.exports = ModifierCostChangeIfEnemyGeneralDamagedThisTurn
