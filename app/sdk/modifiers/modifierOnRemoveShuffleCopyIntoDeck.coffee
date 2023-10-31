Modifier = require('./modifier')
PutCardInDeckAction = require 'app/sdk/actions/putCardInDeckAction'

class ModifierOnRemoveShuffleCopyIntoDeck extends Modifier

  type: "ModifierOnRemoveShuffleCopyIntoDeck"
  @type: "ModifierOnRemoveShuffleCopyIntoDeck"

  onRemoveFromCard: () ->
    cardDataOrIndex = @getSourceCard().createNewCardData()
    action = @getOwner().getDeck().actionPutCardInDeck(cardDataOrIndex)
    @getGameSession().executeAction(action)
    super()

module.exports = ModifierOnRemoveShuffleCopyIntoDeck