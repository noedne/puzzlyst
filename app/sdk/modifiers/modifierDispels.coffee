Modifier = require './modifier'
i18next = require 'i18next'

class ModifierDispels extends Modifier

  type: "ModifierDispels"
  @type: "ModifierDispels"

  @isKeyworded: true
  @keywordDefinition: i18next.t("modifiers.dispels_def")
  @modifierName: i18next.t("modifiers.dispels_name")

module.exports = ModifierDispels
