ModifierImmuneToDamageFromMinionsAndGenerals = require './modifierImmuneToDamageFromMinionsAndGenerals'

class ModifierImmuneToDamageFromHighAttackUnits extends ModifierImmuneToDamageFromMinionsAndGenerals

  type:"ModifierImmuneToDamageFromHighAttackUnits"
  @type:"ModifierImmuneToDamageFromHighAttackUnits"

  @createContextObject: (minATK = 0, options) ->
    contextObject = super(options)
    contextObject.minATK = minATK
    return contextObject

  getIsActionRelevant: (a) ->
    return super(a) and a.getSource().getRootCard().getATK() >= @minATK

module.exports = ModifierImmuneToDamageFromHighAttackUnits
