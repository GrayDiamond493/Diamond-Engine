//Script should be used as a guide!!!

var rotateX= 0.001
var rotateY= 0.01
var backgroundColour = 0xffffff
var objectColour = 0xff00ff
var objectPos = 10
//to choose object
var choice = 0

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


//All creation ends at this point

if(choice==0){
    object = makeCube(objectColour, objectPos)
    rotationAnimate()
    bounceAnimate()
}else {
    object = makeSphere(objectColour, objectPos)
    bounceAnimate()
    
}