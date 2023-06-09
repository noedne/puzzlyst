'use strict';

var SDK = require('app/sdk');
// pragma PKGS: tutorial_support
var Template = require('app/ui/templates/item/tutorial/challenge_lost.hbs');
var TutorialSupportView = require('./tutorial_support');

var TutorialChallengeLostView = TutorialSupportView.extend({

  id: 'tutorial-challenge-lost',

  template: Template,

  events: {
    'click .retry': 'onRetry',
  },

  initialize: function () {
    TutorialSupportView.prototype.initialize.call(this);

    var result;
    if (SDK.GameSession.current().getMyPlayer().getIsWinner()) {
      result = 'Victory';
    } else if (SDK.GameSession.current().getOpponentPlayer().getIsWinner()) {
      result = 'Defeat';
    } else {
      result = 'Draw'
    }

    this.model.set('challenge_hint', result);
  },

  onRetry: function () {
    this.trigger('retry_challenge');
  },

});

// Expose the class either via CommonJS or the global object
module.exports = TutorialChallengeLostView;
