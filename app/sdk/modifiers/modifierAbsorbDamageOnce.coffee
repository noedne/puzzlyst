ModifierAbsorbDamage = require './modifierAbsorbDamage'
i18next = require 'i18next'

class ModifierAbsorbDamageOnce extends ModifierAbsorbDamage

  type:"ModifierAbsorbDamageOnce"
  @type:"ModifierAbsorbDamageOnce"

  @modifierName:i18next.t("modifiers.absorb_damage_once_name")
  @description:i18next.t("modifiers.absorb_damage_once_def")

  canAbsorb: true # can absorb damage from 1 damage action per turn

  @getDescription: (modifierContextObject) ->
    if modifierContextObject
      return i18next.t("modifiers.absorb_damage_once_def", {
        amount: modifierContextObject.damageAbsorbAmount
      })
    else
      return @description

  onStartTurn: (actionEvent) ->
    super(actionEvent)
    @canAbsorb = true

  getIsActionRelevant: (a) ->
    return @canAbsorb and super(a)

  onModifyActionForExecution: (actionEvent) ->
    a = actionEvent.action
    if @getIsActionRelevant(a)
      @_modifyAction(a)
      @canAbsorb = false

module.exports = ModifierAbsorbDamageOnce
