function SceneObjects(scene, screenDimensions ) {
	//scene.add(new THREE.AxesHelper(4));
	//scene.add(new THREE.GridHelper(100, 25, 0x444444, 0x222222));
	/**
		for(let i = 0 ;i<200; i++){
			let from = new THREE.Vector3( 0, 0, 0 );
			let to = new THREE.Vector3( randomMaxMin(-1,1), 0, randomMaxMin(-1,1) );
			to.normalize().add(from);
			let direction = to.clone().sub(from);
			let length = direction.length()*4;
			let arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
			scene.add( arrowHelper );
		}
	**/

	var Floor = function(){
	  var floorCol = Colors.green_d;
	  this.mesh =  new CustomMesh.PlaneMesh(1600,1600,12, floorCol);
	  var vertices = this.mesh.geometry.vertices;
	  for (var i=0; i<vertices.length; i++){
	    var v = vertices[i];
	    v.x += Math2.rangeRandom(-10,10);
	    v.y += Math2.rangeRandom(-10,10);
	    v.z += Math2.rangeRandom(-10,10);
	  }
	  this.mesh.geometry.computeFaceNormals();
	  this.mesh.geometry.verticesNeedUpdate = true;
	  this.mesh.geometry.colorsNeedUpdate = true;
	  //
	  //this.mesh.geometry.computeVertexNormals();
	  this.mesh.rotation.x = -Math.PI / 2;
	}

	let floor = new Floor();
	scene.add(floor.mesh);

	this.update = function(delta,time) {

	}
}
