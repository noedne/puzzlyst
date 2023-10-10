CONFIG = require 'app/common/config'
SpellFilterType = require './spellFilterType'
SpellKillTarget = require './spellKillTarget'

class SpellEntropicDecay extends SpellKillTarget

  radius: CONFIG.WHOLE_BOARD_RADIUS
  spellFilterType: SpellFilterType.NeutralIndirect

  _postFilterApplyPositions: (validPositions) ->
    y = @getGameSession().getGeneralForPlayerId(@getOwnerId()).getPositionY()
    return validPositions.filter (position) -> position.y is y

module.exports = SpellEntropicDecay