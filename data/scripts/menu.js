var back ;
var logo ;
var langico ;
var strings ;
var rects_menu = new Array();
var menu = new Array() ;

const MENU_START = 0 ;
const MENU_DIFFICULT = 1 ;
const MENU_LANG = 2 ;
const MENU_SOUND = 3 ;
const MENU_HELP = 4 ;
const MENU_ABOUT = 5 ;
const MENU_EXIT = 6 ;

$include<rects.inc>

function getDiffucultText(code) {
   if (code==0) return strings.text_easy ;
   if (code==1) return strings.text_medi ;
   if (code==2) return strings.text_hard ;
   return "?" ;
}

function loadLangResources() {

   strings = system.loadObject("strings.json") ;
   game.setGameTitle(strings.gametitle) ;

   langico = game.loadSprite('lang.png') ;

   menu = [] ;
   menu.push(game.loadText("arial.ttf",strings.menustart,20)) ;
   menu.push(game.loadText("arial.ttf",strings.menudiff+": "+getDiffucultText(system.getDifficult()),20)) ;
   menu.push(game.loadText("arial.ttf",strings.menulang+": "+system.getCurrentLanguage().toUpperCase(),20)) ;
   menu.push(game.loadText("arial.ttf",strings.menusound+": "+(system.isSoundOn()?strings.text_on:strings.text_off),20)) ;
   menu.push(game.loadText("arial.ttf",strings.menuhelp,20)) ;
   menu.push(game.loadText("arial.ttf",strings.menuabout,20)) ;
   menu.push(game.loadText("arial.ttf",strings.menuexit,20)) ;
}

function getSelMenuIdx() {
   var mpos = game.getMousePos() ;
   for (var i=0; i<menu.length; i++) 
     if ((mpos.x>340)&&(mpos.y>200+i*32)&&(mpos.y<200+i*32+32)) 
       return i ;
   return -1 ;  
}

function Init() {    
   loadLangResources() ;
   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;

   game.setBackgroundColor(0,100,200) ;

   makeRects(rects_menu) ;

   return true ;
}

function Render() {
   back.renderTo(0,182) ;

   renderRects(rects_menu,250,160,320,330) ;

   var selidx = getSelMenuIdx() ;
   for (var i=0; i<menu.length; i++) {
     if (i==selidx) menu[i].setColor(255,255,255) ; else menu[i].setColor(150,150,150) ;
     menu[i].printTo(340,200+i*32) ;
   }
   langico.renderTo(340+menu[MENU_LANG].getTextWidth()+30,200+MENU_LANG*32+12) ;

   return true ;
}

function Frame(dt) {

   var selmenu = getSelMenuIdx() ;

   if (game.isLeftButtonClicked()) {
      if (selmenu==MENU_START) game.goToScript("game",null) ;
      if (selmenu==MENU_DIFFICULT) {
        system.switchDifficult() ;
        menu[MENU_DIFFICULT].setText(strings.menudiff+": "+getDiffucultText(system.getDifficult()),20) ;
      }
      if (selmenu==MENU_LANG) {
        system.switchCurrentLanguage() ;
        loadLangResources() ;
      }
      if (selmenu==MENU_SOUND) { 
        system.setSoundOn(!system.isSoundOn()) ;
        menu[MENU_SOUND].setText(strings.menusound+": "+(system.isSoundOn()?strings.text_on:strings.text_off)) ;
      }
      if (selmenu==MENU_HELP) game.goToScript("help",null) ;
      if (selmenu==MENU_ABOUT) game.goToScript("about",null) ;
      if (selmenu==MENU_EXIT) return false ;
   }

   return true ;
}