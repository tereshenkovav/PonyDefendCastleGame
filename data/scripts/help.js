var back ;
var strings ;
var text_help ;
var text_title ;
var rects_help = new Array();
var cursor ;

$include<rects.inc>

function Init() {    

   strings = system.loadObject("strings.json") ;
   game.setBackgroundColor(0,100,200) ;
   
   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   cursor = game.loadSprite("cursor.png") ;
   cursor.setHotSpot(0,0) ;

   text_help = game.loadText("arial.ttf",strings.help_text,18) ;
   text_help.setColor(200,200,200) ;

   text_title = game.loadText("arial.ttf",strings.help_title,24) ;
   text_title.setColor(200,200,200) ;
   text_title.setAlignCenter() ;

   makeRects(rects_help) ;

   return true ;
}

function Render() {
   back.renderTo(0,182) ;

   renderRects(rects_help,50,50,700,500) ;

   text_title.printTo(400,80) ;
   text_help.printTo(100,140) ;

   var mpos = game.getMousePos() ;
   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isOneOfKeysDown([KEY_ESCAPE,KEY_SPACE,KEY_ENTER])) game.goToScript("menu",null) ;
   if (game.isLeftButtonClicked()) game.goToScript("menu",null) ;

   return true ;
}