ModifierEquipFriendlyArtifactWatch = require './modifierEquipFriendlyArtifactWatch'
Modifier = require './modifier'

class ModifierEquipFriendlyArtifactWatchGainAttackEqualToCost extends ModifierEquipFriendlyArtifactWatch

  type:"ModifierEquipFriendlyArtifactWatchGainAttackEqualToCost"
  @type:"ModifierEquipFriendlyArtifactWatchGainAttackEqualToCost"

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  buffName: null

  @createContextObject: (buffName, options) ->
    contextObject = super(options)
    contextObject.buffName = buffName
    return contextObject

  onEquipFriendlyArtifactWatch: (action, artifact) ->
    manaCost = artifact.getManaCost()
    attackModifier = Modifier.createContextObjectWithAttributeBuffs(manaCost,0)
    attackModifier.appliedName = @buffName
    @getCard().getGameSession().applyModifierContextObject(attackModifier, @getCard())
    @getGameSession().removeModifier(@)

module.exports = ModifierEquipFriendlyArtifactWatchGainAttackEqualToCost
