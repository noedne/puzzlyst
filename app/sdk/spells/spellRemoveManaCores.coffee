RemoveManaCoreAction = require 'app/sdk/actions/removeManaCoreAction'
Spell = require './spell'

class SpellRemoveManaCores extends Spell

  amountToRemove: 1

  onApplyOneEffectToBoard: (board, x, y, sourceAction) ->
    super(board, x, y, sourceAction)
    @getGameSession().getPlayers().forEach (player) =>
      removeManaCoreAction = new RemoveManaCoreAction(@getGameSession())
      removeManaCoreAction.setOwnerId(player.getPlayerId())
      removeManaCoreAction.setSource(@)
      removeManaCoreAction.setManaAmount(@amountToRemove)
      @getGameSession().executeAction(removeManaCoreAction)

module.exports = SpellRemoveManaCores
