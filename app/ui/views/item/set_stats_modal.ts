import NumberInput from "./number_input";

const Card = require('app/sdk/cards/card');
const CONFIG = require('app/common/config');
const FormPromptModalItemView = require('./form_prompt_modal');
const NavigationManager = require('app/ui/managers/navigation_manager');
const SDK = require('app/sdk');
const Template = require('app/ui/templates/item/set_stats_modal.hbs');

export default FormPromptModalItemView.extend({
  className: FormPromptModalItemView.prototype.className + ' number-input-view',
  id: 'app-set-damage',
  template: Template,

  ui: {
    $form: '.prompt-form',
    $submit: '.prompt-submit',
    $damageInput: '#damage-input',
    $statATK: '.atk',
    $statHP: '.hp',
    $attackBuffInput: '#attack-buff-input',
    $healthBuffInput: '#health-buff-input',
    $attackBaseInput: '#attack-base-input',
    $healthBaseInput: '#health-base-input',
  },

  events: {
    'click @ui.$submit': 'onClickSubmit',
    'click .prompt-cancel': 'onCancel',
  },

  initialize: function (options: { card: typeof Card }) {
    this.card = options.card;
    this.statATK = this.card.getATK();
    this.statHP = this.card.getHP();
  },

  onShow: function () {
    FormPromptModalItemView.prototype.onShow.apply(this);
    this.wasValid = true;
    this.oldATKState = 'normal';
    this.oldHPState = 'normal';
    this.ui.$statATK.text(this.statATK);
    this.ui.$statHP.text(this.statHP);
    this.stats = SDK.GameSession.current().getCardStats(this.card);
    const {
      damage,
      attackBase,
      attackBuff,
      healthBase,
      healthBuff,
    } = this.stats;
    this.damageInput = new NumberInput({
      $groupElement: this.ui.$damageInput,
      initial: damage,
      max: CONFIG.INFINITY,
      min: 0,
      placeholder: 0,
      select: true,
      onChangeValue: delta => this.onChangeValue('hp', -1, delta),
    });
    this.attackBaseInput = new NumberInput({
      $groupElement: this.ui.$attackBaseInput,
      initial: attackBase,
      max: CONFIG.INFINITY,
      min: 0,
      placeholder: this.card.atk,
      onChangeValue: delta => this.onChangeValue('atk', 1, delta),
    });
    this.attackBuffInput = new NumberInput({
      $groupElement: this.ui.$attackBuffInput,
      initial: attackBuff,
      max: CONFIG.INFINITY,
      min: -CONFIG.INFINITY,
      placeholder: 0,
      onChangeValue: delta => this.onChangeValue('atk', 1, delta),
    });
    this.healthBaseInput = new NumberInput({
      $groupElement: this.ui.$healthBaseInput,
      initial: healthBase,
      max: CONFIG.INFINITY,
      min: 1,
      placeholder: this.card.maxHP,
      onChangeValue: delta => this.onChangeValue('hp', 1, delta),
    });
    this.healthBuffInput = new NumberInput({
      $groupElement: this.ui.$healthBuffInput,
      initial: healthBuff,
      max: CONFIG.INFINITY,
      min: -CONFIG.INFINITY,
      placeholder: 0,
      onChangeValue: delta => this.onChangeValue('hp', 1, delta),
    });
    this.updateStatColors();
  },

  onSubmit: function () {
    const damage = this.damageInput.getValue();
    SDK.GameSession.current().setCardDamage(this.card, damage);
    NavigationManager.getInstance().destroyModalView();
    this.trigger('submit');
  },

  onChangeValue: function (stat: 'atk'|'hp', sign: number, delta: number) {
    const change = sign * delta;
    if (stat === 'atk') {
      this.statATK += change;
      this.ui.$statATK.text(this.statATK);
    } else {
      this.statHP += change;
      this.ui.$statHP.text(this.statHP);
    }
    this.updateValidState();
    this.updateStatColors();
  },

  updateValidState: function () {
    this.isValid = this.statHP > 0
      && this.damageInput != null && this.damageInput.getIsValid()
      && this.attackBaseInput != null && this.attackBaseInput.getIsValid()
      && this.attackBuffInput != null && this.attackBuffInput.getIsValid()
      && this.healthBaseInput != null && this.healthBaseInput.getIsValid()
      && this.healthBuffInput != null && this.healthBuffInput.getIsValid();
    if (this.wasValid == null || this.isValid === this.wasValid) {
      return;
    }
    this.ui.$submit.prop('disabled', !this.isValid);
    if (this.isValid) {
      this.ui.$statHP.tooltip('destroy');
    } else {
      this.ui.$statHP
        .tooltip({
          title: 'Invalid HP',
          trigger: 'manual',
        })
        .tooltip('show');
    }
    this.wasValid = this.isValid;
  },

  updateStatColors: function () {
    this.updateATKColor();
    this.updateHPColor();
  },

  updateATKColor: function () {
    const atk = this.statATK;
    const baseATK = this.attackBaseInput.getValue();
    if (atk < baseATK) {
      this.atkState = 'nerf';
    } else if (atk > baseATK) {
      this.atkState = 'buff';
    } else {
      this.atkState = 'normal';
    }
    this.updateStatColor(this.ui.$statATK, this.atkState, this.oldATKState);
    this.oldATKState = this.atkState;
  },

  updateHPColor: function () {
    const damage = this.damageInput.getValue();
    const maxHP = this.statHP + damage;
    const baseMaxHP = this.healthBaseInput.getValue();
    if (damage !== 0) {
      this.hpState = 'nerf';
    } else if (maxHP > baseMaxHP) {
      this.hpState = 'buff';
    } else {
      this.hpState = 'normal';
    }
    this.updateStatColor(this.ui.$statHP, this.hpState, this.oldHPState);
    this.oldHPState = this.hpState;
  },

  updateStatColor: function (
    $stat: JQuery,
    state: StatState,
    oldState: StatState,
  ) {
    if (state === oldState) {
      return;
    }
    $stat.removeClass(oldState);
    $stat.addClass(state);
  },
});

type StatState = 'normal' | 'nerf' | 'buff';
