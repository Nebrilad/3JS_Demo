function SceneObjects(scene, screenDimensions ) {
	//scene.add(new THREE.AxesHelper(3));
	scene.add(new THREE.GridHelper(100, 50, 0x444444, 0x222222));

	let fireworks = [];
	fireworks.push(new ParticleSystem(scene, screenDimensions));

	let object = new THREE.Object3D();
	object.add( createBox( 4, {x:0, y:2, z:0} ) );

	scene.add(object);
/**
	for(let i = 0 ;i<100; i++){
		let from = new THREE.Vector3( 4, 4, 4 );
		let to = new THREE.Vector3( randomMaxMin(-1,1), randomMaxMin(-1,1), randomMaxMin(-1,1) );
		to.normalize().add(from);
		let direction = to.clone().sub(from);
		let length = direction.length();
		let arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
		scene.add( arrowHelper );
	}
**/
	function createBox(size, center){
		let geometry = new THREE.BoxGeometry( size, size, size );
		for ( let i = 0; i < geometry.faces.length; i++ ) {
			face = geometry.faces[ i ];
			face.color.setRGB( 0, 0, 0.8 * Math.random() + 0.2 );
		}
		let material = new THREE.MeshBasicMaterial( {color: 0xffffff,vertexColors: THREE.FaceColors} );
		let mesh	= new THREE.Mesh(geometry, material);
		mesh.position.set(center.x,center.y,center.z);
		return mesh;
	}

	function animateFirework(time){
		time = parseFloat(Math.round(time.getElapsedTime() * 1000) / 1000).toFixed(3);

		if (Math.random() < 0.05) {
    	fireworks.push(new ParticleSystem(scene, screenDimensions));
  	}

		for (let i = fireworks.length-1; i >= 0; i--) {
    	let f = fireworks[i];
    	f.update();
    	if (f.done()) {
      	fireworks.splice(i,1);
    	}
  	}

	}

	this.addBox = function(size, center){
		object.add(createBox(size,center));
	}

	this.update = function(delta,time) {
		animateFirework(time);
	}

	this.getObject = function(){
		return object;
	}
}
