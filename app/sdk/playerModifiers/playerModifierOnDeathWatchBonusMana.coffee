BonusManaAction = require 'app/sdk/actions/bonusManaAction'
CardType = require 'app/sdk/cards/cardType'
DieAction = require 'app/sdk/actions/dieAction'
PlayerModifier = require './playerModifier'

class PlayerModifierOnDeathWatchBonusMana extends PlayerModifier

  type:"PlayerModifierOnDeathWatchBonusMana"
  @type:"PlayerModifierOnDeathWatchBonusMana"

  bonusMana: 1
  bonusDuration: 1

  onAfterCleanupAction: (e) ->
    super(e)
    action = e.action
    if @getIsActionRelevant(action)
      @onDeathWatch(action)

  onDeathWatch: (action) ->
    action = @getGameSession().createActionForType(BonusManaAction.type)
    action.setSource(@getSourceCard())
    action.setTarget(@getCard())
    action.bonusMana = @bonusMana
    action.bonusDuration = @bonusDuration
    @getGameSession().executeAction(action)

  getIsActionRelevant: (action) ->
    return action instanceof DieAction and
      action.getTarget()? and
      action.getTarget().getType() is CardType.Unit and
      action.getTarget() != @getCard()

module.exports = PlayerModifierOnDeathWatchBonusMana

