ModifierOpeningGambitPutCardInHand = require './modifierOpeningGambitPutCardInHand'

class ModifierOpeningGambitPutRandomCardInHand extends ModifierOpeningGambitPutCardInHand

  type:"ModifierOpeningGambitPutRandomCardInHand"
  @type:"ModifierOpeningGambitPutRandomCardInHand"

  getCardDataOrIndexToPutInHand: () ->
    cards = @getGameSession()
      .getCardCaches()
      .getIsPrismatic(false)
      .getIsGeneral(false)
      .getIsHiddenInCollection(false)
      .getCards()
    card = cards[@getGameSession().getRandomIntegerForExecution(cards.length)]
    return card.createNewCardData()

module.exports = ModifierOpeningGambitPutRandomCardInHand
