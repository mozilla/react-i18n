var util = require("util");
var langMap = require("langmap");
var lang = navigator.language || navigator.userLanguage;

/**
* Given a locale, return native language name e.g.
given "th-TH" will return "ภาษาไทย"
**/
function languageNameFor(locale) {
  locale = languageFrom(locale);
  return langMap[locale] ? langMap[locale].nativeName : "Unknown";
}

/**
* Given a locale, return English language name e.g.
given "th-TH" will return "Thai"
**/
function languageEnglishName(locale) {
  locale = languageFrom(locale);
  return langMap[locale] ? langMap[locale].englishName : "Unknown";
}

/**
* Given a language code, return a locale code the OS understands.
*
* language: en-US
* locale: en_US
**/
function localeFrom(language) {
  if (! language || ! language.split) {
    return "";
  }
  if (language.indexOf("-") === -1) {
    return language;
  }
  var parts = language.split("-");
  if (parts.length === 1) {
    return parts[0].toLowerCase();
  } else if (parts.length === 2) {
    return util.format("%s_%s", parts[0].toLowerCase(), parts[1].toUpperCase());
  } else if (parts.length === 3) {
    // sr-Cyrl-RS should be sr_RS
    return util.format("%s_%s", parts[0].toLowerCase(), parts[2].toUpperCase());
  } else {
    console.error(
      util.format("Unable to map a local from language code [%s]", language));
      return language;
  }
}

/**
* Given a locale code, return a language code
**/
function languageFrom(locale) {
  if (!locale || !locale.split) {
    return "";
  }
  var parts = locale.split(/[-_]/);
  if (parts.length === 1) {
    return parts[0].toLowerCase();
  } else if (parts.length === 2) {
    return util.format("%s-%s", parts[0].toLowerCase(), parts[1].toUpperCase());
  } else if (parts.length === 3) {
    // sr_RS should be sr-RS
    return util.format("%s-%s", parts[0].toLowerCase(), parts[2].toUpperCase());
  } else {
    console.error(
      util.format("Unable to map a language from locale code [%s]", locale));
      return locale;
  }
}

function getAllLocaleCodes() {
  return langMap;
}

var localeInfo = {
  lang: languageFrom(lang),
  name: languageNameFor(lang),
  engName: languageEnglishName(lang),
  locale: localeFrom(lang),
  momentLang: 'langToMomentJSLang(lang)',
  direction: 'lang_dir',
  otherLangPrefs: 'getOtherLangPrefs(langs)',
  alternateLangs: 'getAlternateLangSupport(localeInfo.otherLangPrefs, listOfLanguages)'
}
module.exports = {
  localeInfo: localeInfo,
  getAllLocaleCodes: getAllLocaleCodes,
  languageFrom: languageFrom,
  localeFrom: localeFrom,
  languageEnglishName: languageEnglishName,
  languageNameFor: languageNameFor
};
