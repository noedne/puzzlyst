ModifierBlastAttack = require './modifierBlastAttack'

class ModifierBlastAttackStrong extends ModifierBlastAttack

  type:"ModifierBlastAttackStrong"
  @type:"ModifierBlastAttackStrong"

  cardFXResource: ["FX.Cards.Faction3.BlastStrong"]

  getStackType: () ->
    return ModifierBlastAttack.type

module.exports = ModifierBlastAttackStrong
