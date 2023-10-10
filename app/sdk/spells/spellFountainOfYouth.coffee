SpellAspectBase = require './spellAspectBase'

class SpellFountainOfYouth extends SpellAspectBase

  getCardDataOrIndexToSpawn: (x, y) ->
    @cardDataOrIndexToSpawn =
      @getGameSession()
        .getBoard()
        .getUnitAtPosition({ x, y })
        .createNewCardData()
    return super(x, y)

module.exports = SpellFountainOfYouth
