CONFIG = require 'app/common/config'
UtilsGameSession = require 'app/common/utils/utils_game_session'
ModifierOpeningGambit = require './modifierOpeningGambit'
PlayCardSilentlyAction = require 'app/sdk/actions/playCardSilentlyAction'
_ = require 'underscore'

class ModifierOpeningGambitLifeGive extends ModifierOpeningGambit

  type:"ModifierOpeningGambitLifeGive"
  @type:"ModifierOpeningGambitLifeGive"

  @modifierName:"Opening Gambit"
  @description: "Summon all friendly minions destroyed since your last turn on random spaces"

  fxResource: ["FX.Modifiers.ModifierOpeningGambit", "FX.Modifiers.ModifierGenericSpawn"]

  getPrivateDefaults: (gameSession) ->
    p = super(gameSession)

    p.deadUnits = null

    return p

  getDeadUnits: () ->
    if !@_private.deadUnits?
      @_private.deadUnits = @getGameSession().getDeadUnits(
        @getOwnerId(), # minion ownerId
        @getOwnerId(), # since last turn of ownerId
        false, # onlyCurrentTurn
        true, # includeTokens
      )
    return @_private.deadUnits

  onOpeningGambit: () ->
    super()

    if @getGameSession().getIsRunningAsAuthoritative()
      deadUnits = @getDeadUnits()
      if deadUnits.length > 0
        wholeBoardPattern = CONFIG.ALL_BOARD_POSITIONS
        # create one random spawn location per dead unit
        spawnLocations = []
        card = @getGameSession().getExistingCardFromIndexOrCachedCardFromData({id: @getCard().getId()})
        validSpawnLocations = UtilsGameSession.getSmartSpawnPositionsFromPattern(@getGameSession(), {x:0, y:0}, wholeBoardPattern, card)
        _.shuffle(deadUnits)
        for i in [0...deadUnits.length]
          if validSpawnLocations.length > 0
            spawnLocations.push(validSpawnLocations.splice(@getGameSession().getRandomIntegerForExecution(validSpawnLocations.length), 1)[0])

        for position, i in spawnLocations
          # respawn each dead unit as a fresh copy
          playCardAction = new PlayCardSilentlyAction(@getGameSession(), @getCard().getOwnerId(), position.x, position.y, {id: deadUnits[i].getId()})
          playCardAction.setSource(@getCard())
          @getGameSession().executeAction(playCardAction)

module.exports = ModifierOpeningGambitLifeGive
