ModifierDealDamageWatchSpawnEntity = require 'app/sdk/modifiers/modifierDealDamageWatchSpawnEntity'

class ModifierDealDamageWatchSpawnEntityOnTarget extends ModifierDealDamageWatchSpawnEntity

  type:"ModifierDealDamageWatchSpawnEntityOnTarget"
  @type:"ModifierDealDamageWatchSpawnEntityOnTarget"

  @createContextObject: (cardDataOrIndexToSpawn, spawnSilently = true, options) ->
    return super(cardDataOrIndexToSpawn, undefined, 1, undefined, spawnSilently, options)

  getSpawnPositions: (action) ->
    return [action.getTarget().getPosition()]

module.exports = ModifierDealDamageWatchSpawnEntityOnTarget
