function CellularAutomata(scene, r) {
  let w = 4;
  let width = 200;
  let height = 200;
  let cols = width/w;
  let rows = height/w;

  let generation;     // How many generations?
  let ruleset = r;    // An array to store the ruleset, for example [0,1,1,0,1,1,0,1]
  let matrix = [];    // Store a history of generations in 2D array, not just one
  for(var i=0; i<rows; i++) {
    matrix[i] = new Array(cols);
  }
  restart();

  let dotGeometry = new THREE.Geometry();
  let dotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
  let dot = new THREE.Points(dotGeometry,dotMaterial);

  // Make a random ruleset
  this.randomize = function(){
    for(let i=0; i<8; i++){
      ruleset[i] = getRandomInt(2);
    }
  }

  // Reset to generation 0
  function restart(){
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        matrix[i][j] = 0;
      }
    }
    matrix[cols/2][0] = 1;  // We arbitrarily start with just the middle cell having a state of "1"
    generation = 0;
  }

  // The process of creating the new generation
  this.generate = function(){
    // For every spot, determine new state by examing current state, and neighbor states
    // Ignore edges that only have one neighor
    for(let i=0;i<cols;i++){
      let left  = matrix[(i+cols-1)%cols][generation%rows];     // Left neighbor state
      let me    = matrix[i][generation%rows];                   // Current state
      let right = matrix[(i+1)%cols][generation%rows];          // Right neighbor state
      //console.log("left "+left+" me "+me+" right "+right);
      matrix[i][(generation+1)%rows] = worlframRules(left,me,right);    // Compute next generation state based on ruleset
    }
    generation++;
  }

  this.draw = function(){
    let offset = generation%rows;
    dotGeometry = new THREE.Geometry();

    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){

        let y = j-offset;
        if(y<=0){y=rows+y;}

        if(matrix[i][j]==1){
          let posx = (i*w)/10;
          let posy = ((y-1)*w)/10;
          dotGeometry.vertices.push(new THREE.Vector3(posx,posy,0));
        }
      }
    }

    //scene.remove(dot);
    dot.geometry = dotGeometry;
    scene.add(dot);
  }

  // Implementing the Wolfram rules
  // This is the concise conversion to binary way
  function worlframRules(a,b,c){
    //if(a===undefined) a=0;
    //if(b===undefined) b=0;
    //if(c===undefined) c=0;
    let s = ""+a+b+c;
    let index = parseInt(s);
    return ruleset[index];
  }

  // The CA is done if it reaches the bottom of the screen
  this.finished = function(){
    if(generation > rows){
      return true;
    }else{
      return false;
    }
  }

}
