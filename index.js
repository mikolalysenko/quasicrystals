var $ = require("jquery-browserify")
  , quasicrystal = require("./quasicrystal.js");

$(document).ready(function() {
  var viewer = require("gl-shells").makeViewer();
  /*
  var qs = quasicrystal([
    [0, 1, 0, 0],
    [0,-1, 0, 0],
    [1, 0, 0, 0],
    [-1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0,-1, 0]
  ]);
  */
  
  var qs = quasicrystal([[0,0,1.176],[1.051,0,0.526],[0.324,1,0.525],[-0.851,0.618,0.526],[-0.851,-0.618,0.526],[0.325,-1,0.526],[0.851,0.618,-0.526],[0.851,-0.618,-0.526],[-0.325,1,-0.526],[-1.051,0,-0.526],[-0.325,-1,-0.526],[0,0,-1.176]]);
  
  var mesh = require("isosurface").surfaceNets(
    [256, 256, 256],
    qs[0],
    [[-18, -18, -18], [18, 18, 18]]
  );
  
  var components = require("simplicial-complex").connectedComponents(mesh.faces, mesh.positions.length);
  components.sort(function(a, b) { return b.length - a.length; });
  mesh.faces = components[0];
  
  viewer.updateMesh(mesh);
});