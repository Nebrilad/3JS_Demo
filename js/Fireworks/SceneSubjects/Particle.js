function Particle(scene, seed, location, rgb) {
  this.acceleration = new THREE.Vector3(0, 0, 0);
  this.lifespan = 255.0;
  this.position = new THREE.Vector3(0,0,0); //location;

  this.velocity=null;
  if(seed){
    this.velocity = new THREE.Vector3(0,randomMaxMin(2,3),0);
  }else{
    this.velocity = new THREE.Vector3(randomMaxMin(-1.0,1.0),randomMaxMin(-1.0,1.0),randomMaxMin(-1.0,1.0));
    this.velocity.normalize();
  }

  let firework = createFirework(this.lifespan);
  firework.position.set(this.position.add(location));
  scene.add( firework );

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.explode = function(){
    //console.log(seed, " ",velocity.y);
    if (seed && this.velocity.y < 0) {
      this.lifespan = 0;
      //console.log(firework);
      scene.remove(firework);
      firework.geometry.dispose();
      firework.material.dispose();
      firework = undefined;
      return true;
    }
    return false;
  }

  // Is the particle still useful?
  this.isDead = function() {
    if (this.lifespan < 0.0) {
      scene.remove(firework);
      firework.geometry.dispose();
      firework.material.dispose();
      firework = undefined;
      return true;
    } else {
      return false;
    }
  }

   // Method to update location
   this.update = function() {
     this.velocity.add(this.acceleration);
     this.position.add(this.velocity);
     if (!seed) {
       this.lifespan -= 3.0;
       //this.velocity.multiplyScalar(0.995);
       //console.log("elem ",this.velocity," "+this.lifespan);
     }
     this.acceleration.multiplyScalar(0);
     //console.log(this.acceleration," ",this.velocity);
     //console.log("elem_",this.position);
     firework.position.set(this.position.x,this.position.y,this.position.z);
     firework.material.opacity = this.lifespan/255;
     //console.log(firework.material.opacity);
   }

  // Method to display
  function createFirework(lifespan) {
    let partGeometry = new THREE.SphereGeometry( 0.3, 8, 8 );

    let partMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(rgb.r/255, rgb.g/255, rgb.b/255)
    });
    //console.log(partMaterial);
    partMaterial.transparent = true;
    partMaterial.opacity = lifespan;
    let partMesh = new THREE.Mesh(partGeometry,partMaterial);

    //partMesh.geometry.computeBoundingSphere();
    //partMesh.geometry.boundingSphere.center.set(location.x,location.y,location.z);

    return partMesh;
  }
}
