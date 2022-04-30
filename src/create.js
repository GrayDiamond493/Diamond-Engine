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