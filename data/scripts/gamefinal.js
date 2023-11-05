var back ;
var strings ;
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

   text_title = game.loadText("arial.ttf","",32) ;
   text_title.setColor(50,200,50) ;
   text_title.setAlignCenter() ;

   makeRects(rects_help) ;

   return true ;
}

function Render() {
   back.renderTo(0,182) ;

   renderRects(rects_help,100,60,600,80) ;

   text_title.setText(strings.textfinal) ;
   text_title.printTo(400,80) ;

   var mpos = game.getMousePos() ;
   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isOneOfKeysDown([KEY_ESCAPE,KEY_SPACE,KEY_ENTER])) game.goToScript("menu",null) ;
   if (game.isLeftButtonClicked()) game.goToScript("menu",null) ;

   return true ;
}