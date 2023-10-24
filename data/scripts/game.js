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
var monsterico ;
var castleico ;
var stone ;
var sfail ;
var swin ;
var fire ;
var strings ;

var snd_laser ;
var snd_galop ;
var snd_stone ;
var snd_money ;

var laser ;
var mnear ;

var labmoney ;
var labmonsterleft ;
var labcastle ;
var labgameover ;

var linemonsterhealthgreen ;
var linemonsterhealthred ;
var linemonsterhealthyellow ;

var butaj ; var buttwily ; var butpinkie ;
var butrainbow ; var butrarity ; var butflatter ;

var textcost ;

var monster = new Array() ;
var monstertypes = new Array() ;
var stones = new Array() ;

var rdpos ;
var flatterpos ;
var money ;
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

var monsters = new Array() ;
var gameover ;
var iswin ;
var mindt ;
var maxdt ;

const STONE_COUNT = 5 ;

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createButton(filename) {
   var but = game.loadSprite(filename) ;
   but.setHotSpot(0,0) ;
   but.setScale(50) ;
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

   back = game.loadSprite('back.png') ;
   back.setHotSpot(0,0) ;
   castle = game.loadSprite('castle.png') ;
   castle.setHotSpot(0,0) ;
   stone = game.loadSprite('stone.png') ;
   fire = game.loadAnimation('fire.png',100,100,15,15) ;
   fire.play() ;

   swin = game.loadSprite('win.png') ;
   swin.setAlpha(175) ;
   sfail = game.loadSprite('fail.png') ;
   sfail.setAlpha(175) ;

   coin = game.loadSprite('coin.png') ;
   monsterico = game.loadSprite('monster_ico.png') ;
   castleico = game.loadSprite('castle_ico.png') ;
   
   butaj = createButton('aj/0.gif') ;
   buttwily = createButton('twily/0.gif') ;
   butflatter = createButton('flatter/0.gif') ;
   butrainbow = createButton('rainbow/0.gif') ;
   butrarity = createButton('rarity/0.gif') ;
   butpinkie = createButton('pinkie/0.gif') ;

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
      
   labmoney = game.loadText("Arial.ttf","",20) ;
   labmoney.setColor(255,255,255) ;
   labmonsterleft = game.loadText("Arial.ttf","",20) ;
   labmonsterleft.setColor(255,255,255) ;
   labcastle = game.loadText("Arial.ttf","",20) ;
   labcastle.setColor(0,255,0) ;
   labgameover = game.loadText("Arial.ttf","",48) ;
   labgameover.setColor(255,255,255) ;

   textcost = game.loadText("Arial.ttf","",16) ;
   textcost.setColor(255,255,255) ;

   game.setBackgroundColor(0,100,200) ;
     
   flatterpos=200 ;

   balance = system.loadObject("scripts/balance.json") ;

   money=balance.initmoney ;
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
   
   mindt=999 ;
   maxdt=0 ;

   return true ;
}
 
function Render() {
	var mp = game.getMousePos() ;   
	
   back.renderTo(0,182) ;
   coin.renderTo(380,30) ;
   monsterico.renderTo(480,30) ;
   castleico.renderTo(580,30) ;
  
   butaj.renderTo(10,10) ;
   textcost.setText(balance.ajcost+"  Key:1") ;    textcost.printTo(64,15) ;
   butpinkie.renderTo(180,10) ;
   textcost.setText(balance.pinkiecost+"  Key:2") ; textcost.printTo(224,15) ;

   butrainbow.renderTo(10,50) ;
   textcost.setText(balance.rainbowcost+"  Key:3") ; textcost.printTo(64,55) ;
   butflatter.renderTo(180,50) ;
   textcost.setText(balance.flattercost+"  Key:4") ; textcost.printTo(224,55) ;

   butrarity.renderTo(10,90) ;
   textcost.setText(balance.raritycost+"  Key:5") ; textcost.printTo(64,95) ;
   buttwily.renderTo(180,90) ;
   textcost.setText(balance.twilycost+"  Key:6") ; textcost.printTo(224,95) ;
	       
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

   labmoney.setText(Math.round(money)) ;   
   labmoney.printTo(400,20) ;
   labmonsterleft.setText(monsterleft+monsters.length) ;
   labmonsterleft.printTo(500,20) ;
   labcastle.setText(Math.round(100*castlehealth/balance.castlehealth)+"%") ;
   if (castlehealth/balance.castlehealth<0.33) labcastle.setColor(255,0,0) ; else
     if (castlehealth/balance.castlehealth<0.66) labcastle.setColor(255,255,0) ; else
       labcastle.setColor(0,255,0) ; 
   labcastle.printTo(605,20) ;
   
    for (var i=0; i<stones.length; i++) 
     stone.renderTo(stones[i].x,stones[i].y) ;
   
	if (gameover) {
		if (iswin) {
			swin.renderTo(400,300) ;
			labgameover.setText(strings.textwin) ;
		}
		else {
			sfail.renderTo(400,300) ;		
			labgameover.setText(strings.textfail) ;
		}
		labgameover.printTo(280,260) ;	
	}

   return true ;
}

function Frame(dt) {
	if (gameover) return true ;
	
	if (mindt>dt) mindt=dt ;
	if (maxdt<dt) maxdt=dt ;
	
   money+=balance.moneyinc*dt ;

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
	   if (monsters[i].health<=0)
		   monsters.splice(i,1) ;
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
   
   // twily call
   if (game.isKeyDown(KEY_6)) { 
      if ((twilytime<=0)&&(money>=balance.twilycost)) {
        twilytime=balance.twilywork ;
        money-=balance.twilycost ;	
      }
   }
   
   // rarity call
   if (game.isKeyDown(KEY_5)) { 
      if ((raritytime<=0)&&(money>=balance.raritycost)) {
        raritytime=balance.raritywork ;
        money-=balance.raritycost ;
      }
   }
   
   // flatter call
   if (game.isKeyDown(KEY_4)) { 
      if ((flattertime<=0)&&(money>=balance.flattercost)) {
        flattertime=balance.flatterwork ;
        money-=balance.flattercost ;
      }
   }

   // pinkie call
   if (game.isKeyDown(KEY_2)) { 
      if ((pinkietime<=0)&&(money>=balance.pinkiecost)) {
        pinkietime=balance.pinkiework ;
        money-=balance.pinkiecost ;
      }
   }

   // aj call
   if (game.isKeyDown(KEY_1)) { 
      if ((!ajcalled)&&(money>=balance.ajcost)) {
        ajcalled=true ;
		ajpos=100 ;
		ajhealth=balance.ajhealth ; 
        money-=balance.ajcost ;		
		snd_galop.play() ;
      }
   }
   
   // rd call
   if (game.isKeyDown(KEY_3)) { 
      if ((!rdcalled)&&(money>=balance.rainbowcost)) {
        rdcalled=true ;
		stone_ok=0 ;
		rdpos=-rainbow.getWidth() ;		
        money-=balance.rainbowcost ;
      }
   }
      
   return true ;
}

