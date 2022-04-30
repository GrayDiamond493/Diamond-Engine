//Script should be used as a guide!!!

var rotateX= 0.001
var rotateY= 0.01
var backgroundColour = 0xffffff
var objectColour = 0xff00ff
var objectPos = 10
//to choose object
var choice = 1

//set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( { color: backgroundColour } );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 10, 10, 1 );
scene.add( light );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Migrate to a "create.js" file
function makeCube(colour, pos){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshToonMaterial(  { color: colour }  );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = pos;
    return cube
}

function makeSphere(colour, pos){
    const geometry = new THREE.SphereGeometry();
    console.log(geometry.toJSON())
    const material = new THREE.MeshLambertMaterial(  { color: colour }  );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    camera.position.z = pos;
    return sphere
}

function makeSphere(colour, pos){
    const geometry = new THREE.SphereGeometry();
    console.log(geometry.toJSON())
    const material = new THREE.MeshLambertMaterial(  { color: colour }  );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    camera.position.z = pos;
    return sphere
}

//All creation ends at this point

if(choice==0){
    cube = makeCube(objectColour, objectPos)
}else {
    sphere = makeSphere(objectColour, objectPos)
}




/*
function rotationAnimate() {
    requestAnimationFrame( rotationAnimate );
    
    object.rotation.x += rotateX;
    object.rotation.y += rotateY;

    renderer.render( scene, camera );
    
    
};
rotationAnimate()
*/
let acceleration = 9.8;
let bounce_distance = 9;
let bottom_position_y = -4;
let time_step = 0.02;
// time_counter is calculated to be the time the ball just reached the top position
// this is simply calculated with the s = (1/2)gt*t formula, which is the case when ball is dropped from the top position
let time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
let initial_speed = acceleration * time_counter;

// Animate the scene
const animate = () => {
  requestAnimationFrame( animate );

  // reset time_counter back to the start of the bouncing sequence when sphere hits through the bottom position
  if (sphere.position.y < bottom_position_y) {
    time_counter = 0;
  }
  // calculate sphere position with the s2 = s1 + ut + (1/2)gt*t formula
  // this formula assumes the ball to be bouncing off from the bottom position when time_counter is zero
  sphere.position.y = bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
  // advance time
  time_counter += time_step;

  renderer.render( scene, camera );
};
animate();