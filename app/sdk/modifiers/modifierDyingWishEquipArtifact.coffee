ModifierDyingWish = require './modifierDyingWish'
PlayCardSilentlyAction = require 'app/sdk/actions/playCardSilentlyAction'

class ModifierDyingWishEquipArtifact extends ModifierDyingWish

  type: "ModifierDyingWishEquipArtifact"
  @type: "ModifierDyingWishEquipArtifact"

  cardDataOrIndexToEquip: null

  @createContextObject: (cardDataOrIndexToEquip, options) ->
    contextObject = super(options)
    contextObject.cardDataOrIndexToEquip = cardDataOrIndexToEquip
    return contextObject

  onDyingWish: (action) ->
    position = @getCard().getPosition()
    action = new PlayCardSilentlyAction(
      @getGameSession(),
      @getCard().getOwnerId(),
      position.x,
      position.y,
      @cardDataOrIndexToEquip,
    )
    action.setSource(@getCard())
    @getGameSession().executeAction(action)

module.exports = ModifierDyingWishEquipArtifact
