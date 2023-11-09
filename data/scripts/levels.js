var back ;
var logo ;
var langico ;
var strings ;
var title ;
var rects_menu = new Array();
var menu = new Array() ;
var cursor ;
var profile ;

$include<rects.inc>
$include<consts.inc>
$include<profile.inc>

function Init() {    
   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   cursor = game.loadSprite("cursor.png") ;
   cursor.setHotSpot(0,0) ;

   strings = system.loadObject("strings.json") ;  

   title = game.loadText("Celestia Redux Fixed.ttf",strings.gametitle,60) ;
   title.setColor(220,220,220) ;
   title.setAlignCenter() ;

   game.setBackgroundColor(0,100,200) ;

   makeRects(rects_menu) ;

   profile = loadProfile() ;

   for (var i=0; i<LEVEL_COUNT; i++)
     menu.push(game.loadText("arial.ttf",strings.levelhead+" "+(i+1),20)) ;

   return true ;
}

function getSelMenuIdx() {
   var mpos = game.getMousePos() ;
   for (var i=0; i<menu.length; i++) 
     if ((mpos.x>340)&&(mpos.y>150+i*36)&&(mpos.y<150+i*36+32)) 
       return i ;
   return -1 ;  
}

function Render() {
   back.renderTo(0,182) ;

   title.printTo(400,40) ;

   renderRects(rects_menu,250,130,320,390) ;

   var selidx = getSelMenuIdx() ;
   for (var i=0; i<menu.length; i++) {
     if (i>profile.nextlevel) menu[i].setColor(100,100,100) ; else {
       if (i==selidx) menu[i].setColor(255,255,255) ; else menu[i].setColor(180,180,180) ;
     }
     menu[i].printTo(340,150+i*36) ;
   }

   var mpos = game.getMousePos() ;
   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isKeyDown(KEY_ESCAPE)) game.goToScript("menu",null) ;

   var selmenu = getSelMenuIdx() ;

   if (game.isLeftButtonClicked()) 
     if ((selmenu!=-1)&&(selmenu<=profile.nextlevel))
       game.goToScript("game",{level:selmenu}) ;

   return true ;
}