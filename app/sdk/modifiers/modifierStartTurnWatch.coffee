Modifier = require './modifier'

class ModifierStartTurnWatch extends Modifier

  type:"ModifierStartTurnWatch"
  @type:"ModifierStartTurnWatch"

  @modifierName:"Start Turn Watch"
  @description: "Start Turn Watch"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  activatesOnOwnersTurn: true
  activatesOnOpponentsTurn: false

  fxResource: ["FX.Modifiers.ModifierStartTurnWatch"]

  onStartTurn: (e) ->
    super(e)

    activatesOnThisTurn =
      if @getCard().isOwnersTurn()
      then @activatesOnOwnersTurn
      else @activatesOnOpponentsTurn

    if activatesOnThisTurn
      action = @getGameSession().getExecutingAction()
      @onTurnWatch(action)

  onTurnWatch: (action) ->
    # override me in sub classes to implement special behavior

module.exports = ModifierStartTurnWatch
