Modifier = require './modifier'
ModifierSummonWatch = require './modifierSummonWatch'
CardType = require 'app/sdk/cards/cardType'
UtilsGameSession = require 'app/common/utils/utils_game_session'
ModifierFrenzy = require './modifierFrenzy'
ModifierFlying = require './modifierFlying'
ModifierTranscendance = require './modifierTranscendance'
ModifierProvoke = require './modifierProvoke'
ModifierRanged = require './modifierRanged'

class ModifierSpiritScribe extends ModifierSummonWatch

  type:"ModifierSpiritScribe"
  @type:"ModifierSpiritScribe"

  @description: "Whenever you summon a minion, this minion gains a new random keyword ability"

  @createContextObject: () ->
    contextObject = super()
    contextObject.allModifierContextObjects = [
      ModifierFrenzy.createContextObject(),
      ModifierFlying.createContextObject(),
      ModifierTranscendance.createContextObject(),
      ModifierProvoke.createContextObject(),
      ModifierRanged.createContextObject()
    ]
    return contextObject

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  onSummonWatch: (action) ->
    super(action)

    missingModifierContextObjects = @getMissingModifierContextObjects()
    numMissing = missingModifierContextObjects.length
    if @getGameSession().getIsRunningAsAuthoritative() and numMissing > 0
      randomIndex = @getGameSession().getRandomIntegerForExecution(numMissing)
      modifierContextObject = missingModifierContextObjects[randomIndex]
      indexInAll = @allModifierContextObjects.indexOf(modifierContextObject)
      @allModifierContextObjects.splice(indexInAll, 1)
      @getGameSession().applyModifierContextObject(modifierContextObject, @getCard())

  getMissingModifierContextObjects: () ->
    @allModifierContextObjects.filter (modifierContextObject) =>
      !@getCard().hasModifierType(modifierContextObject.type)

module.exports = ModifierSpiritScribe
