function initialize(){
  const canvas = document.getElementById("canvas");

  const sceneManager = new SceneManager(canvas);

  const stats = buildStats();

  bindEventListeners();
  render();

  function buildStats(){
    let stats = new Stats();
    //var xPanel = stats.addPanel( new Stats.Panel( 'x', '#ff8', '#221' ) );
  	//var yPanel = stats.addPanel( new Stats.Panel( 'y', '#f8f', '#212' ) );
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

/**const rand = (min,max) => min + Math.random()*(max-min);**/
function randomMaxMin(min,max){
  return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function createMatrix(m, n) {
    var result = [];
    for(var i = 0; i < n; i++) {
        result.push(new Array(m).fill(0));
    }
    return result;
}
