function SceneManager(canvas) {

  let sceneObjects;

  const delta = 0.1;

  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const controls = buildControls(renderer);
  const sceneSubjects = createSceneSubjects(scene);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener( 'mousedown', onMouseDown, false );
  window.addEventListener( 'mouseup', onMouseUp, false );

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 70;
    const nearPlane = .01;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(-3, 3, 4);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
  }

  function buildControls(renderer){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    return controls;
  }

  function createSceneSubjects(scene) {
    let generalLight = new GeneralLights(scene);
    sceneObjects = new SceneObjects(scene);
    let spaceShip = new SpaceShip(scene, sceneObjects);
    const sceneSubjects = [
      generalLight,
      sceneObjects,
      spaceShip
    ];

    return sceneSubjects;
  }

  this.update = function() {
    controls.update();

    for(let i=0; i<sceneSubjects.length; i++){
      sceneSubjects[i].update(delta,clock);
    }

    renderer.render(scene, camera);
  }

  this.onWindowResize = function() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function onMouseDown( event ) {
    switch ( event.button ) {
      case 0:
          // left
          //leftClickDown(event);
          break;
      case 1:
          // middle
          break;
      case 2:
          // right
          break;
      }
  }

  function onMouseUp( event ) {
    switch ( event.button ) {
      case 0:
          // left
          //leftClickUp(event);
          break;
      case 1:
          // middle
          break;
      case 2:
          // right
          break;
      }
  }

  function leftClickDown( event ){
    let intersects = getIntersectedObjects(event);

    let found = false;
    for (let i = 0; intersects.length>0 && !found; i++) {
      if(intersects[i].face!=null && intersects[i].object.uuid==sceneObjects.getEarth().uuid){
        intersects[i].face.color.setHex(Math.random() * 0xffffff);
        intersects[i].object.geometry.colorsNeedUpdate=true;
        found = true;
      }
    }
  }

  function leftClickUp( event ){
    let intersects = getIntersectedObjects(event);

    let found = false;
    for (let i = 0; i<intersects.length && !found; i++){
      if(intersects[i].face!=null && intersects[i].object.uuid==sceneObjects.getEarth().uuid){
        intersects[i].face.color.setHex(0xffffff);
        intersects[i].object.geometry.colorsNeedUpdate=true;
        found = true;
      }
    }
  }

  function getIntersectedObjects(event){
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    // calculate objects intersecting the picking ray
    return raycaster.intersectObjects( scene.children );
  }
}
