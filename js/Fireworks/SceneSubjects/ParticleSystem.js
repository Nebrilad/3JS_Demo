function ParticleSystem(scene, { width, height }) {

  let rgb = {r:randomMaxMin(0,255),g:randomMaxMin(0,255),b:randomMaxMin(0,255)};
  let location = new THREE.Vector3(randomMaxMin(-width/50, width/50), height/50, randomMaxMin(-20, 20));
  let firework = new Particle(scene, true, location, rgb);
  let particles = [];

  let gravity = new THREE.Vector3(0, -0.05, 0);

  this.done = function() {
    if (firework == null && particles.length==0) {
      return true;
    } else {
      return false;
    }
  }

  // A method to test if the particle system still has particles
  this.dead = function() {
    if (particles.length==0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function(delta,time) {
   if (firework != null) {
     //console.log("firework",firework);
     //fill(hu,255,255);
     firework.applyForce(gravity);
     firework.update();

     if ( firework.explode() ) {
       //console.log("EXPLODE");

       for (let i = 0; i < 50; i++) {
         //console.log("firework ",firework.position);
         let particle = new Particle(scene,false,firework.position, rgb);
         particles.push(particle);
       }
       firework = undefined;
     }

   }
   //console.log("particles ",particles.length);
   for (let i = particles.length-1; i >= 0; i--) {
     particles[i].applyForce(gravity);
     particles[i].update();
     if (particles[i].isDead()) {
       //console.log("isDead");
       particles.splice(i,1);
     }
    }
  }
}
