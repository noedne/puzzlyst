ModifierOpeningGambit =   require './modifierOpeningGambit'

class ModifierOpeningGambitPlaySpellAsFollowup extends ModifierOpeningGambit

  type:"ModifierOpeningGambitPlaySpellAsFollowup"
  @type:"ModifierOpeningGambitPlaySpellAsFollowup"

  @createContextObject: (cardDataOrIndexToCast, options) ->
    contextObject = super(options)
    contextObject.cardDataOrIndexToCast = cardDataOrIndexToCast
    return contextObject

  onOpeningGambit: () ->
    @getGameSession().executeAction(
      @getCard().actionPlaySpellAsFollowup(
        @cardDataOrIndexToCast,
        @getPosition(),
      )
    )

  getPosition: () ->
    return @getCard().getPosition()

module.exports = ModifierOpeningGambitPlaySpellAsFollowup

