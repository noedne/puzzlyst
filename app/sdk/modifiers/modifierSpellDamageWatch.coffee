Modifier = require './modifier'
PlayCardAction = require 'app/sdk/actions/playCardAction'
PlayCardFromHandAction = require 'app/sdk/actions/playCardFromHandAction'
DamageAction = require 'app/sdk/actions/damageAction'
CardType = require 'app/sdk/cards/cardType'
Stringifiers = require 'app/sdk/helpers/stringifiers'

class ModifierSpellDamageWatch extends Modifier

  type:"ModifierSpellDamageWatch"
  @type:"ModifierSpellDamageWatch"

  @modifierName:"Spell Damage Watch"
  @description: "Spell Damage Watch"

  activeInHand: false
  activeInDeck: false
  activeInSignatureCards: false
  activeOnBoard: true

  fxResource: ["FX.Modifiers.ModifierSpellWatch"]

  onAction: (e) ->
    super(e)

    action = e.action

    isSpell = action instanceof PlayCardFromHandAction and
      action.getCard()?.type is CardType.Spell

    isFollowupOfSpell = action instanceof PlayCardAction and
      action.getCard()?.getRootCard()?.getType() is CardType.Spell

    # watch for a spell (or followup of spell) being cast by player who owns this entity
    if (isSpell or isFollowupOfSpell) and
        action.getOwnerId() is @getCard().getOwnerId() and
        @createdDamageSubaction(action)
      @onDamagingSpellcast(action)

  onDamagingSpellcast: (action) ->
    # override me in sub classes to implement special behavior

  createdDamageSubaction: (action) ->
    # did the spell cast action create a damage subaction directly?
    for subAction in action.getSubActions()
      if subAction.getType() is DamageAction.type and !subAction.getCreatedByTriggeringModifier()
        return true
    return false

module.exports = ModifierSpellDamageWatch
