var util = require("util");
var langMap = require("langmap");

function I18n() {
  this.lang = this.languageFrom(navigator.language || navigator.userLanguage);
  this.engName = this.languageEnglishName(this.lang);
  this.name = this.languageNameFor(this.lang);
  this.locale = this.localeFrom(this.lang);
  this.direction = "ltr";
}
/**
* Given a locale, return native language name e.g.
given "th-TH" will return "ภาษาไทย"
**/
I18n.prototype.languageNameFor = function(locale) {
  locale = this.languageFrom(locale);
  return langMap[locale] ? langMap[locale].nativeName : "Unknown";
};

/**
* Given a locale, return English language name e.g.
given "th-TH" will return "Thai"
**/
I18n.prototype.languageEnglishName = function(locale) {
  locale = this.languageFrom(locale);
  return langMap[locale] ? langMap[locale].englishName : "Unknown";
};

/**
* Given a language code, return a locale code the OS understands.
*
* language: en-US
* locale: en_US
**/
I18n.prototype.localeFrom = function(language) {
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
  };

/**
* Given a locale code, return a language code
**/
I18n.prototype.languageFrom = function(locale) {
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
  };
I18n.prototype.getAllLocaleCodes = function() { return langMap; };

I18n.prototype.localeInfo = {
    // localeInfo object will contain all the necessary
    // informations that we need from the coming request
    // and we will later attached that to the locals and req
    name: function() {
      return this.languageNameFor(this.lang);
    },
    engName: this.languageEnglishName(this.lang),
    lang: this.languageFrom(this.lang),
    locale: this.locale
  };


module.exports = new I18n();
