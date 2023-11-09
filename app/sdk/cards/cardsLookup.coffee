###
  Cards Lookup. Does not include skins or prismatics.
  NOTE: in any case where you might need prismatics or card skins, you should require cardsLookupComplete.coffee and not this file!
###

_ = require("underscore")

class Cards

  @Faction1:{
    General:                  1
    AltGeneral:               2
    ThirdGeneral:             3
    SilverguardSquire:        4
    WindbladeAdept:           5
    SunstoneTemplar:          6
    SilverguardKnight:        7
    ArclyteSentinel:          8
    WindbladeCommander:       9
    LysianBrawler:            10
    Lightchaser:              11
    SuntideMaiden:            12
    IroncliffeGuardian:       13
    ElyxStormblade:           14
    GrandmasterZir:           15
    AzuriteLion:              16
    Sunriser:                 17
  }

  @Faction2:{
    General:             100
    AltGeneral:          101
    ThirdGeneral:        102
    Heartseeker:         103
    Widowmaker:          104
    KaidoAssassin:       105
    ScarletViper:        106
    GoreHorn:            107
    OnyxBear:            108
    JadeOgre:            109
    ChakriAvatar:        110
    MageOfFourWinds:     111
    CelestialPhantom:    112
    StormKage:           113
    HamonBlademaster:    114
    KeshraiFanblade:     115
    TuskBoar:            116
    LanternFox:          117
  }

  @Faction3:{
    General:             200
    AltGeneral:          201
    ThirdGeneral:        202
    WindShrike:          203
    StarfireScarab:      204
    SandHowler:          205
    Dunecaster:          206
    OrbWeaver:           207
    Pyromancer:          208
    BrazierRedSand:      209
    BrazierGoldenFlame:  210
    BrazierDuskWind:     211
    Dervish:             212
    NightfallMechanyst:  213
    MirrorMaster:        214
    AymaraHealer:        215
    PortalGuardian:      216
    Oserix:              217
  }

  @Faction4:{
    General:              300
    AltGeneral:           301
    ThirdGeneral:         302
    AbyssalCrawler:       303
    AbyssalJuggernaut:    304
    BloodmoonPriestess:   305
    ShadowWatcher:        306
    DeepfireDevourer:     307
    DarkSiren:            308
    VorpalReaver:         309
    Wraithling:           310
    DarkspineElemental:   311
    GloomChaser:          312
    SharianShadowdancer:  313
    NightsorrowAssassin:  314
    SpectralRevenant:     315
    BlackSolus:           316
    ReaperNineMoons:      317
  }

  @Faction5:{
    General:           400
    AltGeneral:        401
    ThirdGeneral:      402
    EarthWalker:       403
    Grimrock:          404
    Kolossus:          405
    MakantorWarbeast:  406
    Phalanxar:         407
    Elucidator:        408
    UnstableLeviathan: 409
    Kujata:            410
    PrimordialGazer:   411
    Egg:               412
    YoungSilithar:     413
    VeteranSilithar:   414
    SilitharElder:     415
    SpiritHarvester:   416
    MiniMagmar:        417
    Vindicator:        418
  }

  @Faction6:{
    General:          500
    AltGeneral:       501
    ThirdGeneral:     502
    FenrirWarmaster:  503
    GhostWolf:        504
    CrystalCloaker:   505
    CrystalWisp:      506
    ArcticRhyno:      507
    PrismaticGiant:   508
    IceDrake:         509
    WyrBeast:         510
    WolfRaven:        511
    BoreanBear:       512
    Razorback:        513
    AncientGrove:     514
    VoiceoftheWind:   515
    Treant:           516
    HearthSister:     517
    WaterBear:        518
    SnowElemental:    519
    WolfAspect:       520
    AzureDrake:       521
    SeismicElemental: 522
    GravityWell:      523
    BlazingSpines:    524
    BonechillBarrier: 525
    ArcticDisplacer:  526
  }

  @Neutral:{
    SpottedDragonlark:   10000
    SilvertongueCorsair: 10001
    SaberspineTiger:     10002
    PhaseHound:          10003
    BlackSandBurrower:   10004
    RepulsionBeast:      10005
    FireSpitter:         10006
    KomodoCharger:       10007
    PlanarScout:         10008
    EphemeralShroud:     10009
    ValeHunter:          10010
    TwilightMage:        10011
    BrightmossGolem:     10012
    BloodshardGolem:     10013
    DragoneboneGolem:    10014
    StormmetalGolem:     10015
    SunSeer:             10016
    Manaforger:          10017
    PrismaticIllusionist:10018
    AlcuinLoremaster:    10019
    OwlbeastSage:        10020
    Lightbender:         10021
    Serpenti:            10022
    ArcaneIllusion:      10023
    Mechaz0r:            10024
    Mechaz0rHelm:        10025
    Mechaz0rWings:       10026
    Mechaz0rCannon:      10027
    Mechaz0rSword:       10028
    Mechaz0rChassis:     10029
    WindStopper:         10030
    VineEntangler:       10031
    RockPulverizer:      10032
    PrimusShieldmaster:  10033
    HailstoneHowler:     10034
    BluetipScorpion:     10035
    CrimsonOculus:       10036
    ThornNeedler:        10037
    RogueWarden:         10038
    PutridMindflayer:    10039
    FlameWing:           10040
    LightningBeetle:     10041
    WhistlingBlade:      10042
    PrimusFist:          10043
    GolemMetallurgist:   10044
    GolemVanquisher:     10045
    PiercingMantis:      10046
    FrostboneNaga:       10047
    ArchonSpellbinder:   10048
    SilhoutteTracer:     10049
    SarlacTheEternal:    10050
    DarkNemesis:         10051
    MirkbloodDevourer:   10052
    SkyrockGolem:        10053
    Sojourner:           10054
    AzureHornShaman:     10055
    FlamebloodWarlock:   10056
    BloodtearAlchemist:  10057
    Crossbones:          10058
    SwornAvenger:        10059
    SwornDefender:       10060
    RedSynja:            10061
    CoiledCrawler:       10062
    DaggerKiri:          10063
    DancingBlades:       10064
    VenomToth:           10065
    ArtifactHunter:      10066
    ChaosElemental:      10067
    JaxTruesight:        10068
    Mindwarper:          10069
    Pandora:             10070
    PandoraMinion1:      10071
    PandoraMinion2:      10072
    PandoraMinion3:      10073
    PandoraMinion4:      10074
    PandoraMinion5:      10075
    MiniJax:             10076
    LuxIgnis:            10077
    SyvrelTheExile:      10078
    Spelljammer:         10079
    Dilotas:             10080
    DilotasTombstone:    10081
    HailstoneGolem:      10082
    Maw:                 10083
    DeathBlighter:       10084
    HealingMystic:       10085
    VoidHunter:          10086
    AshMephyt:           10087
    FirstSwordofAkrane:  10088
    TheHighHand:         10089
    Eclipse:             10090
    LadyLocke:           10091
    Moebius:             10092
    HankHart:            10093
    Rook:                10094
    Purgatos:            10095
    Songweaver:          10096
    Aethermaster:        10097
    ZenRui:              10098
    EmeraldRejuvenator:  10099
    ZuraelTheLifegiver:  10100
    Paddo:               10101
    BlackLocust:         10102
    WindRunner:          10103
    Mogwai:              10104
    GhostLynx:           10105
    Grailmaster:         10106
    Firestarter:         10107
    Spellspark:          10108
    Khymera:             10109
    Jaxi:                10110
    SunElemental:        10111
    ProphetWhitePalm:    10112
    ArakiHeadhunter:     10113
    KeeperOfTheVale:     10114
    WhiteWidow:          10115
    WingsOfParadise:     10116
    AstralCrusader:      10117
    Dreamgazer:          10118
    Bonereaper:          10119
    HollowGrovekeeper:   10120
    Tethermancer:        10121
    WarTalon:            10122
  }

  @Spell:{
    Dispel:                    20030
    FollowupTeleport:          20053
    FollowupTeleportEnemyToMe: 20054
    ApplyModifiers:            20055
    KillTarget:                20056
    SpawnEntity:               20058
    Repulsion:                 20060
    SpellDamage:               20083
    CloneTargetEntity:         20092
    FollowupScionsThirdWish:   20098
    CloneSourceEntity:         20101
    FollowupTeleportMyGeneral: 20103
    CloneSourceEntity2X:       20107
    CloneSourceEntity3X:       20108
    DeployMechaz0r:            20110
    KillTargetWithRanged:      20123
    DunecasterFollowup:        20126
    FollowupSwapPositions:     20130
    FollowupDamage:            20142
    FollowupHeal:              20159
    MindControlByAttackValue:  20164
    FollowupRandomTeleport:    20170
    FollowupKeeper:            20171
    FollowupHollowGroveKeeper: 20172
    FollowupKillTargetByAttack:20173
    Roar:                      20174
    Afterglow:                 20175
    Blink:                     20176
    ArcaneHeart:               20177
    WindShroud:                20178
    PsionicStrike:             20179
    Shadowspawn:               20180
    AbyssalScar:               20181
    Overload:                  20182
    SeekingEye:                20183
    Warbird:                   20184
    KineticSurge:              20185
    IroncliffeHeart:           20186
    SkyBurial:                 20187
    Afterblaze:                20188
    FightingSpirit:            20189
    LucentBeam:                20190
    CrimsonCoil:               20191
    ShadowWaltz:               20192
    Pandamonium:               20193
    MirrorMeld:                20194
    AstralFlood:               20195
    WhisperOfTheSands:         20196
    PsychicConduit:            20197
    CorpseCombustion:          20198
    LurkingFear:               20199
    InkhornGaze:               20200
    SphereOfDarkness:          20201
    RazorSkin:                 20202
    LavaLance:                 20203
    EchoingShriek:             20204
    VoidSteal:                 20205
    NaturesConfluence:         20206
    Frostburn:                 20207
    WailingOverdrive:          20208
    VespyricCall:              20209
    DoubleAttackAndHealth:     20210
    LightningBlitz:            20211
    WintersWake:               20212
    VeilOfUnraveling:          20213
    AlteredBeast:              20214
    HatchAnEgg:                20215
    CircleOfDesiccation:       20216
    KoanOfHorns:               20217
    ThumpingWave:              20218
    FlamingStampede:           20219
    SkyPhalanx:                20220
    CloneSourceEntityNearbyGeneral:       20221
    CloneSourceEntityNearbyGeneral2X:       20222
    FollowupActivateBattlepet: 20223
    Riddle:                    20224
    EntropicGaze:              20225
    AphoticDrain:              20226
    NecroticSphere:            20227
    ConcealingShroud:          20228
    Enfeeble:                  20229
    FollowupTeleportMyGeneralBehindEnemy: 20230
    EtherealBlades:            20231
    TrinityOath:               20232
    DrainingWave:               20233
    TectonicSpikes:            20234
    PrismBarrier:              20235
    FollowupTeleportInFrontOfAnyGeneral: 20236
    FrigidCorona:              20237
    SummonFiends:              20238
    FuriousLings:              20239
    CobraStrike:               20240
    Backstabbery:              20241
    DivineSpark:               20242
    Punish:                    20243
    EquipVetArtifacts:         20244
    ValknusSeal:               20245
    StoneToSpears:             20246
    TempestBBS:                20247
    PhoenixFireBBS:            20248
    LifeCoil:                  20249
    DragonBreath:              20250
    DragonHeart:               20251
    DragonGrace:               20252
    SpawnNeutralEntity:        20253
    BloodOfAir:                20254
    AridUnmaking:              20255
    Joseki:                    20256
    DeathIncoming:             20257
    MoltenRebirth:             20258
    MoltenRebirthFollowup:     20259
    FollowupFight:             20260
    ManaDeathgrip:             20261
    CataclysmicFault:          20262
    BounceMinionSpawnEntity:   20263
    Doom:                      20264
    Reassemble:                20265
    GlacialFissure:            20266
    TwilightReiki:             20267
    PrimalBallast:             20268
    Nethermeld:                20269
    FollowupTeleportToFriendlyCreep: 20270
    ChokingTendrils:           20271
    InklingSurge:              20272
    Shadowstalk:               20273
    Congregation:              20274
    Gotatsu:                   20275
    LuminousCharge:            20276
    CloneSourceEntity4X:       20277
    BoulderHurl:               20278
    Bombard:                   20279
    Sanctify:                  20280
    ChanneledBreath:           20281
    AperionsClaim:             20282
    Flicker:                   20283
    CorporealCadence:          20284
    ValeAscension:             20285
    AzureSummoning:            20286
    FortifiedAssault:          20287
    VaathsBrutality:           20288
    VespyrianMight:            20289
    FirestormMantra:           20290
    EndureTheBeastlands:       20291
    EvolutionaryApex:          20292
    FlawlessReflection:        20293
    SpiralCounter:             20294
    SnowPatrol:                20295
    VerdentFulmination:        20296
    BloodRage:                 20297
    BlindingSnowstorm:         20298
    SuperiorMirage:            20299
    DropLift:                  20300
    KingsGuardBBS:             20301
    SwordsBBS:                 20302
    SacrificeBBS:              20303
    DebuffBBS:                 20304
    EggBBS:                    20305
    StunBBS:                   20306
    SpellSword1:               20307
    SpellSword2:               20308
    SpellSword3:               20309
    SpellSword4:               20310
    SummonHusks:               20311
    EmbryoticInsight:          20312
    KinematicProjection:       20313
    Thunderbomb:               20314
    IncreasingDominance:       20315
    SteadfastFormation:        20316
    Fealty:                    20317
    CallToArms:                20318
    EggGrenade:                20319
    Sunstrike:                 20320
    Infest:                    20321
    MonolithicVision:          20322
    AssassinationProtocol:     20323
    AspectOfBear:              20324
    Invincible:                20325
    SeekerSquad:               20326
    Bamboozle:                 20327
    Substitution:              20328
    EssenceSculpt:             20329
    Wintertide:                20330
    Betrayal:                  20331
    DauntlessAdvance:          20332
    Deathmark:                 20333
    Vellumscry:                20334
    BurdenOfKnowledge:         20335
    EqualityConstraint:        20336
    Shatter:                   20337
    UpperHand:                 20338
    SaurianFinality:           20339
    HorrificVisage:            20340
    MassFlight:                20341
    LostInTheDesert:           20342
    Auroraboros:               20343
    HomeostaticRebuke:         20344
    ForgeArtifact:             20345
    EffulgentInfusion:         20346
    CrystallineReinforcement:  20347
    AbhorrentUnbirth:          20348
    MechProgress:              20349
    Neurolink:                 20350
    FestiveSpirit:             20351
    SnowballBBS:               20352
    SpellDuplicator:           20353
    Kindle:                    20354
    DejaVu:                    20355
    ShadowBlossom:             20356
    IncreasingWinds:           20357
    IncreasingHeal:            20358
    EnterThunderdome:          20359
    DivinestBonderest:         20360
    Resilience:                20361
    GoneWithTheWind:           20362
    SummoningStones:           20363
    FollowupSpawnEntityFromDeck: 20364
    BootyProjection:           20365
    Rally:                     20366
    Triggered:                 20367
    # UNUSED:                  20368
    Spaghettify:               20369
    BigTime:                   20370
    IceCapsule:                20371
    # UNUSED:                  20372
    GateToDudesHouse:          20373
    TickleTendril:             20374
    OwnSideTeleport:           20375
    TwoForMe:                  20376
    HollowVortex:              20377
    GrabAThing:                20378
    # UNUSED:                  20379
    EvilXerox:                 20380
    ThoughtExchange:           20381
    Reggplicate:               20382
    MarchOfTheBrontos:         20383
    ChargeIntoBattle:          20384
    PandaJail:                 20385
    Metalworking:              20386
    SpellDamageOrHeal:         20387
    BrilliantPlume:            20388
    GreaterPhoenixFire:        20389
    YellRealLoud:              20390
    InfiniteHowlers:           20391
    OnceMoreWithProvoke:       20392
    AspectOfIdentity:          20393
    CreepingFrost:             20394
    SundropElixir:             20400
    Tempest:                   20401
    Decimate:                  20402
    AurynNexus:                20403
    LastingJudgement:          20404
    Martyrdom:                 20405
    WarSurge:                  20406
    LionheartBlessing:         20407
    SunBloom:                  20408
    TrueStrike:                20409
    CircleLife:                20410
    BeamShock:                 20411
    HolyImmolation:            20412
    DivineBond:                20413
    AegisBarrier:              20414
    AerialRift:                20415
    Magnetize:                 20416
    SaberspineSeal:            20417
    MistDragonSeal:            20418
    PhoenixFire:               20419
    KageLightning:             20420
    TwinStrike:                20421
    EightGates:                20422
    SpiralTechnique:           20423
    ManaVortex:                20424
    InnerFocus:                20425
    OnyxBearSeal:              20426
    GhostLightning:            20427
    DeathstrikeSeal:           20428
    AncestralDivination:       20429
    Juxtaposition:             20430
    ArtifactDefiler:           20431
    HeavensEclipse:            20432
    MistWalking:               20433
    KillingEdge:               20434
    Enslave:                   20435
    SiphonEnergy:              20436
    CosmicFlesh:               20437
    Blindscorch:               20438
    AstralPhasing:             20439
    AurorasTears:              20440
    EntropicDecay:             20441
    Maelstrom:                 20442
    DrainMorale:               20443
    ScionsFirstWish:           20444
    ScionsSecondWish:          20445
    ScionsThirdWish:           20446
    RashasCurse:               20447
    RashasCurseFollowup:       20448
    StarsFury:                 20449
    BoneSwarm:                 20450
    FountainOfYouth:           20451
    InnerOasis:                20452
    AbyssianStrength:          20453
    DaemonicLure:              20454
    NetherSummoning:           20455
    ShadowNova:                20456
    VoidPulse:                 20457
    DeathfireCrescendo:        20458
    BreathOfTheUnborn:         20459
    RiteOfTheUndervault:       20460
    DarkSacrifice:             20461
    RitualBanishing:           20462
    DarkTransformation:        20463
    DarkSeed:                  20464
    CurseOfAgony:              20465
    ShadowReflection:          20466
    SoulshatterPact:           20467
    WraithlingSwarm:           20468
    ConsumingRebirth:          20469
    FractalReplication:        20470
    DampeningWave:             20471
    FlashReincarnation:        20472
    DiretideFrenzy:            20473
    Tremor:                    20474
    DanceOfDreams:             20475
    GreaterFortitude:          20476
    EarthSphere:               20477
    BoundedLifeforce:          20478
    Amplification:             20479
    Metamorphosis:             20480
    PlasmaStorm:               20481
    ChrysalisBloom:            20482
    NaturalSelection:          20483
    MindSteal:                 20484
    EggMorph:                  20485
    KineticEquilibrium:        20486
    GravityWell:               20487
    BonechillBarrier:          20488
    BlazingSpines:             20489
    ChromaticCold:             20490
    FlashFreeze:               20491
    PermafrostShield:          20492
    Avalanche:                 20493
    ElementalFury:             20494
    Numb:                      20495
    MarkOfSolitude:            20496
    AspectOfTheWolf:           20497
    AspectOfTheDrake:          20498
    AspectOfTheMountains:      20499
    RitualOfTheWind:           20500
    IceCage:                   20501
    SpiritoftheWild:           20502
    Cryogenesis:               20503
    FollowupTwinStrike:        20504
    FollowupKillDamagedTarget: 20505
    FollowupDraugarLord:       20506
    FollowupDamageAndBuffSelf: 20507
  }

  @Artifact: {
    IndomitableWill:      30000
    SoulGrimwar:          30001
    SunstoneBracers:      30002
    HornOfTheForsaken:    30003
    StaffOfYKir:          30004
    MaskOfShadows:        30005
    AnkhFireNova:         30006
    MaskOfTranscendance:  30007
    MaskOfBloodLeech:     30008
    PoisonHexblade:       30009
    AdamantineClaws:      30010
    PristineScale:        30011
    SpectralBlade:        30012
    Snowpiercer:          30013
    Frostbiter:           30014
    TwinFang:             30015
    ArclyteRegalia:       30016
    Winterblade:          30017
  }

  @Tile: {
    BonusMana:    40000
    Shadow:       40001
  }

  @Tutorial:{
    TutorialLion:         100001
    TutorialGuardian:    100002
    TutorialBrawler:     100003
    TutorialKolossus:    100009
    TutorialRepulsor:    100014
    TutorialVox:              100019
    TutorialGro:              100020
    TutorialGeneral:          100026
    TutorialOpponentGeneral1:      100027
    TutorialThornNeedler:     100028
    TutorialSkyrockGolem:     100029
    TutorialBloodshardGolem:  100030
    TutorialBrightmossGolem:  100031
    TutorialIceGolem:         100032
    TutorialStormmetalGolem:  100033
    TutorialOpponentGeneral2:      100034
    TutorialSaberspineTiger:  100036
    TutorialRookie:           100039
    TutorialDragoneboneGolem: 100040
    TutorialOpponentGeneral4:      100042
    TutorialSignatureGeneral: 100044
    TutorialAdept: 100045
  }

  @TutorialSpell:{
    TutorialPlayerTrueStrike:120013
    TutorialFireOrb:         120014
    TutorialFrozenFinisher:  120015
  }

  @TutorialArtifact:{
    TutorialSunstoneBracers: 130002
  }

  @Boss: {
    Boss1: 200001
    Boss2: 200002
    Boss3: 200003
    Boss4: 200004
    Boss5: 200005
    Boss6: 200006
    Boss6Wings: 200106
    Boss6Chassis: 200206
    Boss6Sword: 200306
    Boss6Helm: 200406
    Boss6Prime: 200506
    Boss7: 200007
    Boss8: 200008
    Boss9: 200009
    Boss9Clone: 200109
    QABoss3: 200103
    Boss10: 200010
    Boss11: 200011
    Boss12: 200012
    Boss12Idol: 200112
    Boss13: 200013
    Boss14: 200014
    Boss15: 200015
    Boss16: 200016
    Boss17: 200017
    Boss18: 200018
    Boss19: 200019
    Boss20: 200020
    Boss21: 200021
    Boss22: 200022
    Boss23: 200023
    Boss24: 200024
    Boss24Valiant: 200124
    Boss25: 200025
    Boss26: 200026
    Boss26Companion: 200126
    Boss27: 200027
    Boss28: 200028
    Boss29: 200029
    Boss30: 200030
    Boss31: 200031
    Boss31Treat1: 200131
    Boss31Treat2: 200231
    Boss31Treat3: 200331
    Boss31Haunt1: 200431
    Boss31Haunt2: 200531
    Boss31Haunt3: 200631
    Boss32: 200032
    Boss32_2: 200232
    Boss33: 200033
    Boss33_1: 200133
    Boss33_2: 200233
    Boss33_3: 200333
    Boss33_4: 200433
    Boss34: 200034
    Boss34_2: 200234
    Boss35: 200035
    Boss36: 200036
    Boss36_2: 200236
    Boss36_3: 200336
    Boss37: 200037
    Boss38: 200038
    FrostfireImp: 200039
    FrostfireSnowchaser: 200040
    FrostfireTiger: 200041
  }

  @BossArtifact: {
    CycloneGenerator: 240001
    FrostArmor: 240002
    FlyingBells: 240003
    Coal: 240004
    CostReducer: 240005
    Snowball: 240006
  }

  @BossSpell: {
    HolidayGift: 250001
    LaceratingFrost: 250002
    EntanglingShadow: 250003
    LivingFlame: 250004
    MoldingEarth: 250005
    EtherealWind: 250006
    RestoringLight: 250007
    AncientKnowledge: 250008
  }

module.exports = Cards
