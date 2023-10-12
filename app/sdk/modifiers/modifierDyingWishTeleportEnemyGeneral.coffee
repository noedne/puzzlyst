ModifierDyingWish = require './modifierDyingWish'
TeleportAction = require 'app/sdk/actions/teleportAction'

class ModifierDyingWishTeleportEnemyGeneral extends ModifierDyingWish

  type:"ModifierDyingWishTeleportEnemyGeneral"
  @type:"ModifierDyingWishTeleportEnemyGeneral"

  @description: "Teleport the enemy General to this space."

  fxResource: ["FX.Modifiers.ModifierDyingWish"]

  onDyingWish: () ->
    general = @getGameSession().getGeneralForOpponentOfPlayerId(@getOwnerId())
    teleportAction = new TeleportAction(@getGameSession())
    teleportAction.setOwnerId(@getOwnerId())
    teleportAction.setSource(general)
    teleportAction.setTargetPosition(@getCard().getPosition())
    @getGameSession().executeAction(teleportAction)

module.exports = ModifierDyingWishTeleportEnemyGeneral
