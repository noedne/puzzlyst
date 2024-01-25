ModifierOpeningGambit =   require './modifierOpeningGambit'
CardType = require 'app/sdk/cards/cardType'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class ModifierOpeningGambitRetrieveRandomSpell extends ModifierOpeningGambit

  type:"ModifierOpeningGambitRetrieveRandomSpell"
  @type:"ModifierOpeningGambitRetrieveRandomSpell"

  @modifierName:"Opening Gambit"
  @description:"Put a copy of a random spell you cast this game into your action bar"

  onOpeningGambit: () ->
    super()

    if @getGameSession().getIsRunningAsAuthoritative()
      ownerId = @getOwnerId()
      spellsPlayedToBoard = @getGameSession().getSpellsPlayed(ownerId)
      if spellsPlayedToBoard.length > 0
        spellsPlayedByOwner = []
        for spell in spellsPlayedToBoard
          if !spell.getIsFollowup()
            spellsPlayedByOwner.push(spell)

        if spellsPlayedByOwner.length > 0
          spellToCopy = spellsPlayedByOwner[@getGameSession().getRandomIntegerForExecution(spellsPlayedByOwner.length)]
          if spellToCopy?
            # put fresh copy of spell into hand
            a = new PutCardInHandAction(@getGameSession(), ownerId, spellToCopy.createNewCardData())
            @getGameSession().executeAction(a)

module.exports = ModifierOpeningGambitRetrieveRandomSpell
