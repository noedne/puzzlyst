Modifier = require './modifier'
ModifierOpeningGambit = require './modifierOpeningGambit'

class ModifierOpeningGambitGainHighestAttack extends ModifierOpeningGambit

  type:"ModifierOpeningGambitGainHighestAttack"
  @type:"ModifierOpeningGambitGainHighestAttack"

  @createContextObject: (appliedName, options) ->
    contextObject = super(options)
    contextObject.appliedName = appliedName
    return contextObject

  onOpeningGambit: () ->
    super()
    highestATK = 0
    for unit in @getGameSession().getBoard().getUnits(true)
      if unit.getIsSameTeamAs(@getCard())
        highestATK = Math.max(highestATK, unit.getATK())
    @applyManagedModifiersFromModifiersContextObjects(
      [
        Modifier.createContextObjectWithAttributeBuffs(
          highestATK,
          0,
          { appliedName: @appliedName },
        )
      ],
      @getCard(),
    )

module.exports = ModifierOpeningGambitGainHighestAttack
