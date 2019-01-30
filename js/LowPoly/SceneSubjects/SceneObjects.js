function SceneObjects(scene, screenDimensions ) {

	//let ruleset = [0,1,1,1,1,0,1,1];   // Rule 222
  let ruleset = [0,1,1,1,1,1,0,1];   // Rule 190
  //let ruleset = [0,1,1,1,1,0,0,0];   // Rule 30
  //let ruleset = [0,1,1,1,0,1,1,0];   // Rule 110
  //let ruleset = [0,1,0,1,1,0,1,0];   // Rule 90

  scene.add(new THREE.GridHelper(100, 50, 0x444444, 0x222222));

  let ca = new CellularAutomata(scene, ruleset);      // Initialize CA

  //ca.draw();

	function animate(time){
    ca.draw();
  	ca.generate();
	}

	this.update = function(delta,time) {
		animate(time);
	}
}
