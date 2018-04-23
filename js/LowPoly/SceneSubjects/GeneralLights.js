function GeneralLights(scene) {

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(1, 0, 0.5);

  const ambientLight = new THREE.AmbientLight(0x666666);

  scene.add(dirLight, ambientLight);

	this.update = function(delta,time) {
		//dirLight.intensity = ( Math.sin(time.getElapsedTime() )+1.5)/1.5;
		//dirLight.color.setHSL( Math.sin(time.getElapsedTime()/4 ), 0.5, 0.5 );
	}
}
