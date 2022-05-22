
function justShow() {
    object.rotation.x = 0.5
    object.rotation.y = 0.5
    renderer.render(scene, camera);
}

function rotationXAnimate() {
    requestAnimationFrame(rotationXAnimate);

    object.rotation.x += rotateX;
    renderer.render(scene, camera);

};

function rotationYAnimate() {
    requestAnimationFrame(rotationYAnimate);

    object.rotation.y += rotateY;
    renderer.render(scene, camera);

};




function bounceAnimate() {
    acceleration = 5;
    bounce_distance = 6;
    bottom_position_y = 1;
    time_step = 0.015;

    // s = (1/2)gt*t 
    time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
    initial_speed = acceleration * time_counter;

    // Animate the scene
    const animate = () => {
        requestAnimationFrame(animate);

        if (object.position.y < bottom_position_y) {
            time_counter = 0;
        }
        // s2 = s1 + ut + (1/2)gt*t
        object.position.y = bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
        // time passes
        time_counter += time_step;

        renderer.render(scene, camera);
    };
    animate();
};

function exportAnimation() {
    const exporter = new THREE.GLTFExporter();
    exporter.parse(
        scene,
        function (result) {
            saveArrayBuffer(result, 'scene.glb');
        },
        { binary: true }
    );
}
function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function mobius(startTime) {
    const animate = () => {
        const currentTime = Date.now();
        const time = (currentTime - startTime) / 1000;
        requestAnimationFrame(animate);
        object.position.y = 0.8;
        object.rotation.x = time * 0.5;
        object.rotation.y = time * 0.2;
        object.scale.setScalar(Math.cos(time) * 0.125 + 0.875);

        renderer.render(scene, camera);
    };
    animate();

}




