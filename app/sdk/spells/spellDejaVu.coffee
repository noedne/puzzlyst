Spell = require './spell'
CardType = require 'app/sdk/cards/cardType'
PutCardInDeckAction = require 'app/sdk/actions/putCardInDeckAction'
Cards = require 'app/sdk/cards/cardsLookupComplete'

class SpellDejaVu extends Spell

  onApplyOneEffectToBoard: (board,x,y,sourceAction) ->
    ownerId = @getOwnerId()
    spellsPlayedToBoard = @getGameSession().getSpellsPlayed(ownerId)
    if spellsPlayedToBoard.length > 0
      for spell in spellsPlayedToBoard by -1
        if !spell.getIsFollowup() and !(spell is this)
          spellToCopy = spell
          break

      if spellToCopy?
        # put fresh copy of spell into deck
        a = new PutCardInDeckAction(@getGameSession(), ownerId, spellToCopy.createNewCardData())
        @getGameSession().executeAction(a)

module.exports = SpellDejaVu
