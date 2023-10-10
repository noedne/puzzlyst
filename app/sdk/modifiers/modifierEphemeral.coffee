ModifierEndTurnWatch = require './modifierEndTurnWatch'
RemoveAction =  require 'app/sdk/actions/removeAction'
i18next = require('i18next')

class ModifierEphemeral extends ModifierEndTurnWatch

  type:"ModifierEphemeral"
  @type:"ModifierEphemeral"

  @isHiddenToUI: true
  @description:null

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  maxStacks: 1

  fxResource: ["FX.Modifiers.ModifierEphemeral"]

  onTurnWatch: ()  ->
    # remove entity from the board (just remove, don't die)
    removeAction = @getGameSession().createActionForType(RemoveAction.type)
    removeAction.setSource(@getCard())
    removeAction.setTarget(@getCard())
    @getGameSession().executeAction(removeAction)

module.exports = ModifierEphemeral
