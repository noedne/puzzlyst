Modifier = require './modifier'

class ModifierBuff extends Modifier

  type:"ModifierBuff"
  @type:"ModifierBuff"

  @createContextObject: (atk, maxHP, isRebase) ->
    contextObject = super()
    contextObject.attributeBuffs = { atk, maxHP };
    if isRebase
      contextObject.attributeBuffsRebased = ['atk', 'maxHP'];
      contextObject.appliedName = 'Base Stats'
      contextObject.appliedDescription = 'Set to ' + atk + '/' + maxHP
    else
      contextObject.appliedName = 'Stats Buff'
    contextObject.isRebase = isRebase
    return contextObject

  getIsRebase: () ->
    return @isRebase

module.exports = ModifierBuff