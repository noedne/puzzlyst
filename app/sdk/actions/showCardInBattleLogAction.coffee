Action = require './action'

class ShowCardInBattleLogAction extends Action

  @type:"ShowCardInBattleLogAction"

  constructor: () ->
    @type ?= ShowCardInBattleLogAction.type
    super

module.exports = ShowCardInBattleLogAction
