ModifierMyAttackWatch = require './modifierMyAttackWatch'
CardType = require 'app/sdk/cards/cardType'
DamageAction = require 'app/sdk/actions/damageAction'

class ModifierMyAttackWatchAreaDamage extends ModifierMyAttackWatch

  type:"ModifierMyAttackWatchAreaDamage"
  @type:"ModifierMyAttackWatchAreaDamage"

  @createContextObject: (damageAmount=0,options) ->
    contextObject = super(options)
    contextObject.damageAmount = damageAmount
    return contextObject

  onMyAttackWatch: (action) ->

    entities = @getGameSession().getBoard().getFriendlyEntitiesAroundEntity(action.getTarget(), CardType.Unit, 1, true)
    if entities?
      for entity in entities
        if entity?
          damageAction = new DamageAction(@getGameSession())
          damageAction.setOwnerId(@getCard().getOwnerId())
          damageAction.setSource(@getCard())
          damageAction.setTarget(entity)
          damageAction.setDamageAmount(@damageAmount)
          @getGameSession().executeAction(damageAction)

module.exports = ModifierMyAttackWatchAreaDamage
