var rects_gameover = new Array();
var text_closeconfirm ;
var but_yes ;
var but_no ;
var cursor ;

$include<rects.inc>

function Init(args) {
   strings = system.loadObject("strings.json") ;
   cursor = game.loadSprite("cursor.png") ;
   cursor.setHotSpot(0,0) ;
   
   makeRects(rects_gameover) ;

   text_closeconfirm = game.loadText("arial.ttf",strings.textcloseconfirm,22) ;
   text_closeconfirm.setColor(200,200,200) ;
   but_yes = game.loadText("arial.ttf",strings.text_yes,22) ;
   but_no = game.loadText("arial.ttf",strings.text_no,22) ;

   game.setBackgroundColor(0,100,200) ;

   return true ;
}
 
function Render() {
   var mpos = game.getMousePos() ;

   renderRects(rects_gameover,250,220,300,160) ;
   text_closeconfirm.printTo(320,250) ;

   if (but_yes.isPointIn(mpos.x,mpos.y)) but_yes.setColor(255,255,255) ; else but_yes.setColor(180,180,180) ;
   but_yes.printTo(340,310) ;
   if (but_no.isPointIn(mpos.x,mpos.y)) but_no.setColor(255,255,255) ; else but_no.setColor(180,180,180) ;
   but_no.printTo(420,310) ;

   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isKeyDown(KEY_ESCAPE)) game.goToScript("anyname",null) ;      

   var mpos = game.getMousePos() ;
   if (game.isLeftButtonClicked()) {
     if (but_yes.isPointIn(mpos.x,mpos.y)) return false ;
     if (but_no.isPointIn(mpos.x,mpos.y)) game.goToScript("anyname",null) ;
   }
   return true ;
}
