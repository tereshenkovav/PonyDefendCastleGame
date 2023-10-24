function makeRects(rects) {
   var rect = game.createTranspRect(0,160,240) ;
   rect.setLineWidth(3) ;
   rects.push(rect) ;

   var rect = game.createTranspRect(0,120,200) ;
   rect.setLineWidth(3) ;
   rects.push(rect) ;

   var rect = game.createTranspRect(0,80,160) ;
   rect.setLineWidth(3) ;
   rects.push(rect) ;

   var rect = game.createTranspRect(0,40,120) ;
   rect.setLineWidth(3) ;
   rects.push(rect) ;

   var rect = game.createRect(0,0,40,160) ;
   rect.setLineWidth(3) ;
   rects.push(rect) ;
}

function renderRects(rects,x1,y1,w,h) { 
  for (var i=0; i<rects.length; i++) 
    rects[i].drawTo(x1+3*i,y1+3*i,w-6*i,h-6*i) ;
}
