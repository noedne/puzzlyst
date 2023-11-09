CardType = require 'app/sdk/cards/cardType'
DamageAction = require 'app/sdk/actions/damageAction'
Modifier = require 'app/sdk/modifiers/modifier'
Spell = require './spell'
SpellFilterType = require './spellFilterType'

class SpellFollowupDamageAndBuffSelf extends Spell

  targetType: CardType.Unit
  spellFilterType: SpellFilterType.NeutralDirect
  damageAmount: 0
  attackBuff: 0
  healthBuff: 0

  onApplyEffectToBoardTile: (board,x,y,sourceAction) ->
    super(board,x,y,sourceAction)

    applyEffectPosition = {x: x, y: y}
    target = board.getCardAtPosition(applyEffectPosition, @targetType)

    damageAction = new DamageAction(@getGameSession())
    damageAction.setOwnerId(@ownerId)
    damageAction.setTarget(target)
    damageAction.setDamageAmount(@damageAmount)
    @getGameSession().executeAction(damageAction)

    @getGameSession().applyModifierContextObject(
      Modifier.createContextObjectWithAttributeBuffs(@attackBuff, @healthBuff),
      board.getUnitAtPosition(@getFollowupSourcePosition()),
    )

module.exports = SpellFollowupDamageAndBuffSelf
