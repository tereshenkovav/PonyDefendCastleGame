function makeRects(rects) {
   for (var i=0; i<4; i++)
     rects.push(game.createRect(40+i*40,40+i*40,40+i*40)) ;
   for (var i=2; i>=0; i--)
     rects.push(game.createRect(40+i*40,40+i*40,40+i*40)) ;
}

function renderRects(rects,x1,y1,w,h) { 
  for (var i=0; i<rects.length; i++) 
    rects[i].drawTo(x1+2*i,y1+2*i,w-4*i,h-4*i) ;
}
