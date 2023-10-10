EVENTS = require 'app/common/event_types'
Modifier = require './modifier'
DamageAction = require 'app/sdk/actions/damageAction'
CardType = require 'app/sdk/cards/cardType'

class ModifierGeneralDealsDoubleDamage extends Modifier

  type:"ModifierGeneralDealsDoubleDamage"
  @type:"ModifierGeneralDealsDoubleDamage"

  @modifierName:"General deals double damage"
  @description:"Your General deals double damage"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  damageBonus: 2

  fxResource: ["FX.Modifiers.ModifierDoubleDamageToEnemyMinions"]

  onEvent: (event) ->
    super(event)

    if @_private.listeningToEvents
      if event.type == EVENTS.modify_action_for_entities_involved_in_attack
        @onModifyActionForEntitiesInvolvedInAttack(event)

  getIsActionRelevant: (a) ->
    source = a.getSource()
    return a instanceof DamageAction and
      source != null and
      source.getIsSameTeamAs(@getCard()) and
      CardType.getIsEntityCardType(source.getType()) and
      source.getIsGeneral()

  _modifyAction: (a) ->
    a.setChangedByModifier(@)
    a.changeDamageMultiplierBy(@damageBonus)

  onModifyActionForExecution: (actionEvent) ->
    super(actionEvent)
    a = actionEvent.action
    if @getIsActionRelevant(a)
      @_modifyAction(a)

  onModifyActionForEntitiesInvolvedInAttack: (actionEvent) ->
    a = actionEvent.action
    if @getIsActive() and @getIsActionRelevant(a)
      @_modifyAction(a)

module.exports = ModifierGeneralDealsDoubleDamage
