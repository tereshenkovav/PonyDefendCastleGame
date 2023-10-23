function funcGray(c) {
   if (c.a==0) return c ;
   var gr = (c.r+c.g+c.b)/3 ;
   return { r: gr, g: gr, b: gr, a: 255 } ;
}
