var React = require("react");
var I18N = require("./../lib/I18N");

var L10N = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Well hello there</h1>
        <br/>
        <hr/>
        <p>lang: {I18N.localeInfo.lang}</p>
        <p>name: {I18N.localeInfo.name}</p>
        <p>engName: {I18N.localeInfo.engName}</p>
        <p>locale: {I18N.localeInfo.locale}</p>
        <p>momentLang: {I18N.localeInfo.momentLang}</p>
        <p>direction: {I18N.localeInfo.direction}</p>
        <p>otherLangPrefs: {I18N.localeInfo.otherLangPrefs}</p>
        <p>alternateLangs: {I18N.localeInfo.alternateLangs}</p>
        <hr/>
        <p>localeFrom: {I18N.localeFrom("th-TH")}</p>
        <p>languageFrom: {I18N.languageFrom("th-TH")}</p>
        <p>languageNameFor: {I18N.languageNameFor("th-TH")}</p>
        <p>languageEnglishName: {I18N.languageEnglishName("th-TH")}</p>
        <p>getAllLocaleCodes(): {I18N.getAllLocaleCodes().ar.nativeName}</p>
      </div>
    );
  }
});

React.render(<L10N />, document.getElementById("app"));
