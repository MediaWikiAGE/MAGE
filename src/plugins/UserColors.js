export default {

name: "UserColors",

install: (app, here) => {

app.config.globalProperties.colorMain = "#fff";
app.config.globalProperties.backgroundMain = "#000";
app.config.globalProperties.colorMenu = "#777";
app.config.globalProperties.backgroundMenu = "#333";
app.config.globalProperties.colorError = "#700";
app.config.globalProperties.backgroundError = "#300";
app.config.globalProperties.pxFont = 12;
app.config.globalProperties.nameFont = "monospace";
app.config.globalProperties.editUserColors = true;

app.config.globalProperties.UCStyle = {
font: `${app.config.globalProperties.pxFont}px '${app.config.globalProperties.nameFont}', monospace`,
color: app.config.globalProperties.colorMain,
background: app.config.globalProperties.backgroundMain
};

app.config.globalProperties.UCButton = {
border: `0.125ex outset ${here.colorMenu}`,
background: app.config.globalProperties.backgroundMenu,
color: app.config.globalProperties.colorMenu
};

app.config.globalProperties.UCMenu = {
border: `0.125ex outset ${app.config.globalProperties.colorMenu}`,
background: app.config.globalProperties.backgroundMenu,
color: app.config.globalProperties.colorMenu
};

app.config.globalProperties.UCInputBox = {
border: `0.125ex inset ${app.config.globalProperties.colorMain}`,
background: app.config.globalProperties.backgoundMain,
color: app.config.globalProperties.colorMain
};

app.config.globalProperties.updateCSS = () => {  };

app.provide("UserColors", here);

}

};