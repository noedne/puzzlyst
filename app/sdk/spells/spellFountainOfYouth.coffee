SpellAspectBase = require './spellAspectBase'

class SpellFountainOfYouth extends SpellAspectBase

  getCardDataOrIndexToSpawn: (x, y) ->
    @cardDataOrIndexToSpawn = {
      id: @getGameSession().getBoard().getUnitAtPosition({ x, y }).getId()
    }
    return super(x, y)

module.exports = SpellFountainOfYouth
