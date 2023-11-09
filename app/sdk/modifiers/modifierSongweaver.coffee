CardType = require 'app/sdk/cards/cardType'
Modifier = require './modifier'
PlayCardFromHandAction = require 'app/sdk/actions/playCardFromHandAction'

class ModifierSongweaver extends Modifier

  type:"ModifierSongweaver"
  @type:"ModifierSongweaver"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  playedTypes: new Set()
  
  @createContextObject: (drawAmount = 0, options) ->
    contextObject = super(options)
    contextObject.drawAmount = drawAmount
    return contextObject

  onAction: (event) ->
    super(event)
    action = event.action
    unless action instanceof PlayCardFromHandAction and
        action.getOwnerId() is @getOwnerId()
      return
    
    @playedTypes.add(action.getCard().getType())
    unless @playedTypes.has(CardType.Unit) and
        @playedTypes.has(CardType.Spell) and
        @playedTypes.has(CardType.Artifact)
      return
  
    for [0...@drawAmount]
      @getGameSession().executeAction(@getOwner().getDeck().actionDrawCard())
    @playedTypes.clear()

  onEndTurn: () ->
    super()
    @playedTypes.clear()

module.exports = ModifierSongweaver
