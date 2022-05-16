//Migrate to a "create.js" file

function makeFloor(){
    
    base=new THREE.BoxGeometry(1, 0.1, 1),
    whiteTile= new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 150 }),
    blackTile=new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 150 }),

    floor = new THREE.Group()

    for(let x = -8; x < 8; x++){
        for(let z = -8; z < 8; z++){
            if(z%2==false){
                var cube
                cube=new THREE.Mesh(base, x % 2 == false ? whiteTile : blackTile);
            }else{
                cube=new THREE.Mesh(base, x % 2 == false ? blackTile : whiteTile);
            }
            cube.position.set(x,0,z);
            floor.add(cube)
        }
    }

    scene.add(floor);
}

function makePlane(){
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 150 }),
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 150 })
    );

    ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true;

    scene.add(ground);
}


function makeCube(colour) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshToonMaterial({ color: colour });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1
    makeFloor();

    return cube
}

function makeSphere(colour) {
    const geometry = new THREE.SphereGeometry();
    console.log(geometry.toJSON())
    const material = new THREE.MeshLambertMaterial({ color: colour });
    const sphere = new THREE.Mesh(geometry, material);
    makeFloor();
    sphere.position.y = 1

    return sphere
}

//from threejs example at: https://threejs.org/docs/#manual/en/introduction/Drawing-lines
function makeArrow(colour) {
    const material = new THREE.LineBasicMaterial({ color: colour });

    const points = [];
    points.push(new THREE.Vector3(- 10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    //vector down
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(0, -20, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    console.log(geometry.toJSON())
    const line = new THREE.Line(geometry, material);

    line.position.y = 1

    makeFloor();
    return line

}

function planRoof(points) {
    //roof
    var x = 0;
    while (x < 15) {
        points.push(new THREE.Vector3(x, 0, 0));
        points.push(new THREE.Vector3(x, 5, 5));
        x += 0.001
    }
    x = 0;
    while (x < 15) {
        points.push(new THREE.Vector3(x, 5, 5));
        points.push(new THREE.Vector3(x, 0, 10));
        x += 0.001
    }
    z = 0
    y = 0
    //roof facade 1
    while (z < 5 && y < 5) {
        points.push(new THREE.Vector3(0, 0, z));
        points.push(new THREE.Vector3(0, y, z));
        z += 0.001
        y += 0.001
    }
    while (z < 10 && y > 0) {
        points.push(new THREE.Vector3(0, 0, z));
        points.push(new THREE.Vector3(0, y, z));
        z += 0.001
        y -= 0.001
    }
    console.log(z, y)
    //roof facade 2
    z = 0
    while (z < 5 && y < 5) {
        points.push(new THREE.Vector3(15, 0, z));
        points.push(new THREE.Vector3(15, y, z));
        z += 0.001
        y += 0.001
    }
    while (z < 10 && y > 0) {
        points.push(new THREE.Vector3(15, 0, z));
        points.push(new THREE.Vector3(15, y, z));
        z += 0.001
        y -= 0.001
    }
    return points
}

function planWalls(points) {
    //south wall 
    var x = 1
    points.push(new THREE.Vector3(10, 0, 5));
    while (x < 14) {
        points.push(new THREE.Vector3(x, -5, 8));
        points.push(new THREE.Vector3(x, 0, 8));
        x += 0.001
    }

    //north wall
    var x = 1
    while (x < 14) {
        points.push(new THREE.Vector3(x, -5, 2));
        points.push(new THREE.Vector3(x, 0, 2));
        x += 0.001
    }

    //east wall
    var z = 2
    while (z < 8) {
        points.push(new THREE.Vector3(1, -5, z));
        points.push(new THREE.Vector3(1, 0, z));
        z += 0.001
    }

    //west wall
    var z = 2
    while (z < 8) {
        points.push(new THREE.Vector3(14, -5, z));
        points.push(new THREE.Vector3(14, 0, z));
        z += 0.001
    }

    return points
}

function makeHouse(colour) {
    const material = new THREE.LineDashedMaterial({ color: colour });

    var points = [];

    points = planRoof(points)
    points = planWalls(points)

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    line.position.y = 1
    makeFloor();
    return line
}

function makeMobius(colour) {
    const localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0.8);

    // Geometry

    const material = new THREE.MeshPhongMaterial({
        color: colour,
        shininess: 100,
        side: THREE.DoubleSide,

        // ***** Clipping setup (material): *****
        clippingPlanes: [localPlane],
        clipShadows: true

    });

    const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);

    object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    camera.position.z = 10;
    object.position.y = 0
    scene.add(object);
    

    makeFloor();
    return object
}


function addScene(object, pos) {
    scene.add(object);
    camera.position.z = pos;
    return object
}