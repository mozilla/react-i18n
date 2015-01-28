var React = require("react");
var I18N = require("./../lib/I18N");
console.log(I18N);
var L10N = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Well hello there</h1>
        <br/>
        <hr/>
        <p>{I18N}</p>
        <hr/>
        <p>{I18N.localeFrom("th-TH")} Hello world</p>
        <p>{I18N.languageFrom("th-TH")} Hello world</p>
        <p>{I18N.languageNameFor("th-TH")} Hello world</p>
        <p>{I18N.languageEnglishName("th-TH")} Hello world</p>
        <p>{I18N.getAllLocaleCodes()}</p>
      </div>
    );
  }
});

React.render(<L10N />, document.getElementById("app"));
