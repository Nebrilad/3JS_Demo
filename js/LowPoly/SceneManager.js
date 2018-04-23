function SceneManager(canvas) {

  let sceneObjects;

  const delta = 0.1;

  const clock = new THREE.Clock();
  clock.start();

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

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.setClearColor(0x888888, 1);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 70;
    const nearPlane = .01;
    const farPlane = 1000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(-50, 30, 20); //-6, 6, 8
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
  }

  function buildControls(renderer){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    return controls;
  }

  function createSceneSubjects(scene) {
    let generalLight = new GeneralLights(scene);
    sceneObjects = new SceneObjects(scene, screenDimensions);
    const sceneSubjects = [
      generalLight,
      sceneObjects
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
          break;
      case 1:
          // middle
          break;
      case 2:
          // right
          break;
      }
  }
}
