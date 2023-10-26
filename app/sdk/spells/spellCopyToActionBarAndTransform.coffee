Cards = require 'app/sdk/cards/cardsLookupComplete'
SpellAspectBase = require './spellAspectBase'

class SpellCopyToActionBarAndTransform extends SpellAspectBase

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    @getGameSession().executeAction(
      board.getUnitAtPosition({ x, y }).actionCopyToActionBar()
    )
    super(board,x,y,sourceAction) # transform target

module.exports = SpellCopyToActionBarAndTransform
