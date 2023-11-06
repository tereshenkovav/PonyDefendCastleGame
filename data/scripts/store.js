var back ;
var strings ;
var text_title ;
var text_info ;
var rects_help = new Array();
var butok ;
var diamond ;
var diamond_ico ;
var text_diamond ;
var text_price ;
var cursor ;
var icons = new Array();
var profile ;
var balance ;
var heronames = [ "applejack","pinkie","rarity","flatter","rainbow","twily" ] ;

$include<rects.inc>
$include<profile.inc>

function getPrice(levelup_cost_initial,herolevel) {
  var r = levelup_cost_initial ;
  for (var i=0; i<herolevel-1; i++)
    r*=2 ;
  return r ;
}

function createButton(filename) {
   var but = game.loadSprite(filename) ;
   but.setScale(60) ;   
   return but ;
}

function Init() {    

   strings = system.loadObject("strings.json") ;
   game.setBackgroundColor(0,100,200) ;
   
   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   cursor = game.loadSprite("cursor.png") ;
   cursor.setHotSpot(0,0) ;

   butok = game.loadSprite("ok.png") ;

   text_title = game.loadText("arial.ttf",strings.menustore,24) ;
   text_title.setColor(200,200,200) ;
   text_title.setAlignCenter() ;

   text_info = game.loadText("arial.ttf",strings.menustore,16) ;
   text_info.setColor(200,200,200) ;

   text_diamond = game.loadText("arial.ttf","",22) ;
   text_diamond.setColor(200,200,200) ;

   text_price = game.loadText("arial.ttf","",14) ;
   text_price.setColor(200,200,200) ;
   text_price.setAlignCenter() ;

   icons.push(createButton('icons/applejack_ico.png')) ;
   icons.push(createButton('icons/pinki_ico.png')) ;
   icons.push(createButton('icons/rarity_ico.png')) ;
   icons.push(createButton('icons/flatter_ico.png')) ;
   icons.push(createButton('icons/rainbow_ico.png')) ;
   icons.push(createButton('icons/twily_ico.png')) ;

   diamond = game.loadSprite('diamond.png') ;
   diamond_ico = game.loadSprite('diamond.png') ;
   diamond_ico.setScale(50) ;

   makeRects(rects_help) ;

   profile = loadProfile() ;
   balance = system.loadObject("scripts/balance.json") ;

   return true ;
}

function Render() {
   var mpos = game.getMousePos() ;

   back.renderTo(0,182) ;

   renderRects(rects_help,50,50,700,500) ;

   text_title.printTo(400,70) ;

   for (var i=0; i<icons.length; i++) {
     // Switch by hero
     var herolevel=profile[heronames[i]+"_level"] ;
     var ability_0=profile[heronames[i]+"_ability_0"] ;
     var ability_1=profile[heronames[i]+"_ability_1"] ; ;

     icons[i].renderTo(100,140+70*i) ;

     // First ability

     if (ability_0) 
       butok.renderTo(160,140+70*i) ;
     else {
       diamond_ico.renderTo(160,140-10+70*i) ;
       text_price.setText(balance.abilities_0[i]) ;
       text_price.printTo(160,140+70*i) ;
     }
     text_info.setXY(180,140-10+70*i) ;
     if (ability_0) 
       text_info.setColor(200,200,200) ;
     else {
       if (text_info.isPointIn(mpos.x,mpos.y)) text_info.setColor(255,255,255) ; else text_info.setColor(150,150,150) ;
     }
     text_info.setText(strings.abilities_0[i]) ;
     text_info.print() ;

     // Second ability
     if (ability_1) 
       butok.renderTo(360,140+70*i) ;
     else {
       diamond_ico.renderTo(360,140-10+70*i) ;
       text_price.setText(balance.abilities_1[i]) ;
       text_price.printTo(360,140+70*i) ;
     }
     text_info.setXY(380,140-10+70*i) ;
     if (ability_1) 
       text_info.setColor(200,200,200) ;
     else {
       if (text_info.isPointIn(mpos.x,mpos.y)) text_info.setColor(255,255,255) ; else text_info.setColor(150,150,150) ;
     }
     text_info.setText(strings.abilities_1[i]) ;
     text_info.print() ;

     // Level up
     diamond_ico.renderTo(560,140-10+70*i) ;
     text_price.setText(getPrice(balance.levelup_cost_initial,herolevel)) ;
     text_price.printTo(560,140+70*i) ;

     text_info.setXY(580,140-10+70*i) ;
     if (text_info.isPointIn(mpos.x,mpos.y)) text_info.setColor(255,255,255) ; else text_info.setColor(150,150,150) ;
     text_info.setText(strings.text_levelup+": "+(herolevel+1)) ;
     text_info.print() ;
   }

   diamond.renderTo(660,80) ;
   text_diamond.setText(profile.money_d) ;
   text_diamond.printTo(690,70) ;
   
   cursor.renderTo(mpos.x,mpos.y) ;

   return true ;
}

function Frame(dt) {
   if (game.isOneOfKeysDown([KEY_ESCAPE])) game.goToScript("menu",null) ;
   if (game.isLeftButtonClicked()) {
   } ;

   return true ;
}