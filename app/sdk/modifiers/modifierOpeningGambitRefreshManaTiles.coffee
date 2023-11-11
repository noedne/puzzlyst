Cards = require 'app/sdk/cards/cardsLookupComplete'
ModifierCollectableBonusMana = require 'app/sdk/modifiers/modifierCollectableBonusMana'
ModifierOpeningGambit = require './modifierOpeningGambit'

class ModifierOpeningGambitRefreshManaTiles extends ModifierOpeningGambit

  type:"ModifierOpeningGambitRefreshManaTiles"
  @type:"ModifierOpeningGambitRefreshManaTiles"

  fxResource: ["FX.Modifiers.ModifierOpeningGambit"]

  onOpeningGambit: () ->
    super()
    for tile in @getGameSession().getBoard().getTiles(true)
      if tile.getBaseCardId() is Cards.Tile.BonusMana and tile.getDepleted()
        @getGameSession().applyModifierContextObject(
          ModifierCollectableBonusMana.createContextObject(),
          tile,
        )
        tile.setDepleted(false)

module.exports = ModifierOpeningGambitRefreshManaTiles
