ModifierGrow = require 'app/sdk/modifiers/modifierGrow'
SpellApplyModifiers = require './spellApplyModifiers'

class SpellApplyModifiersAndActivateAlliedGrow extends SpellApplyModifiers

  onApplyOneEffectToBoard: (board) ->
    board.getUnits().filter (unit) => @getIsSameTeamAs(unit)
      .flatMap (unit) => unit.getActiveModifiersByClass(ModifierGrow)
        .forEach (modifier) => modifier.activateGrow()
    return

module.exports = SpellApplyModifiersAndActivateAlliedGrow
