ModifierStartTurnWatch = require './modifierStartTurnWatch'
RemoveAction = require 'app/sdk/actions/removeAction'

class ModifierStartOpponentsTurnWatchRemoveEntity extends ModifierStartTurnWatch

  type:"ModifierStartOpponentsTurnWatchRemoveEntity"
  @type:"ModifierStartOpponentsTurnWatchRemoveEntity"

  activatesOnOwnersTurn: false
  activatesOnOpponentsTurn: true

  onTurnWatch: (action) ->
    if @getCard()?.getIsActive()
      removeEntityAction = new RemoveAction(@getGameSession())
      removeEntityAction.setOwnerId(@getCard().getOwnerId())
      removeEntityAction.setTarget(@getCard())
      removeEntityAction.setIsDepthFirst(true)
      @getGameSession().executeAction(removeEntityAction)

module.exports = ModifierStartOpponentsTurnWatchRemoveEntity
