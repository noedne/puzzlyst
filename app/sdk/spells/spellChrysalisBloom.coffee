Cards = require 'app/sdk/cards/cardsLookupComplete'
ModifierEgg = require 'app/sdk/modifiers/modifierEgg'
PlayCardSilentlyAction = require 'app/sdk/actions/playCardSilentlyAction'
Spell = require './spell'

class SpellChrysalisBloom extends Spell

  onApplyOneEffectToBoard: () ->

    ownerId = @getOwnerId()

    if @getGameSession().getIsRunningAsAuthoritative()

      friendlyMinions = []
      for unit in @getGameSession().getBoard().getUnits()
        if unit?.getOwnerId() is ownerId and !unit.getIsGeneral()
          friendlyMinions.push(unit)

      playerOffset = 0
      if @isOwnedByPlayer1() then playerOffset = -1 else playerOffset = 1

      for minion in friendlyMinions
        spawnPosition = {x:minion.getPosition().x+playerOffset, y:minion.getPosition().y}
        if !@getGameSession().getBoard().getObstructionAtPositionForEntity(spawnPosition, minion)

          egg = {id: Cards.Faction5.Egg}
          egg.additionalInherentModifiersContextObjects ?= []
          egg.additionalInherentModifiersContextObjects.push(ModifierEgg.createContextObject(minion.createNewCardData(), minion.getName()))

          spawnAction = new PlayCardSilentlyAction(@getGameSession(), ownerId, spawnPosition.x, spawnPosition.y, egg)
          spawnAction.setSource(@)
          @getGameSession().executeAction(spawnAction)

module.exports = SpellChrysalisBloom
