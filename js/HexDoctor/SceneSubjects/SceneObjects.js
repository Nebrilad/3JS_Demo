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

	let lineArray = [];
	const angle = 1.7320508075688767;
	const h = angle * 2;

	drawHexGrid();

	function drawHexGrid(){
		let radius = 4;
		let padding = 0;
		let size = 10;

		let ang30 = toRadians(30);
		let xOff = Math.cos(ang30) * (radius + padding);
		let yOff = Math.sin(ang30) * (radius + padding);
		let half = Math.floor(size / 2);

		for (let row = 0; row <= size; row++) {
			let cols = size - Math.abs(row - half);

			for (let col = 0; col <= cols; col++) {
	      let xX = xOff * (col * 2 + 1 - cols);
	      let zZ = yOff * (row - half) * 3;

				let diamondVertices = createDiamondSpheres({x:xX,y:0,z:zZ});

				let diamondLines = createLine(diamondVertices,{r:0,g:0,b:255});
				lineArray.push(diamondLines);
	    }
		}
	}

	function createLine(diamondVertices,rgb){
		let material = new THREE.LineBasicMaterial( { color: new THREE.Color(rgb.r/255, rgb.g/255, rgb.b/255) } );
		let diamondLines = [];

		for(let i=1;i<diamondVertices.length;i++){
			let geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3( diamondVertices[0].position.x, 0, diamondVertices[0].position.z));
			geometry.vertices.push(new THREE.Vector3( diamondVertices[i].position.x, 0, diamondVertices[i].position.z));
			let line = new THREE.Line( geometry, material );
			diamondLines.push(line);
			scene.add(line);
		}

		return diamondLines;
	}


	function createDiamondSpheres(position={x:0,y:0,z:0},color=0x000000){
		let diamondVertices = [];
		let geometry = new THREE.SphereGeometry( 0.5, 8, 8 );
		let material = new THREE.MeshBasicMaterial( {color: color} );

		sphere = new THREE.Mesh( geometry, material );
		sphere.name = "Sphere1";
		sphere.position.set(position.x,0,position.z);
		diamondVertices.push(sphere);
		scene.add( sphere );

		sphere = new THREE.Mesh( geometry, material );
		sphere.name = "Sphere2";
		sphere.position.set(position.x+h,0,position.z+2);
		diamondVertices.push(sphere);
		scene.add( sphere );

		sphere = new THREE.Mesh( geometry, material );
		sphere.name = "Sphere3";
		sphere.position.set(position.x,0,position.z+4);
		diamondVertices.push(sphere);
		scene.add( sphere );

		sphere = new THREE.Mesh( geometry, material );
		sphere.name = "Sphere4";
		sphere.position.set(position.x-h,0,position.z+2);
		diamondVertices.push(sphere);
		scene.add( sphere );

		return diamondVertices;
	}

	function animateFirework(time){
		/**
		for (let i = lineArray.length-1; i >= 0; i--) {
    	let li = lineArray[i];

			for(let j = li.length-1;j>=0;j--){
				li[j].geometry.vertices[0].set(0,0,0);
			}
  	}
		**/
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
