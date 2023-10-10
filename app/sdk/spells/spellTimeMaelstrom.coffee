Spell = require './spell'
TakeAnotherTurnAction = require 'app/sdk/actions/takeAnotherTurnAction'

class SpellTimeMaelstrom extends Spell

  onApplyOneEffectToBoard: (board, x, y, sourceAction) ->
    action = new TakeAnotherTurnAction(@getGameSession())
    action.setOwnerId(@getOwnerId())
    @getGameSession().executeAction(action)

module.exports = SpellTimeMaelstrom
