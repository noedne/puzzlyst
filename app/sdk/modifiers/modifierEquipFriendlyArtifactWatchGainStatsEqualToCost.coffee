ModifierEquipFriendlyArtifactWatch = require './modifierEquipFriendlyArtifactWatch'
Modifier = require './modifier'

class ModifierEquipFriendlyArtifactWatchGainStatsEqualToCost extends ModifierEquipFriendlyArtifactWatch

  type:"ModifierEquipFriendlyArtifactWatchGainStatsEqualToCost"
  @type:"ModifierEquipFriendlyArtifactWatchGainStatsEqualToCost"

  fxResource: ["FX.Modifiers.ModifierGenericBuff"]

  buffName: null

  @createContextObject: (buffAttack, buffHealth, buffName, options) ->
    contextObject = super(options)
    contextObject.buffAttack = buffAttack
    contextObject.buffHealth = buffHealth
    contextObject.buffName = buffName
    return contextObject

  onEquipFriendlyArtifactWatch: (action, artifact) ->
    manaCost = artifact.getManaCost()
    attackModifier = Modifier.createContextObjectWithAttributeBuffs(
      if @buffAttack then manaCost else 0,
      if @buffHealth then manaCost else 0,
    )
    attackModifier.appliedName = @buffName
    @getCard().getGameSession().applyModifierContextObject(attackModifier, @getCard())
    @getGameSession().removeModifier(@)

module.exports = ModifierEquipFriendlyArtifactWatchGainStatsEqualToCost
