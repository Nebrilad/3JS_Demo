[
  './js/HexDoctor/SceneSubjects/GeneralLights.js',
  './js/HexDoctor/SceneSubjects/SceneObjects.js',
  './js/HexDoctor/SceneManager.js',
  './js/HexDoctor/Main.js'
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
      if(src == './js/HexDoctor/Main.js'){
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
