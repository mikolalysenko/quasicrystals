var qs = require("./quasicrystal")([[0,0,1.176],[1.051,0,0.526],[0.324,1,0.525],[-0.851,0.618,0.526],[-0.851,-0.618,0.526],[0.325,-1,0.526],[0.851,0.618,-0.526],[0.851,-0.618,-0.526],[-0.325,1,-0.526],[-1.051,0,-0.526],[-0.325,-1,-0.526],[0,0,-1.176]]);

var mesh = require("isosurface").surfaceNets(
  [512, 512, 512],
  qs[0],
  [[-18, -18, -18], [18, 18, 18]]
);

var components = require("simplicial-complex").connectedComponents(mesh.faces, mesh.positions.length);
components.sort(function(a, b) { return b.length - a.length; });
mesh.faces = components[0];


var fnormals = require("trimesh").face_normals(mesh);
var facets = [];

for(var i=0; i<mesh.faces.length; ++i) {
  var f = mesh.faces[i];
  var verts = [];
  for(var j=0; j<f.length; ++j) {
    verts.push(mesh.positions[f[j]]);
  }
  facets.push({
    normal: fnormals[i],
    verts: verts
  });
}

console.log(require("stl").fromObject({
  description: "Icosahedral Quasicrystal",
  facets: facets
}));