ModifierStartTurnWatch = require './modifierStartTurnWatch'
SwapUnitsAction = require 'app/sdk/actions/swapUnitsAction'
_ = require 'underscore'

class ModifierStartTurnWatchSwapGeneralPositions extends ModifierStartTurnWatch

  activatesOnOpponentsTurn: true

  onTurnWatch: () ->
    super()
    myGeneral = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    opponentGeneral =
      @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    swapAction = new SwapUnitsAction(@getGameSession())
    swapAction.setOwnerId(@getOwnerId())
    swapAction.setSource(myGeneral)
    swapAction.setTarget(opponentGeneral)
    swapAction.setFXResource(
      _.union(swapAction.getFXResource(), @getFXResource())
    )
    @getGameSession().executeAction(swapAction)

module.exports = ModifierStartTurnWatchSwapGeneralPositions
