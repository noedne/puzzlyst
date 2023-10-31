ModifierImmuneToAttacks =   require './modifierImmuneToAttacks'

class ModifierImmuneToAttacksIfFullHealth extends ModifierImmuneToAttacks

  type:"ModifierImmuneToAttacksIfFullHealth"
  @type:"ModifierImmuneToAttacksIfFullHealth"

  getIsActionRelevant: (a) ->
    return super(a) and @getCard().getHP() is @getCard().getMaxHP()

module.exports = ModifierImmuneToAttacksIfFullHealth
