var back ;
var castle ;
var twily ;
var twily_wait ;
var rainbow ;
var flatter ;
var aj ;
var pinkie ;
var rarity ;
var coin ;
var coin_ico ;
var diamond ;
var diamond_ico ;
var monsterico ;
var castleico ;
var stone ;
var fire ;
var strings ;

var snd_laser ;
var snd_galop ;
var snd_stone ;
var snd_money ;

var laser ;
var mnear ;

var labmoney ;
var labdiamond ;
var labmonsterleft ;
var labcastle ;
var labgameover ;

var linemonsterhealthgreen ;
var linemonsterhealthred ;
var linemonsterhealthyellow ;

var textcost ;

var monster = new Array() ;
var monstertypes = new Array() ;
var stones = new Array() ;

var rdpos ;
var flatterpos ;
var money ;
var money_d ;
var monsterleft ;
var castlehealth ;
var ajhealth ;
var ajpos ;
var stone_ok ;
var balance ;

var twilytime ;
var raritytime ;
var flattertime ;
var pinkietime ;

var ajcalled ;
var rdcalled ;
var nextmonster ;
var nextmoney ;

var monsters = new Array() ;
var gameover ;
var iswin ;
var mindt ;
var maxdt ;

var rects_gameover = new Array();
var text_closeconfirm ;
var but_yes ;
var but_no ;
var but_restart ;
var but_continue ;
var but_menu ;
var circle ;
var circle_gray ;

var ispause ;

$include<rects.inc>
$include<funcs.inc>

const STONE_COUNT = 5 ;

var but_calls = new Array() ;

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createButton(filename) {
   var but = game.loadSprite(filename) ;
   but.setScale(60) ;   
   return but ;
}

function createFrameArray(dirname,count) {
   var frames = new Array() ;
   for (var i=0; i<count; i++)
     frames[i]=dirname+"/"+i+".gif" ;
   return frames ;
}

function setNextMonster() {
  var min = balance.monsterspawnmin ;
  var max = balance.monsterspawnmax ;
  // Это плотность волн, нужно их в конфиг баланс перенести
  if (monsterleft<0.33*balance.initmonsters) { min/=4 ; max/=4 ; } else 
  if (monsterleft<0.66*balance.initmonsters) { min/=2 ; max/=2 ; }  
  nextmonster = getRandomInt(min,max) ;
}

function getNearMonsterIdx() {
	var mnear = 999 ;
	var idx = -1;
	 for (var i=0; i<monsters.length; i++)
		 if (monsters[i].x<750) {			 
			 if (monsters[i].x<mnear) {
				 mnear=monsters[i].x ;
				 idx=i ;
			 }
		 }    
	return idx ;
}

function drawInd(ind,x,proc) {
	for (var i=0; i<5; i++)
		ind.drawTo(x-30,580+i,x-30+60*proc,580+i) ;
}

function getAttackMul() {
	if (pinkietime>0) return balance.pinkiemulattack ; else return 1 ;
}

function isUnderFire() {
	return castlehealth/balance.castlehealth<0.5 ;
}

function Init() {

   strings = system.loadObject("strings.json") ;

   balance = system.loadObject("scripts/balance.json") ;

   makeRects(rects_gameover) ;

   text_closeconfirm = game.loadText("arial.ttf",strings.textexitconfirm,22) ;
   text_closeconfirm.setColor(200,200,200) ;
   but_yes = game.loadText("arial.ttf",strings.text_yes,22) ;
   but_no = game.loadText("arial.ttf",strings.text_no,22) ;
   but_restart = game.loadText("arial.ttf",strings.text_restart,22) ;
   but_continue = game.loadText("arial.ttf",strings.text_continue,22) ;
   but_menu = game.loadText("arial.ttf",strings.text_menu,22) ;

   circle = game.loadSprite('circle.png') ;
   circle_gray = game.loadSprite('circle_gray.png') ;

   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   castle = game.loadSprite('castle.png') ;
   castle.setHotSpot(0,0) ;
   stone = game.loadSprite('stone.png') ;
   fire = game.loadAnimation('fire.png',100,100,15,15) ;
   fire.play() ;

   coin = game.loadSprite('coin.png') ;
   coin_ico = game.loadSprite('coin.png') ;
   coin_ico.setScale(50) ;

   diamond = game.loadSprite('diamond.png') ;
   diamond_ico = game.loadSprite('diamond.png') ;
   diamond_ico.setScale(50) ;

   monsterico = game.loadSprite('monster_ico.png') ;
   castleico = game.loadSprite('castle_ico.png') ;
   but_calls.push({ but : createButton('icons/applejack_ico.png'),
                    but_gray : createButton('icons/applejack_ico.png'), 
                    cost : balance.ajcost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/pinki_ico.png'),
                    but_gray : createButton('icons/pinki_ico.png'),
                    cost : balance.pinkiecost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/rarity_ico.png'),
                    but_gray : createButton('icons/rarity_ico.png'),
                    cost : balance.raritycost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/flatter_ico.png'),
                    but_gray : createButton('icons/flatter_ico.png'),
                    cost : balance.flattercost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/rainbow_ico.png'),
                    but_gray : createButton('icons/rainbow_ico.png'),
                    cost : balance.rainbowcost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/twily_ico.png'),
                    but_gray : createButton('icons/twily_ico.png'),
                    cost : balance.twilycost, cost_d : 0 }) ;
   but_calls.push({ but : createButton('icons/cadence_ico.png'),
                    but_gray : createButton('icons/cadence_ico.png'),
                    cost : 0, cost_d : 5 }) ;
   but_calls.push({ but : createButton('icons/luna_ico.png'),
                    but_gray : createButton('icons/luna_ico.png'),
                    cost : 0, cost_d : 10 }) ;
   but_calls.push({ but : createButton('icons/cadence_ico.png'),
                    but_gray : createButton('icons/celestia_ico.png'),
                    cost : 0, cost_d : 25 }) ;

   for (var i=0; i<but_calls.length; i++) 
     but_calls[i].but_gray.convertPixels("funcGray") ;

   laser = game.createLine(255,0,255) ;

   linemonsterhealthgreen = game.createLine(0,255,0) ;
   linemonsterhealthred = game.createLine(255,0,0) ;
   linemonsterhealthyellow = game.createLine(255,255,0) ;

   twily_wait = game.loadSprite('twily/0.gif') ;
 
   snd_laser = game.loadSound('laser.ogg') ;
   snd_laser.setLoop(true) ;
 
   snd_galop = game.loadSound('galop.ogg') ;
   snd_galop.setLoop(true) ; 
   
   snd_money = game.loadSound('money.ogg') ;
   
   snd_stone = new Array() ;
   for (var i=1; i<=STONE_COUNT; i++)
		snd_stone.push(game.loadSound('stone.ogg')) ;
	
   snd_stone.push(game.loadSound('stone.ogg')) ;
   snd_stone.push(game.loadSound('stone.ogg')) ;
   snd_stone.push(game.loadSound('stone.ogg')) ;
   snd_stone.push(game.loadSound('stone.ogg')) ;
   snd_stone.push(game.loadSound('stone.ogg')) ;
    
   var frames = new Array() ;
   for (var i=7; i<11; i++)
     frames.push("twily/"+i+".gif") ;

   twily = game.loadAnimationFromFiles(frames,10) ;
   twily.play() ;
   
   rainbow = game.loadAnimationFromFiles(createFrameArray("rainbow",90),30) ;
   rainbow.play() ;

   pinkie = game.loadAnimationFromFiles(createFrameArray("pinkie",20),15) ;
   pinkie.play() ;

   flatter = game.loadAnimationFromFiles(createFrameArray("flatter",12),12) ;
   flatter.play() ;

   aj = game.loadAnimationFromFiles(createFrameArray("aj",20),10) ;
   aj.play() ;

   rarity = game.loadAnimationFromFiles(createFrameArray("rarity",19),19) ;
   rarity.play() ;

   monster.push(game.loadAnimationFromFiles(createFrameArray("monsters/m1",25),10)) ;
   monster.push(game.loadAnimationFromFiles(createFrameArray("monsters/m2",8),8)) ;
   monster.push(game.loadAnimationFromFiles(createFrameArray("monsters/m3",8),8)) ;
   
   for (var i=0; i<monster.length; i++) {
     monster[i].setHotSpot(monster[i].getWidth()/2,monster[i].getHeight()) ;
     monster[i].play() ;
   }
   
   monstertypes.push(system.loadObject("scripts/monstertype1.json")) ;
   monstertypes.push(system.loadObject("scripts/monstertype2.json")) ;
   monstertypes.push(system.loadObject("scripts/monstertype3.json")) ;
      
   labdiamond = game.loadText("Arial.ttf","",20) ;
   labdiamond.setColor(255,255,255) ;
   labdiamond.setAlignCenter() ;
   labmoney = game.loadText("Arial.ttf","",20) ;
   labmoney.setColor(255,255,255) ;
   labmoney.setAlignCenter() ;
   labmonsterleft = game.loadText("Arial.ttf","",20) ;
   labmonsterleft.setColor(255,255,255) ;
   labmonsterleft.setAlignCenter() ;
   labcastle = game.loadText("Arial.ttf","",20) ;
   labcastle.setColor(0,255,0) ;
   labcastle.setAlignCenter() ;
   labgameover = game.loadText("Arial.ttf","",22) ;
   labgameover.setColor(255,255,255) ;
   labgameover.setAlignCenter() ;

   textcost = game.loadText("Arial.ttf","",16) ;
   textcost.setColor(255,255,255) ;

   game.setBackgroundColor(0,100,200) ;
     
   flatterpos=200 ;

   money=balance.initmoney ;
   money_d=0 ;
   monsterleft=balance.initmonsters ;
   castlehealth=balance.castlehealth ;
  
   twilytime=-1 ;
   ajcalled=false ;
   rdcalled=false ;
   raritytime=-1 ;
   flattertime=-1 ;
   pinkietime=-1 ;

	gameover=false ;
	iswin=false ;

   setNextMonster() ;
   nextmoney = 1.0 ;
   
   mindt=999 ;
   maxdt=0 ;

   ispause = false ;

   return true ;
}
 
function Render() {
	var mp = game.getMousePos() ;   
	
   back.renderTo(0,182) ;
   diamond.renderTo(600,30) ;
   coin.renderTo(650,30) ;
   monsterico.renderTo(700,30) ;
   castleico.renderTo(750,30) ;
      
   for (var i=0; i<but_calls.length; i++) {
     if ((but_calls[i].cost<=money)&&(but_calls[i].cost_d<=money_d)) {
     circle.renderTo(40+i*60,40) ;
     if (but_calls[i].but.isPointIn(mp.x,mp.y))
       but_calls[i].but.setColor(255,255,255) ; 
     else 
       but_calls[i].but.setColor(200,200,200) ;
     but_calls[i].but.renderTo(40+i*60,40) ;
     }
     else {
     circle_gray.renderTo(40+i*60,40) ;
     but_calls[i].but_gray.renderTo(40+i*60,40) ;
     }

     if (but_calls[i].cost>0) {
        coin_ico.renderTo(20+i*60,90) ;
        textcost.setText(but_calls[i].cost) ;
        textcost.printTo(30+i*60,80) ;
     }
     else
     if (but_calls[i].cost_d>0) {
        diamond_ico.renderTo(30+i*60,90) ;
        textcost.setText(but_calls[i].cost_d) ;
        textcost.printTo(40+i*60,80) ;
     }

   }
   
   if (twilytime>0) {	  
     if (getNearMonsterIdx()!=-1) 
       twily.renderTo(210,400) ;            
     else 
       twily_wait.renderTo(210,400) ;
   }
   
   if (raritytime>0) rarity.renderTo(90,377) ;
   
   if (flattertime>0) flatter.renderTo(flatterpos,180) ;
   
   castle.renderTo(-60,310) ;
   if (isUnderFire()) fire.renderTo(95,543) ;
	   
   if (pinkietime>0) pinkie.renderTo(156,310) ;
   
   if (rdcalled) rainbow.renderTo(rdpos,230) ;
   
   
	for (var i=0; i<monsters.length; i++) {
		var teksprite = monster[monsters[i].mtype] ;
     teksprite.renderTo(monsters[i].x,575) ;
	 var proc = monsters[i].health/monsters[i].maxhealth ;	 
	 if (proc<0.33) drawInd(linemonsterhealthred,monsters[i].x,proc) ; else
	 if (proc<0.66) drawInd(linemonsterhealthyellow,monsters[i].x,proc) ; else
	 drawInd(linemonsterhealthgreen,monsters[i].x,proc) ;
   }

	if (ajcalled) {
      aj.renderTo(ajpos,550) ;
	  
	  var proc = ajhealth/balance.ajhealth ;	 
	 if (proc<0.33) drawInd(linemonsterhealthred,ajpos,proc) ; else
	 if (proc<0.66) drawInd(linemonsterhealthyellow,ajpos,proc) ; else
	 drawInd(linemonsterhealthgreen,ajpos,proc) ;
//   
	}

   
// laser only
	if (twilytime>0) {
		var idx = getNearMonsterIdx() ;
		if (idx!=-1) 
			for (var dx=-1; dx<=1; dx++)
				for (var dy=-1; dy<=1; dy++)
					laser.drawTo(240,372,monsters[idx].x+dx,550+dy) ;     
	}

   labdiamond.setText(Math.round(money_d)) ;
   labdiamond.printTo(600,60) ;
   labmoney.setText(Math.round(money)) ;   
   labmoney.printTo(650,60) ;
   labmonsterleft.setText(monsterleft+monsters.length) ;
   labmonsterleft.printTo(700,60) ;
   labcastle.setText(Math.round(100*castlehealth/balance.castlehealth)+"%") ;
   if (castlehealth/balance.castlehealth<0.33) labcastle.setColor(255,0,0) ; else
     if (castlehealth/balance.castlehealth<0.66) labcastle.setColor(255,255,0) ; else
       labcastle.setColor(0,255,0) ; 
   labcastle.printTo(750,60) ;
   
    for (var i=0; i<stones.length; i++) 
     stone.renderTo(stones[i].x,stones[i].y) ;
   
	if (gameover) {
                renderRects(rects_gameover,250,220,300,160) ;
		if (iswin) {			
			labgameover.setText(strings.textwin) ;
			labgameover.setColor(40,200,40) ;
   if (but_continue.isPointIn(mp.x,mp.y)) but_continue.setColor(255,255,255) ; else but_continue.setColor(180,180,180) ;
   but_continue.printTo(310,310) ;
		}
		else {
			labgameover.setText(strings.textfail) ;
			labgameover.setColor(200,40,40) ;
   if (but_restart.isPointIn(mp.x,mp.y)) but_restart.setColor(255,255,255) ; else but_restart.setColor(180,180,180) ;
   but_restart.printTo(310,310) ;
		}
		labgameover.printTo(400,260) ;	
   if (but_menu.isPointIn(mp.x,mp.y)) but_menu.setColor(255,255,255) ; else but_menu.setColor(180,180,180) ;
   but_menu.printTo(430,310) ;

	}

	
   if (ispause) {
   renderRects(rects_gameover,250,220,300,160) ;
   text_closeconfirm.printTo(320,250) ;

   if (but_yes.isPointIn(mp.x,mp.y)) but_yes.setColor(255,255,255) ; else but_yes.setColor(180,180,180) ;
   but_yes.printTo(340,310) ;
   if (but_no.isPointIn(mp.x,mp.y)) but_no.setColor(255,255,255) ; else but_no.setColor(180,180,180) ;
   but_no.printTo(420,310) ;
   }

   return true ;
}

function Frame(dt) {
   var mpos = game.getMousePos() ;

	if (gameover) {
   if (game.isKeyDown(KEY_ESCAPE)) game.goToScript("menu",null) ;      

   if (game.isLeftButtonClicked()) {
     if (iswin) {
       if (but_continue.isPointIn(mpos.x,mpos.y)) game.goToScript("game",null) ;
     }
     else {
       if (but_restart.isPointIn(mpos.x,mpos.y)) game.goToScript("game",null) ;
     }
     if (but_menu.isPointIn(mpos.x,mpos.y)) game.goToScript("menu",null) ;
   }
 	   return true ;
	}
	
	if (mindt>dt) mindt=dt ;
	if (maxdt<dt) maxdt=dt ;

	if (ispause) {
   if (game.isKeyDown(KEY_ESCAPE)) ispause=false ;      

   if (game.isLeftButtonClicked()) {
     if (but_yes.isPointIn(mpos.x,mpos.y)) game.goToScript("menu",null) ;      
     if (but_no.isPointIn(mpos.x,mpos.y)) ispause=false ;
   }
 	   return true ;
	}

   nextmoney-=dt ;
   if (nextmoney<=0.0) {
     money+=balance.moneyinc ;
     nextmoney=1.0 ;
   }

   // victory
   if ((monsterleft==0)&&(monsters.length==0)) {
	   gameover=true ;
	   iswin=true ;
	   return true ;
   }	   

	// twily effects
   if (twilytime>0) {
	   twilytime-=dt ;
	   
	   var idx = getNearMonsterIdx() ;
	   if (idx!=-1) {
		   monsters[idx].health-=getAttackMul()*balance.twilyattack*dt ;
		   if (!snd_laser.isPlayed()) snd_laser.play() ;
	   }
	   else 
		   if (snd_laser.isPlayed()) snd_laser.stop() ;
	   
	   if (twilytime<=0) {
		   twilytime=-1 ;
		   snd_laser.stop() ;
	   }
   }
   
   // rarity effects
   if (raritytime>0) {
	   raritytime-=dt ;	   
	   if (raritytime<=0) { 
	     money+=balance.rarityret ;
	     raritytime=-1 ;
		 snd_money.play() ;
	   }
   }

   // flatter effects
   if (flattertime>0) {
	   flattertime-=dt ;	   	   
   }
   
   // pinkie effects
   if (pinkietime>0) {
	   pinkietime-=dt ;		   
   }
   
   // rd effects 
   if (rdcalled) {
	   rdpos+=balance.rdspeed*dt ;
	   for (var i=1; i<=STONE_COUNT ;i++)
	     if ((rdpos>50+i*100)&&(stone_ok<i)) {
			 stones.push({x: 50+i*100, y: 250, v:0 }) ;
			 stone_ok++ ;
			 snd_stone[i].play() ;
		 }
	   if (rdpos>800) rdcalled=false ;	   	   
   }
      
	// stones
	for (var i=0; i<stones.length; i++) {
		stones[i].y+=stones[i].v*dt ;
		stones[i].x+=balance.rdspeed*dt ;
		stones[i].v+=400*dt ;		
	}
	
	var i=0 ;
   while (i<stones.length) {
	   if (stones[i].y>=570) {
		   for (var j=0; j<monsters.length; j++)
			   if (Math.abs(monsters[j].x-stones[i].x)<2*stone.getWidth()) 
				   monsters[j].health-=getAttackMul()*balance.stoneattack ;
			stones.splice(i,1) ;		   
	   }
	   else
		   i++ ;
   }   
	  
   // monster spawn
   nextmonster-=dt ;
   if (nextmonster<=0) 
	  if (monsterleft>0) { 
        monsterleft-- ;
        setNextMonster() ;
        var midx = getRandomInt(0,2) ;
        monsters.push({ x: 800, mtype: midx, speed: monstertypes[midx].speed,
		   attack: monstertypes[midx].attack, health: monstertypes[midx].health, 
		   maxhealth: monstertypes[midx].health }) ;      
	  }
   
   // monster processing
   var ajused=false ;
   for (var i=0; i<monsters.length; i++) {
	   var mstop = false ;
	   if (monsters[i].x<=200) {
		   castlehealth-=monsters[i].attack*dt ;
		   mstop=true ;		      
	   }
	   
	   if (ajcalled) {
			if (ajpos+aj.getWidth()>=monsters[i].x) {
				mstop=true ;
				monsters[i].health-=getAttackMul()*balance.ajattack*dt ;
				ajhealth-=monsters[i].attack*dt ;
				ajused=true ;
			}
	   }
			
	   if (flattertime>0) {			
	     monsters[i].x+=0.5*monsters[i].speed*dt ;
	   }
	   else {
	     if (!mstop) monsters[i].x-=monsters[i].speed*dt ;
	   }
   }

   // monster removing
   var i=0 ;
   while (i<monsters.length) {
	   if (monsters[i].health<=0) {
		   monsters.splice(i,1) ;
		   money_d++ ;
	   }
	   else
		   i++ ;
   }   

   // fire processing
   if (isUnderFire())
	   castlehealth-=1*dt ;
	// fail
	if (castlehealth<=0) {
	   gameover=true ;
	   iswin=false ;
	   return true ;
	}  
		   

   // aj effects (after monster!)
   if (ajcalled) {
	   if (!ajused) ajpos+=balance.ajspeed*dt ;
	   if ((ajpos>800)||(ajhealth<=0)) {
		   ajcalled=false ;	   
		   snd_galop.stop() ;
	   }
   }
   
   if (game.isLeftButtonClicked()) {
   var call_idx = -1 ;
   for (var i=0; i<but_calls.length; i++) 
     if (but_calls[i].but.isPointIn(mpos.x,mpos.y)) 
       call_idx=i ;

   // twily call
   if (call_idx==5) { 
      if ((twilytime<=0)&&(money>=balance.twilycost)) {
        twilytime=balance.twilywork ;
        money-=balance.twilycost ;	
      }
   }
   
   // rarity call
   if (call_idx==2) { 
      if ((raritytime<=0)&&(money>=balance.raritycost)) {
        raritytime=balance.raritywork ;
        money-=balance.raritycost ;
      }
   }
   
   // flatter call
   if (call_idx==3) { 
      if ((flattertime<=0)&&(money>=balance.flattercost)) {
        flattertime=balance.flatterwork ;
        money-=balance.flattercost ;
      }
   }

   // pinkie call
   if (call_idx==1) { 
      if ((pinkietime<=0)&&(money>=balance.pinkiecost)) {
        pinkietime=balance.pinkiework ;
        money-=balance.pinkiecost ;
      }
   }

   // aj call
   if (call_idx==0) { 
      if ((!ajcalled)&&(money>=balance.ajcost)) {
        ajcalled=true ;
		ajpos=100 ;
		ajhealth=balance.ajhealth ; 
        money-=balance.ajcost ;		
		snd_galop.play() ;
      }
   }
   
   // rd call
   if (call_idx==4) { 
      if ((!rdcalled)&&(money>=balance.rainbowcost)) {
        rdcalled=true ;
		stone_ok=0 ;
		rdpos=-rainbow.getWidth() ;		
        money-=balance.rainbowcost ;
      }
   }
   }
      
   if (game.isKeyDown(KEY_ESCAPE)) { 
     ispause=true ;
   }
   return true ;
}

