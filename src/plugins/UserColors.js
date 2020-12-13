import { getCurrentInstance } from "vue";

const here = getCurrentInstance();
var s = "";

export default {

name: "UserColors",

install: (app) => {

  app.config.globalProperties.LoadStyles = () => {
    app.config.globalProperties.colorMain = ( localStorage.getItem("colorMain") ? localStorage.getItem("colorMain") : "#0f0" );
    app.config.globalProperties.backgroundMain = ( localStorage.getItem("backgroundMain") ? localStorage.getItem("backgroundMain") : "#000" );
    app.config.globalProperties.colorMenu = ( localStorage.getItem("colorMenu") ? localStorage.getItem("colorMenu") : "#00f" );
    app.config.globalProperties.backgroundMenu = ( localStorage.getItem("backgroundMenu") ? localStorage.getItem("backgroundMenu") : "#337" );
    app.config.globalProperties.colorError = ( localStorage.getItem("colorError") ? localStorage.getItem("colorError") : "#f00" );
    app.config.globalProperties.backgroundError = ( localStorage.getItem("backgroundError") ? localStorage.getItem("backgroundError") : "#733" );
    app.config.globalProperties.pxFont = ( localStorage.getItem("pxFont") ? localStorage.getItem("pxFont") : 12 );
    app.config.globalProperties.nameFont = ( localStorage.getItem("nameFont") ? localStorage.getItem("nameFont") : "monospace" );
    app.config.globalProperties.UCStyle = ( localStorage.getItem("UCStyle") ? localStorage.getItem("UCStyle") : {
      font: `${app.config.globalProperties.pxFont}px '${app.config.globalProperties.nameFont}', monospace`, color: app.config.globalProperties.colorMain, background: app.config.globalProperties.backgroundMain
      } );
    app.config.globalProperties.UCButton = ( localStorage.getItem("UCButton") ? localStorage.getItem("UCButton") : {
      border: `0.125em outset ${app.config.globalProperties.colorMenu}`, background: app.config.globalProperties.backgroundMenu, color: app.config.globalProperties.colorMenu
      } );
    app.config.globalProperties.UCMenu = ( localStorage.getItem("UCMenu") ? localStorage.getItem("UCMenu") : {
      border: `0.125em outset ${app.config.globalProperties.colorMenu}`, background: app.config.globalProperties.backgroundMenu, color: app.config.globalProperties.colorMenu
      } );
    app.config.globalProperties.UCInputBox = ( localStorage.getItem("UCInputBox") ? localStorage.getItem("UCInputBox") : {
      border: `0.125em inset ${app.config.globalProperties.colorMain}`, background: app.config.globalProperties.backgroundMain, color: app.config.globalProperties.colorMain
      } );
    };

  app.config.globalProperties.SaveStyles = () => {
    localStorage.setItem("colorMain", ( app.config.globalProperties.colorMain ? app.config.globalProperties.colorMain : "#0f0" ) );
    localStorage.setItem("backgroundMain", ( app.config.globalProperties.backgroundMain ? app.config.globalProperties.backgroundMain : "#000" ) );
    localStorage.setItem("colorMenu", ( app.config.globalProperties.colorMenu ? app.config.globalProperties.colorMenu : "#00f" ) );
    localStorage.setItem("backgroundMenu", ( app.config.globalProperties.backgroundMenu ? app.config.globalProperties.backgroundMenu : "#337" ) );
    localStorage.setItem("colorError", ( app.config.globalProperties.colorError ? app.config.globalProperties.colorError : "#f00" ) );
    localStorage.setItem("backgroundError", ( app.config.globalProperties.backgroundError ? app.config.globalProperties.backgroundError : "#733" ) );
    localStorage.setItem("pxFont", ( app.config.globalProperties.pxFont ? app.config.globalProperties.pxFont : 12 ) );
    localStorage.setItem("nameFont", ( app.config.globalProperties.nameFont ? app.config.globalProperties.nameFont : "monospace" ) );
    localStorage.setItem("UCStyle", { 
      font: `${app.config.globalProperties.pxFont}px '${app.config.globalProperties.nameFont}', monospace`, color: app.config.globalProperties.colorMain, background: app.config.globalProperties.backgroundMain
      });
    localStorage.setItem("UCButton", {
      border: `0.125em outset ${app.config.globalProperties.colorMenu}`, background: app.config.globalProperties.backgroundMenu, color: app.config.globalProperties.colorMenu
      });
    localStorage.setItem("UCMenu", {
      border: `0.125em outset ${app.config.globalProperties.colorMenu}`, background: app.config.globalProperties.backgroundMenu, color: app.config.globalProperties.colorMenu
      });
    localStorage.setItem("UCInputBox", {
      border: `0.125em inset ${app.config.globalProperties.colorMain}`, background: app.config.globalProperties.backgroundMain, color: app.config.globalProperties.colorMain
      });
    };

  app.config.globalProperties.LoadStyles();
  app.provide("UserColors", here);
  },

};