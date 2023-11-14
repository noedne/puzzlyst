CONFIG = require 'app/common/config'
UtilsJavascript = require 'app/common/utils/utils_javascript'
ModifierEndTurnWatchSpawnEntity = require './modifierEndTurnWatchSpawnEntity'
Cards = require 'app/sdk/cards/cardsLookupComplete'
ModifierEgg = require 'app/sdk/modifiers/modifierEgg'
_ = require("underscore")

class ModifierEndTurnWatchSpawnEgg extends ModifierEndTurnWatchSpawnEntity

  type:"ModifierEndTurnWatchSpawnEgg"
  @type:"ModifierEndTurnWatchSpawnEgg"

  @modifierName:"ModifierEndTurnWatchSpawnEgg"
  @description: "At the end of your turn, summon %X nearby"

  fxResource: ["FX.Modifiers.ModifierStartTurnWatch", "FX.Modifiers.ModifierGenericSpawn"]

  @createContextObject: (spawnPattern, eggDescription, options) ->
    contextObject = super(
      {id: Cards.Faction5.Egg},
      spawnDescription = "",
      spawnCount=1,
      spawnPattern,
      spawnSilently=true,
      options,
    )
    contextObject.eggDescription = eggDescription
    return contextObject

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return @description.replace /%X/, modifierContextObject.eggDescription
    else
      return @description

  getCardDataOrIndexToSpawn: () ->
    cardDataOrIndexToSpawn = super()
    if cardDataOrIndexToSpawn?
      # add modifiers to data
      if _.isObject(cardDataOrIndexToSpawn)
        cardDataOrIndexToSpawn = UtilsJavascript.fastExtend({}, cardDataOrIndexToSpawn)
      else
        cardDataOrIndexToSpawn = @getGameSession().getCardByIndex(cardDataOrIndexToSpawn).createNewCardData()

      cardDataOrIndexToSpawn.additionalInherentModifiersContextObjects ?= []
      cardDataOrIndexToSpawn.additionalInherentModifiersContextObjects.push(ModifierEgg.createContextObject(@getCard().createNewCardData(), @getCard().getName()))
    return cardDataOrIndexToSpawn

module.exports = ModifierEndTurnWatchSpawnEgg
