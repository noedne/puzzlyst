Cards = require 'app/sdk/cards/cardsLookupComplete'
CONFIG = require 'app/common/config'
ModifierDyingWish = require './modifierDyingWish'
PlayerModifierMechazorBuildProgress = require 'app/sdk/playerModifiers/playerModifierMechazorBuildProgress'
PlayerModifierMechazorSummoned = require 'app/sdk/playerModifiers/playerModifierMechazorSummoned'
PutCardInHandAction = require 'app/sdk/actions/putCardInHandAction'

class ModifierDyingWishApplyMechazorPlayerModifiers extends ModifierDyingWish

  type:"ModifierDyingWishApplyMechazorPlayerModifiers"
  @type:"ModifierDyingWishApplyMechazorPlayerModifiers"
  
  onDyingWish: () ->
    super()
    general = @getGameSession().getGeneralForPlayerId(@getOwnerId())
    @getGameSession().applyModifierContextObject(
      PlayerModifierMechazorBuildProgress.createContextObject(),
      general,
    )
    owner = @getOwner()
    numCanAdd = PlayerModifierMechazorBuildProgress.getNumberCompleted(owner)
    handSpace = CONFIG.MAX_HAND_SIZE - owner.getDeck().getNumCardsInHand()
    for [0...Math.min(numCanAdd, handSpace)]
      @getGameSession().executeAction(
        new PutCardInHandAction(
          @getGameSession(),
          @getOwnerId(),
          { id: Cards.Neutral.Mechaz0r },
        )
      )
      @getGameSession().applyModifierContextObject(
        PlayerModifierMechazorSummoned.createContextObject(),
        general,
      )
    return

module.exports = ModifierDyingWishApplyMechazorPlayerModifiers
