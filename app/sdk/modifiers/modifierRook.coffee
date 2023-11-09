EVENTS = require 'app/common/event_types'
CardType = require 'app/sdk/cards/cardType'
DamageAction = require 'app/sdk/actions/damageAction'
Modifier = require './modifier'
PlayCardAction = require 'app/sdk/actions/playCardAction'

class ModifierRook extends Modifier

  type:"ModifierRook"
  @type:"ModifierRook"

  onEvent: (event) ->
    super(event)

    if @getIsListeningToEvents() and event.type is EVENTS.after_step
      action = event.step.action
      if action instanceof PlayCardAction and action.getCard() is @getCard()
        @charge(action)

  charge: (parentAction) ->
    board = @getGameSession().getBoard()
    card = @getCard()
    distance = @getMaxDistance(board, card)
    if distance is 0
      return

    for unit in board.getEntitiesInfrontOf(card, CardType.Unit, true)
      currentDistance = Math.abs(unit.getPositionX() - card.getPositionX()) - 1
      if currentDistance is 0
        return

      if currentDistance < distance
        target = unit
        distance = currentDistance

    moveAction = @doMove(card, distance, parentAction)
    if moveAction.getIsValid() and target?
      @doDamage(target, distance, moveAction, parentAction)
    
  doMove: (card, distance, parentAction) ->
    offset = if card.isOwnedByPlayer1() then distance else -distance
    moveAction = card.actionMove({
      x: card.getPositionX() + offset,
      y: card.getPositionY(),
    })
    moveAction.setParentAction(parentAction)
    @getGameSession().executeAction(moveAction)
    return moveAction

  doDamage: (target, damage, parentAction, resolveParentAction) ->
    damageAction = new DamageAction(@getGameSession())
    damageAction.setSource(@getCard())
    damageAction.setOwnerId(@getOwnerId())
    damageAction.setTarget(target)
    damageAction.setDamageAmount(damage)

    # index needed to set as parent
    parentAction.setIndex(@getGameSession().generateIndex())
    damageAction.setParentAction(parentAction)

    # needed for attack animation
    damageAction.setResolveParentAction(resolveParentAction)
    damageAction.setTriggeringModifier(@)

    @getGameSession().executeAction(damageAction)
    
  getMaxDistance: (board, card) ->
    if card.isOwnedByPlayer1()
      return board.getColumnCount() - 1 - card.getPositionX()
    return card.getPositionX()

module.exports = ModifierRook
