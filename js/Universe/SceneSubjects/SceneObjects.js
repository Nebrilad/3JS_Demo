function SceneObjects(scene) {
  let earthDimension = 1; //DO NOT CHANGE - nothing will scale with planets (ex. spaceShips)

  let onRenderFcts= [];

  //scene.add(new THREE.AxesHelper(10));
  //scene.add(new THREE.GridHelper(100, 100, 0x444444, 0x222222));

  let earthMesh	= THREEx.Planets.createEarth();
  earthMesh.scale.set(earthDimension,earthDimension,earthDimension);
  earthMesh.position.set(0,0,0);
  scene.add(earthMesh);

  //TODO Simulation ON/OFF START
  onRenderFcts.push(function(delta){
    earthMesh.rotation.y  += 1/32 * delta;
  });

  let cloudMesh	= THREEx.Planets.createEarthCloud();
  cloudMesh.scale.set(earthDimension,earthDimension,earthDimension);
  cloudMesh.position.add(earthMesh.position);
  scene.add(cloudMesh);
  onRenderFcts.push(function(delta){
    cloudMesh.rotation.y  += 1/16 * delta;
  });
  //TODO Simulation ON/OFF END

  let moonMesh	= THREEx.Planets.createMoon();
  moonMesh.scale.set(earthDimension*3/11,earthDimension*3/11,earthDimension*3/11);
  moonMesh.position.set(20,0,0);
  scene.add(moonMesh);

  onRenderFcts.push(function(delta){
    moonMesh.rotation.y  += 1/4 * delta;
    let newX = Math.cos(toRadians(0.1))*moonMesh.position.x + Math.sin(toRadians(0.1))*moonMesh.position.z;
    let newZ = -Math.sin(toRadians(0.1))*moonMesh.position.x + Math.cos(toRadians(0.1))*moonMesh.position.z;
    moonMesh.position.x = newX;
    moonMesh.position.z = newZ;
  });

  // create the geometry sphere
  let startFieldGeometry  = new THREE.SphereGeometry(50, 32, 32);
  // create the material, using a texture of startfield
  let startFieldMaterial  = new THREE.MeshBasicMaterial();
  startFieldMaterial.map   = textureLoader.load('js/Universe/images/galaxy_starfield.png');
  startFieldMaterial.side  = THREE.BackSide;
  // create the mesh based on geometry and material
  let startFieldMesh  = new THREE.Mesh(startFieldGeometry, startFieldMaterial);
  scene.add(startFieldMesh);

	this.update = function(delta,time) {
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(delta);
    })
	}

  function toDegrees (angle) {
    return angle * (180 / Math.PI);
  }

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  this.getMoon = function(){
    return moonMesh;
  }

  this.getEarth = function(){
    return earthMesh;
  }
}
