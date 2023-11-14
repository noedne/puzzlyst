SpellApplyModifiers = require './spellApplyModifiers'
DamageAction = require 'app/sdk/actions/damageAction'
_ = require 'underscore'

class SpellDamageAndApplyModifiers extends SpellApplyModifiers

  applyToAllies: false
  applyToEnemy: false
  applyToGeneral: true

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    applyEffectPosition = {x: x, y: y}
    unit = board.getUnitAtPosition(applyEffectPosition)
    unless unit?
      return

    isGeneral = unit.getIsGeneral()
    if isGeneral and not @canTargetGeneral
      return

    # deal damage
    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@getOwnerId())
    damageAction.setTarget(unit)
    damageAction.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(damageAction)

    if isGeneral and not @applyToGeneral
      return

    # apply modifiers
    if unit.getOwnerId() is @getOwnerId() and @applyToAllies
      super(board,x,y,sourceAction)
    if unit.getOwnerId() isnt @getOwnerId() and @applyToEnemy
      super(board,x,y,sourceAction)

module.exports = SpellDamageAndApplyModifiers
