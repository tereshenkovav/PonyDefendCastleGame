var strings ;
var text ;

function loadLangResources() {

   strings = system.loadObject("strings.json") ;
   game.setGameTitle(strings.gametitle) ;
       
   text = game.loadText("arial.ttf",strings.textnext,24) ;
   text.setColor(200,200,200) ;
}

function Init() {    
   // Lang settings
   if (system.getCurrentLanguage()=="") {
     var langs = system.loadObject("languages.json") ;
     var deflang = system.loadObject("deflang.json") ;
     system.setUsedLanguages(langs) ;
     if (deflang!=null) system.setCurrentLanguage(deflang) ;
   }

   loadLangResources() ;

   system.setCloseHandlerScript("closehandler") ;
   system.showCursor(false) ;

   system.setDifficultCount(3) ;
   system.setDifficult(1) ;

   game.setBackgroundColor(0,100,200) ;
   
   return true ;
}

function Render() {
   return true ;
}

function Frame(dt) {
   game.goToScript("menu",null) ;
   return true ;
}
