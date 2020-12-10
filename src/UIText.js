import { getCurrentInstance } from "vue";

const here = getCurrentInstance();

export default {

methods: {

prefixUIT(MessageID, LanguageCode) {
  return `${MessageID}:${LanguageCode}:`;
},

setUIT(MessageID = "", LanguageCode = here.uitTable.LanguageCode, v) {
  var I = here.uitTable.Messages.findIndex(function (X) {
    return X.startsWith(here.prefixUIT(MessageID, LanguageCode));
  });
  if ( I >= 0 ) {
    here.uitTable.Messages[I] = here.prefixUIT(MessageID, LanguageCode) + v;
  } else {
    here.uitTable.Messages.push(here.prefixUIT(MessageID, LanguageCode) + v);
  }
},

getUIT(MessageID = "", LanguageCode = here.uitTable.LanguageCode) {
  var I = here.uitTable.Messages.findIndex(function (X) {
    return X.startsWith(here.prefixUIT(MessageID, LanguageCode));
  });
  if ( I >= 0 ) {
    return here.uitTable.Messages[I].substring(here.prefixUIT(MessageID, LanguageCode).length);
  } else {
    return "--undefined--";
  }
},

},

install: (app, uitTable) => {
app.provide("UIText", uitTable);
/*
Format for interface message keys:
"MessageID:LanguageCode:Text"
*/
uitTable.Messages = ["MessageID:LanguageCode:Text"];

}

};