[
  './js/Fireworks/SceneSubjects/Particle.js',
  './js/Fireworks/SceneSubjects/ParticleSystem.js',
  './js/Fireworks/SceneSubjects/GeneralLights.js',
  './js/Fireworks/SceneSubjects/SceneObjects.js',
  './js/Fireworks/SceneManager.js',
  './js/Fireworks/Main.js'
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
      if(src == './js/Fireworks/Main.js'){
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
  console.log("loading Main class");
  initialize();
}
