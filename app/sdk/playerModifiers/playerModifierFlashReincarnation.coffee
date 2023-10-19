PlayerModifierManaModifier = require 'app/sdk/playerModifiers/playerModifierManaModifier'
PlayCardFromHandAction = require 'app/sdk/actions/playCardFromHandAction'
PlaySignatureCardAction = require 'app/sdk/actions/playSignatureCardAction'
DamageAction = require 'app/sdk/actions/damageAction'
CardType = require 'app/sdk/cards/cardType'

class PlayerModifierFlashReincarnation extends PlayerModifierManaModifier

  type:"PlayerModifierFlashReincarnation"
  @type:"PlayerModifierFlashReincarnation"

  damageAmount: 2

  onAction: (event) ->
    super(event)

    # when a card is played from hand AFTER this modifier is applied
    action = event.action
    if (action.getIndex() > @getAppliedByActionIndex()) and ((action instanceof PlayCardFromHandAction and @auraIncludeHand) or (action instanceof PlaySignatureCardAction and @auraIncludeSignatureCards)) and action.getOwnerId() == @getPlayerId()
      card = action.getCard()
      if card?
        if action instanceof PlayCardFromHandAction
          if action.getOwnerId() is @getPlayerId() and action.getCard()?.type is CardType.Unit
            # damage the unit IF a unit was played
            unitToDamage = action.getTarget()
            if unitToDamage?
              damageAction = new DamageAction(@getGameSession())
              damageAction.setOwnerId(@getCard().getOwnerId())
              appliedByAction = @getAppliedByAction()
              if appliedByAction?
                damageAction.setSource(appliedByAction.getRootAction().getCard?().getRootCard())
              else
                damageAction.setSource(@getCard())
              damageAction.setTarget(unitToDamage)
              damageAction.setDamageAmount(@damageAmount)
              @getGameSession().executeAction(damageAction)
              @getGameSession().removeModifier(@)

module.exports = PlayerModifierFlashReincarnation
