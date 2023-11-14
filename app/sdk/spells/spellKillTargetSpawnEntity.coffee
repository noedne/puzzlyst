Logger = require 'app/common/logger'
SpellKillTarget = require('./spellKillTarget')
PlayCardSilentlyAction = require 'app/sdk/actions/playCardSilentlyAction'

class SpellKillTargetSpawnEntity extends SpellKillTarget

  cardDataOrIndexToSpawn: null
  spawnForOwner: false

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    target = board.getCardAtPosition({ x, y }, @targetType)
    ownerId = if @spawnForOwner then target.getOwnerId() else @getOwnerId()
    super(board,x,y,sourceAction)
    if @cardDataOrIndexToSpawn
      spawnEntityAction = new PlayCardSilentlyAction(
        @getGameSession(),
        ownerId,
        x,
        y,
        @cardDataOrIndexToSpawn,
      )
      @getGameSession().executeAction(spawnEntityAction)

module.exports = SpellKillTargetSpawnEntity
