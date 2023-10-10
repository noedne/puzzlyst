Modifier = require('./modifier')
PutCardInDeckAction = require 'app/sdk/actions/putCardInDeckAction'

class ModifierOnRemoveShuffleCopyIntoDeck extends Modifier

  type: "ModifierOnRemoveShuffleCopyIntoDeck"
  @type: "ModifierOnRemoveShuffleCopyIntoDeck"

  onRemoveFromCard: () ->
    @getGameSession().executeAction(new PutCardInDeckAction(
      @getGameSession(),
      @getOwnerId(),
      @getSourceCard().createNewCardData(),
    ))
    super()

module.exports = ModifierOnRemoveShuffleCopyIntoDeck