var back ;
var strings ;
var text_about ;
var text_title ;
var text_ver ;
var rects_help = new Array();
var credits_str ;
var ver_str ;
var cursor ;

$include<rects.inc>

function Init() {    

   strings = system.loadObject("strings.json") ;
   game.setBackgroundColor(0,100,200) ;
   
   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   cursor = game.loadSprite("cursor.png") ;
   cursor.setHotSpot(0,0) ;

   text_about = game.loadText("arial.ttf","",20) ;
   text_about.setColor(200,200,200) ;

   text_title = game.loadText("arial.ttf","",24) ;
   text_title.setColor(200,200,200) ;
   text_title.setAlignCenter() ;

   text_ver = game.loadText("arial.ttf","",20) ;
   text_ver.setColor(160,160,160) ;
   text_ver.setAlignCenter() ;

   rline = game.createRect(120,120,120) ;

   makeRects(rects_help) ;

   credits_str = "" ;
   var credits = system.loadObject("credits.json") ;
   if (credits!=null)
     for (var i=0; i<credits.length; i++)
       credits_str+=(credits[i]+"\n") ;

   ver_str = "" ;
   var version = system.loadObject("version.json") ;
   if (version!=null) {
      ver_str=strings.about_version.replace("{0}",version.tag) ;
      ver_str=ver_str.replace("{1}",version.commit) ;
      ver_str=ver_str.replace("{2}",version.branch) ;
   }

   return true ;
}

function Render() {
   back.renderTo(0,182) ;

   renderRects(rects_help,50,50,700,500) ;

   text_title.setText(strings.about_title) ;
   text_title.printTo(400,100) ;
   text_ver.setText(ver_str) ;
   text_ver.printTo(400,130) ;
   text_about.setText(strings.about_info) ;
   text_about.printTo(100,180) ;
   text_title.setText(strings.about_credits) ;
   text_title.printTo(400,280) ;
   text_about.setText(credits_str) ;
   text_about.printTo(100,330) ;

   var mpos = game.getMousePos() ;
   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isOneOfKeysDown([KEY_ESCAPE,KEY_SPACE,KEY_ENTER])) game.goToScript("menu",null) ;
   if (game.isLeftButtonClicked()) game.goToScript("menu",null) ;

   return true ;
}