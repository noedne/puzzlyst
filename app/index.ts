// localization setup
const whenLocalizationReady = require('app/localization/index');

whenLocalizationReady.then(() => {
  require('i18next');
  require('./application');
});