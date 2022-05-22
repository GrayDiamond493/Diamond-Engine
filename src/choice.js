//Script should be used as a guide!!!

var rotateX= 0.01
var rotateY= 0.01
var backgroundColour=0x000000;
var objectColour;
var objectPos;
//to choose object
var shapeChoice;
const startTime = Date.now();
//set scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.querySelector('#canvas');
const loader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new THREE.OrbitControls ( camera, renderer.domElement );


function setScene(){
    
//scene.background = new THREE.Color( { color: backgroundColour } );

console.log("Im here")
scene.add( new THREE.AmbientLight( 0x505050 ) );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.angle = Math.PI / 5;
spotLight.penumbra = 0.2;
spotLight.position.set( 2, 3, 3 );
spotLight.castShadow = true;
spotLight.shadow.camera.near = 3;
spotLight.shadow.camera.far = 10;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add( spotLight );

const dirLight = new THREE.DirectionalLight( 0x55505a, 1 );
dirLight.position.set( 0, 3, 0 );
dirLight.castShadow = true;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 10;

dirLight.shadow.camera.right = 1;
dirLight.shadow.camera.left = - 1;
dirLight.shadow.camera.top	= 1;
dirLight.shadow.camera.bottom = - 1;

dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add( dirLight );
}


function setPos(pos){
    objectPos = pos
}

function setBackground(url){
    bg_url = url


const bgTexture = loader.load(bg_url);
scene.background = bgTexture;
}

function setColor(color){
    hex=color
    hexString=hex.toString()
    hexString=hexString.replace(/^#+/i,'')
    console.log('hex: ',hexString)
    c=parseInt(hexString, 16)
    console.log('color: ',c)
    objectColour=c
}

function choose(shapeChoice){
    //objectPos = parseFloat(document.getElementById("obj-pos").value)
    //objectColour = parseFloat(document.getElementById("obj-cl").value)
    //backgroundColour = parseFloat(document.getElementById("bg-cl").value)
    console.log(objectPos)
    console.log(objectColour)
    console.log(backgroundColour)
    console.log(shapeChoice)
    switch (shapeChoice) {
        case '0':
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            setScene()
            object = makeCube(objectColour)
            addScene(object,objectPos)
            break;
        case '1':
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            setScene()
            object = makeSphere(objectColour)
            addScene(object,objectPos)
            break;
        case '2':
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            setScene()
            object = makeMobius(objectColour)
            addScene(object,objectPos)
            break;
        case '3':
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            setScene()
            object = makeArrow(objectColour)
            addScene(object,objectPos)
            break;
        case '4':
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            setScene()
            object = makeHouse(objectColour)
            addScene(object,objectPos)
            break;
    }
}

