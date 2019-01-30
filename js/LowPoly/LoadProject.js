[
  './js/LowPoly/SceneSubjects/CellularAutomata.js',
  './js/LowPoly/SceneSubjects/GeneralLights.js',
  './js/LowPoly/SceneSubjects/SceneObjects.js',
  './js/LowPoly/SceneManager.js',
  './js/LowPoly/Main.js'
].forEach(function(src) {
  let script = document.createElement('script');
  let body = document.body || document.getElementsByTagName('body')[0];

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        loadMain();
      }
    };
  } else {  //Others
    script.onload = function(){
      if(src == './js/LowPoly/Main.js'){
        loadMain();
      }
    };
  }

  script.src = src;
  script.type= "text/javascript";
  script.async = false;
  body.appendChild(script);
});

function loadMain(){
  initialize();
}
