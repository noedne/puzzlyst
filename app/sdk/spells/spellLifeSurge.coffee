Logger = require 'app/common/logger'
SpellDamage = require './spellDamage'
CardType = require 'app/sdk/cards/cardType'
SpellFilterType = require './spellFilterType'
HealAction = require 'app/sdk/actions/healAction'
CONFIG = require 'app/common/config'
UtilsPosition = require 'app/common/utils/utils_position'

class SpellLifeSurge extends SpellDamage

  spellFilterType: SpellFilterType.NeutralDirect

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    entity = board.getCardAtPosition({x:x, y:y}, @targetType)

    # the unit to deal damage to (SpellDamage default effect)
    if !entity?.isGeneral or # minion
        !entity.getIsSameTeamAs(@) or # enemy General
        @getApplyEffectPositions().length is 1 # your General
      super(board,x,y,sourceAction)

    # your General, gets healed
    general = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    if entity is general
      healAction = new HealAction(@getGameSession())
      healAction.setOwnerId(@getOwnerId())
      healAction.setTarget(general)
      healAction.setHealAmount(@healAmount)
      @getGameSession().executeAction(healAction)

  _findApplyEffectPositions: (position, sourceAction) ->
    applyEffectPositions = super(position, sourceAction)

    # add your the General's position in as well
    general = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    generalPosition = general.getPosition()
    if !UtilsPosition.getIsPositionInPositions(applyEffectPositions, generalPosition)
      applyEffectPositions.push(generalPosition)

    return applyEffectPositions

module.exports = SpellLifeSurge
