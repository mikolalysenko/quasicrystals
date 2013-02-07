module.exports = function(waves) {
  var result = [];
  var dresult = [];
  result.push("var s=0.0");
  dresult.push("var dx=0.0, dy=0.0, dz=0.0, t;");
  for(var i=0; i<waves.length; ++i) {
    var w = waves[i];
    var p = w[0]+"*x+"+w[1]+"*y+"+w[2]+"*z";
    if(w[3]) {
      p += "+"+w[3];
    }
    result.push("s+=Math.cos("+p+");");
    dresult.push("t=Math.sin("+p+");");
    dresult.push("dx-=t*"+w[0]);
    dresult.push("dy-=t*"+w[1]);
    dresult.push("dz-=t*"+w[2]);
  }
  result.push("return -Math.max(s+1.2, Math.sqrt(x*x+y*y+z*z) - 16);");
  dresult.push("return [dx,dy,dz];");
  return [ new Function("x", "y", "z", result.join("\n"))
    , new Function("x", "y", "z", dresult.join("\n")) ];
}
