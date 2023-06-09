Challenge = require("app/sdk/challenges/challenge")
Instruction   = require 'app/sdk/challenges/instruction'
MoveAction     = require 'app/sdk/actions/moveAction'
AttackAction   = require 'app/sdk/actions/attackAction'
PlayCardFromHandAction = require 'app/sdk/actions/playCardFromHandAction'
EndTurnAction   = require 'app/sdk/actions/endTurnAction'
Cards       = require 'app/sdk/cards/cardsLookupComplete'
Deck       = require 'app/sdk/cards/deck'
GameSession       = require 'app/sdk/gameSession'
AgentActions = require 'app/sdk/agents/agentActions'
CONFIG = require 'app/common/config'
RSX = require('app/data/resources')
ChallengeCategory = require('app/sdk/challenges/challengeCategory')
ModifierDeathWatchBuffSelf = require('app/sdk/modifiers/modifierDeathWatchBuffSelf')
i18next = require('i18next')

class Puzzle extends Challenge

  @type: 'Puzzle'
  type: 'Puzzle'
  categoryType: ChallengeCategory.contest1.type


  name: 'Name'
  description: 'Description'
  iconUrl: RSX.speech_portrait_vetruvian.img

  _musicOverride: RSX.music_battlemap_vetruv.audio

  otkChallengeStartMessage: 'Start message'
  otkChallengeFailureMessages: [
    'Failure message',
  ]

  battleMapTemplateIndex: 6
  snapShotOnPlayerTurn: 0
  startingManaPlayer: 9
  startingManaOpponent: 9
  startingHandSizePlayer: 6
  usesResetTurn: false

  # a=>(b=SDK.GameSession.getInstance().getCardCaches().getCards().find(c=> c.getName()==a).id,Object.entries(SDK.Cards).find(d=>!!Object.entries(d[1]).find(([e,f])=>f==b&&(console.log(e)||1)))[0])
  getMyPlayerDeckData: (gameSession)->
    return [
      {id: Cards.Faction6.General}
      {id: Cards.Artifact.Snowpiercer}
      {id: Cards.Neutral.FlamebloodWarlock}
      {id: Cards.Spell.ChromaticCold}
      {id: Cards.Spell.ChromaticCold}
      {id: Cards.Spell.RitualOfTheWind}
    ]

  getOpponentPlayerDeckData: (gameSession)->
    return [
      {id: Cards.Faction1.General}
      {id: Cards.TutorialSpell.TutorialFireOrb}
    ]

  setupBoard: (gameSession) ->
    super(gameSession)

    @applyCardToBoard({id: Cards.Tile.BonusMana}, 4, 0)
    @applyCardToBoard({id: Cards.Tile.BonusMana}, 4, 4)
    @applyCardToBoard({id: Cards.Tile.BonusMana}, 5, 2)

    myPlayerId = gameSession.getMyPlayerId()
    opponentPlayerId = gameSession.getOpponentPlayerId()

    general1 = gameSession.getGeneralForPlayerId(myPlayerId)
    general1.setPosition({x: 4, y: 3})
    # general1.maxHP = 25
    general1.setDamage(25-6)
    general2 = gameSession.getGeneralForPlayerId(opponentPlayerId)
    general2.setPosition({x: 3, y: 0})
    # general2.maxHP = 25

    @applyCardToBoard({id: Cards.Neutral.Firestarter}, 5, 2, myPlayerId)
    @applyCardToBoard({id: Cards.Neutral.OwlbeastSage}, 4, 0, myPlayerId)

    @applyCardToBoard({id: Cards.Faction2.HamonBlademaster}, 4, 4, opponentPlayerId)
    @applyCardToBoard({id: Cards.Artifact.ArclyteRegalia}, 0, 0, opponentPlayerId)
    general2.getArtifactModifiersGroupedByArtifactCard().at(-1).forEach((modifier) => modifier.setDurability(2))

  setupOpponentAgent: (gameSession) ->
    super(gameSession)

    # Due to time maelstrom we don't know which turn the enemy general gets to finally act,
    # this will go away when we switch to resetting the otk on failure rather than ending turn and having a finisher
    for i in [0..5]
      @_opponentAgent.addActionForTurn(i,AgentActions.createAgentSoftActionShowInstructionLabels([
        label:i18next.t("challenges.advanced_vetruvian_1_taunt")
        isSpeech:true
        yPosition:.7
        isPersistent: true
        isOpponent: true
      ]))
      @_opponentAgent.addActionForTurn(i,AgentActions.createAgentActionPlayCardFindPosition(0,(() ->
        return [GameSession.getInstance().getGeneralForPlayer1().getPosition()]
      ).bind(this)))


module.exports = Puzzle
