DamageAction = require 'app/sdk/actions/damageAction'
EVENTS = require 'app/common/event_types'
Modifier = require './modifier'
TrueDamageAction = require 'app/sdk/actions/trueDamageAction'

class ModifierRedirectDamageFromAllyDirectlyInFront extends Modifier

  type:"ModifierRedirectDamageFromAllyDirectlyInFront"
  @type:"ModifierRedirectDamageFromAllyDirectlyInFront"

  @modifierName:"We Stand Together"
  @description:"Redirect damage from the ally directly in front of this."

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  onEvent: (event) ->
    super(event)
    if @_private.listeningToEvents
      if event.type == EVENTS.modify_action_for_entities_involved_in_attack
        @onModifyActionForEntitiesInvolvedInAttack(event)
      if event.type == EVENTS.entities_involved_in_attack
        @onEntitiesInvolvedInAttack(event)
  
  onModifyActionForEntitiesInvolvedInAttack: (event) ->
    action = event.action
    if @getIsActive() and @getIsActionRelevant(action)
      @_modifyAction(action)
  
  onEntitiesInvolvedInAttack: (event) ->
    action = event.action
    if @getIsActive() and @getIsActionRelevant(action)
      event.actions.push(@getRedirectAction(action))

  onModifyActionForExecution: (event) ->
    super(event)
    action = event.action
    if @getIsActionRelevant(action)
      @_modifyAction(action)

  onBeforeAction: (event) ->
    super(event)
    action = event.action
    if @getIsActionRelevant(action)
      @getGameSession().executeAction(@getRedirectAction(action))
  
  getIsActionRelevant: (action) ->
    target = action.getTarget()
    xOffset = if @getCard().isOwnedByPlayer1() then 1 else -1
    return @getCard()? and
      action instanceof DamageAction and
      not (action instanceof TrueDamageAction) and
      target? and
      action.getTotalDamageAmountBeforeRedirection() > 0 and
      target.getIsSameTeamAs(@getCard()) and
      target.getPositionX() is @getCard().getPositionX() + xOffset and
      target.getPositionY() is @getCard().getPositionY()
  
  _modifyAction: (action) ->
    action.setChangedByModifier(@)
    action.setIsRedirected(true)
  
  getRedirectAction: (oldAction) ->
    action = new DamageAction(@getGameSession())
    action.setSource(oldAction.getSource())
    action.setOwnerId(oldAction.getOwnerId())
    action.setTarget(@getCard())
    action.setDamageAmount(oldAction.getTotalDamageAmountBeforeRedirection())
    action.setTriggeringModifier(@)
    return action

module.exports = ModifierRedirectDamageFromAllyDirectlyInFront
