Modifier = require './modifier'
ModifierManaCostChange = require './modifierManaCostChange'

class ModifierKeeper extends Modifier

  type:"ModifierKeeper"
  @type:"ModifierKeeper"

  @isHiddenToUI: true
  isRemovable: false

  @createContextObject: (atk = 1, maxHP = 1, costChange = 1, options) ->
    contextObject = super(options)
    contextObject.atk = atk
    contextObject.maxHP = maxHP
    contextObject.costChange = costChange
    return contextObject

  onApplyToCardBeforeSyncState: () ->
    super()

    statContextObject =
      Modifier.createContextObjectWithAbsoluteAttributeBuffs(@atk, @maxHP)

    costChangeContextObject =
      ModifierManaCostChange.createContextObject(@costChange)
    costChangeContextObject.attributeBuffsAbsolute = ['manaCost']

    @applyManagedModifiersFromModifiersContextObjects(
      [statContextObject, costChangeContextObject],
      @getCard(),
    )

module.exports = ModifierKeeper
