export default {

name: "UserColors",

install: (app, here) => {

here.getStyles = () => {
var s = "";
s = localStorage.getItem("colorMain");
here.colorMain = s ? s : "#fff";
s = localStorage.getItem("backgroundMain");
here.backgroundMain = s ? s : "#000";
s = localStorage.getItem("colorMenu");
here.colorMenu = s ? s : "#777";
s = localStorage.getItem("backgroundMenu");
here.backgroundMenu = s ? s : "#333";
s = localStorage.getItem("colorError");
here.colorError = s ? s : "#700";
s = localStorage.getItem("backgroundError");
here.backgroundError = s ? s : "#300";
s = localStorage.getItem("pxFont");
here.pxFont = s ? s : 12;
s = localStorage.getItem("nameFont");
here.nameFont = s ? s : "monospace";

here.UCStyle = {
font: `${here.pxFont}px '${here.nameFont}', monospace`,
color: here.colorMain,
background: here.backgroundMain
};

here.UCButton = {
border: `0.125ex outset ${here.colorMenu}`,
background: here.backgroundMenu,
color: here.colorMenu
};

here.UCMenu = {
border: `0.125ex outset ${here.colorMenu}`,
background: here.backgroundMenu,
color: here.colorMenu
};

here.UCInputBox = {
border: `0.125ex inset ${here.colorMain}`,
background: here.backgroundMain,
color: here.colorMain
};
};

here.setStyles = () => {
var item;
localStorage.setItem("colorMain", here.colorMain);
localStorage.setItem("backgroundMain", here.backgroundMain);
localStorage.setItem("colorMenu", here.colorMenu);
localStorage.setItem("backgroundMenu", here.backgroundMenu);
localStorage.setItem("colorError", here.colorError);
localStorage.setItem("backgroundError", here.backgroundError);
localStorage.setItem("pxFont", here.pxFont);
localStorage.setItem("nameFont", here.nameFont);

for(item in here) {
app.config.globalProperties[item] = here[item];
}

};

here.getStyles();
here.setStyles();
app.provide("UserColors", here);

}

};