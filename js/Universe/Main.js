function initialize(){
  const canvas = document.getElementById("canvas");

  const sceneManager = new SceneManager(canvas);

  const stats = buildStats();

  bindEventListeners();
  render();

  function buildStats(){
    let stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'absolute';
    stats.dom.style.left = '45%';
    stats.dom.style.top = '0%';
    document.body.appendChild( stats.dom );
    return stats;
  }

  function bindEventListeners() {
  	window.onresize = resizeCanvas;
  	resizeCanvas();
  }

  function resizeCanvas() {
  	canvas.style.width = '100%';
  	canvas.style.height= '100%';

  	canvas.width  = canvas.offsetWidth;
  	canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
  }

  function render() {
    requestAnimationFrame(render);
    stats.begin();
    sceneManager.update();
    stats.end();
  }
}
