Modifier =   require './modifier'
HealAction = require 'app/sdk/actions/healAction'

class ModifierPreventAnyHeal extends Modifier

  type:"ModifierPreventAnyHeal"
  @type:"ModifierPreventAnyHeal"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  onModifyActionForExecution: (e) ->
    super(e)

    action = e.action
    if action instanceof HealAction
      action.setChangedByModifier(@)
      action.setHealMultiplier(0)

module.exports = ModifierPreventAnyHeal
