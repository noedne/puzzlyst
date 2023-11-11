ModifierTakeDamageWatchSpawnEntity = require './modifierTakeDamageWatchSpawnEntity'

class ModifierTakeDamageWatchSpawnRandomToken extends ModifierTakeDamageWatchSpawnEntity

  type:"ModifierTakeDamageWatchSpawnRandomToken"
  @type:"ModifierTakeDamageWatchSpawnRandomToken"

  @description:"Whenever this minion takes damage, summon a random token minion nearby"

  getCardDataOrIndexToSpawn: () ->
    tokens = @getGameSession()
      .getCardCaches()
      .getIsPrismatic(false)
      .getIsGeneral(false)
      .getIsToken(true)
      .getCards();
    index = @getGameSession().getRandomIntegerForExecution(tokens.length)
    return tokens[index].createNewCardData()

module.exports = ModifierTakeDamageWatchSpawnRandomToken
