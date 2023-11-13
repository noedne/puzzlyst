Logger = require 'app/common/logger'
SpellDamage = require('./spellDamage')
SpellFilterType = require './spellFilterType'
PlayerModifierCardDrawModifier = require 'app/sdk/playerModifiers/playerModifierCardDrawModifier'

class SpellTwinStrike extends SpellDamage

  onApplyOneEffectToBoard: (board,x,y,sourceAction) ->
    super(board, x, y, sourceAction)

    ownerId = @getOwnerId()
    general = @getGameSession().getGeneralForPlayerId(ownerId)
    @getGameSession().applyModifierContextObject(PlayerModifierCardDrawModifier.createContextObject(1,1), general)

  _findApplyEffectPositions: (position, sourceAction) ->
    # pick 2 targets from all potential targets
    potentialPositions = super(position, sourceAction)
    if potentialPositions.length < 2
      return

    applyEffectPositions = []
    for i in [0..1]
      if potentialPositions.length > 0
        index = @getGameSession().getRandomIntegerForExecution(potentialPositions.length)
        applyEffectPositions.push(potentialPositions.splice(index, 1)[0])

    return applyEffectPositions

module.exports = SpellTwinStrike
