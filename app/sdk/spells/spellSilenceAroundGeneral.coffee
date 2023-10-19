CardType = require 'app/sdk/cards/cardType'
SpellFilterType =       require './spellFilterType'
SpellSilence = require 'app/sdk/spells/spellSilence'

class SpellSilenceAroundGeneral extends SpellSilence

  spellFilterType: SpellFilterType.None

  _postFilterApplyPositions: () ->
    board = @getGameSession().getBoard()
    myGeneral = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    filteredPositions = []
    for unit in board.getEntitiesAroundEntity(myGeneral, CardType.Entity, 1, true)
      filteredPositions.push(unit.getPosition())

    return filteredPositions

module.exports = SpellSilenceAroundGeneral
