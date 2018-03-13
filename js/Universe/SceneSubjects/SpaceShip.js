function SpaceShip(scene, sceneObjects){
  let position = 0;
  let newPosition = -1;
  let nextStartPoint = new THREE.Vector3(4, 0, 0);
  let angle = 0;

  let maxRandomNumber = 0.09;
  let minRandomNumber = 0.005;

  let expanding = true;

  let tangent = new THREE.Vector3();
  let axis = new THREE.Vector3();
  let up = new THREE.Vector3(0, 1, 0);

  let onRenderFcts= [];
  let shipsArray = [];

  let moonMesh = sceneObjects.getMoon();
  let earthMesh = sceneObjects.getEarth();
  earthMesh.geometry.computeBoundingSphere();
  //console.log(earthMesh);

  //TODO Simulation ON/OFF START
  for(i=0;i<500;i++){
    let vector = getRandomPointOnEarth();
    let spaceShip1 = createShip(0xffff00,vector,false);
    scene.add(spaceShip1);
    shipsArray.push(spaceShip1);
  }

  let spaceShip = createShip(0xff0000, new THREE.Vector3(1.5, 1.5, 0),true);
  scene.add(spaceShip);
  createPath();

  onRenderFcts.push(function(){
    moveShip();
    moveShipAway();
  });
  //TODO Simulation ON/OFF END

  function getRandomPointOnEarth(){
    /**
    1. Generate three random numbers x,y,z using Gaussian distribution
    2. Multiply each number by 1/sqrt(x*2+y*2+z*2) (a.k.a. Normalise) . You should handle what happens if x=y=z=0.
    3. Multiply each number by the radius of your sphere.
    **/

    let earthRadius = earthMesh.geometry.boundingSphere.radius;

    let max = 1;
    let min = -1;
    let x = Math.random() * (max - min) + min;
    let y = Math.random() * (max - min) + min;
    let z = Math.random() * (max - min) + min;

    multiplier = normalizeRandoms(x,y,z);

    x = (x * multiplier * earthRadius ) + earthMesh.position.x;
    y = (y * multiplier * earthRadius ) + earthMesh.position.y;
    z = (z * multiplier * earthRadius ) + earthMesh.position.z;

    return new THREE.Vector3(x,y,z);
  }

  function normalizeRandoms(x,y,z){
    let sum;
    if(x==0 && y==0 && z==0){
      sum = 1;
    }else{
      sum = x*x + y*y + z*z;
    }
    return 1/Math.sqrt(sum);
  }

  function createShip(color,vector,addBody){
    let scale = 1/10;
    let spaceShipBodyGeometry = new THREE.CylinderGeometry( 0.1*scale, 0.04*scale, 1*scale, 8 );
    let spaceShipBodyMaterial = new THREE.MeshPhongMaterial({color: color});
    let spaceShipBodyMesh = new THREE.Mesh(spaceShipBodyGeometry,spaceShipBodyMaterial);

    let spaceShipTipGeometry = new THREE.SphereGeometry( 0.1*scale, 8, 8 );
    let spaceShipTipMaterial = new THREE.MeshPhongMaterial({color: color});
    let spaceShipTipMesh = new THREE.Mesh(spaceShipTipGeometry,spaceShipTipMaterial);

    let spaceShipBottomGeometry = new THREE.SphereGeometry( 0.04*scale, 8, 8 );
    let spaceShipBottomMaterial = new THREE.MeshPhongMaterial({color: color});
    let spaceShipBottomMesh = new THREE.Mesh(spaceShipBottomGeometry,spaceShipBottomMaterial);
    spaceShipBottomMesh.position.set(0,-0.5*scale,0);

    let spaceShip = new THREE.Group();
    spaceShip.add( spaceShipTipMesh );
    if(addBody){
      spaceShipTipMesh.position.set(0,0.5*scale,0);
      spaceShip.add( spaceShipBodyMesh );
      spaceShip.add( spaceShipBottomMesh );
      spaceShip.scale.set(2,2,2);
    }
    spaceShip.position.copy(vector);
    return spaceShip;
  }

  function createPath(){
    // smooth my curve over this many points
    spline = new THREE.CatmullRomCurve3([
       new THREE.Vector3(2, 0, 0),
       nextStartPoint,
       new THREE.Vector3(2.75, 0, 2.75),
       new THREE.Vector3(0, 0, 4),
       new THREE.Vector3(-2.75, 0, 2.75),
       new THREE.Vector3(-4, 0, 0),
       new THREE.Vector3(-2.75, 0, -2.75),
       new THREE.Vector3(0, 0, -4),
       new THREE.Vector3(2.75, 0, -2.75),
       nextStartPoint
    ]);
    let numPoints = 50;//spline.points.length-1;
    let material = new THREE.LineBasicMaterial({
        color: 0xffffff,
    });
    let geometry = new THREE.Geometry();
    let splinePoints = spline.getPoints(numPoints);
    for(i = 0; i < splinePoints.length; i++){
        geometry.vertices.push(splinePoints[i]);
    }
    let line = new THREE.Line(geometry, material);
    scene.add(line);
  }

  function moveShip() {

    // add up to position for movement
    position += 0.001;
    if(position>1){
      position=newPosition;
    }

    // get the point at position
    let point = spline.getPointAt(position);

    if( (Math.floor(point.x) == nextStartPoint.x) &&
        (Math.floor(point.y) == nextStartPoint.y) &&
        (Math.floor(point.z) == nextStartPoint.z) &&
        (newPosition == -1) ){
      newPosition = position;
    }

    spaceShip.position.copy(point);

    let angle = getAngle(position);
    // set the quaternion
    spaceShip.quaternion.setFromAxisAngle( axis, angle );
  }

  function moveShipAway(){

    for(i=0,len = shipsArray.length;i<len;i++){
      let distance = shipsArray[i].position.distanceTo(earthMesh.position.clone());

      if(distance <= 2){
        expanding = true;
      }else if(distance >= 3){
        expanding = false;
      }

      if(expanding){
        //let direction = shipsArray[i].position.clone().normalize();
        let direction = new THREE.Vector3();
        direction.subVectors( shipsArray[i].position.clone(), earthMesh.position.clone() ).normalize();
        let randomScalar = Math.random() * (maxRandomNumber - minRandomNumber) + minRandomNumber;
        let addPosition = direction.clone().multiplyScalar(randomScalar);
        shipsArray[i].position.add(addPosition);
      }else{
        let direction = new THREE.Vector3();
        direction.subVectors( moonMesh.position.clone(), shipsArray[i].position.clone() ).normalize();
        let randomScalar = Math.random() * (maxRandomNumber - minRandomNumber) + minRandomNumber;
        let addPosition = direction.clone().multiplyScalar(randomScalar);
        shipsArray[i].position.add(addPosition);

        //remove ship when landed on moon
        if(shipsArray[i].position.distanceTo(moonMesh.position)<0.5){
          scene.remove( shipsArray[i] );
          shipsArray.splice(i, 1);
          i--;
          len--;
        }
      }
    }
  }

  function getAngle( position ){
    // get the 2Dtangent to the curve
    let tangent = spline.getTangentAt(position).normalize();

    axis.crossVectors( up, tangent ).normalize();

    let angle = Math.acos( up.dot( tangent ) );

    return angle;
  }

  this.update = function(delta,time) {
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct();
    })
	}
}
