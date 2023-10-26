Modifier = require './modifier'
DamageAction = require 'app/sdk/actions/damageAction'
CardType = require 'app/sdk/cards/cardType'
ModifierStunnedVanar = require './modifierStunnedVanar'

class ModifierStunWhenDamaged extends Modifier

  type:"ModifierStunWhenDamaged"
  @type:"ModifierStunWhenDamaged"

  @modifierName:"Stunner"
  @description:"Minions next to this minion that damage it are Stunned"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  maxStacks: 1

  onAction: (actionEvent) ->
    super(actionEvent)
    a = actionEvent.action
    # when this wall is damaged
    if a instanceof DamageAction and a.getTarget() == @getCard()
      # by a nearby minion
      source = a.getSource().getRootCard()
      if source.getType() is CardType.Unit and
          !source.getIsGeneral() and
          source in @getCard().getGameSession().getBoard().getEntitiesAroundEntity(@getCard(), CardType.Unit, 1)
        # stun the damager
        @getGameSession().applyModifierContextObject(ModifierStunnedVanar.createContextObject(), source)

module.exports = ModifierStunWhenDamaged
