function rotationAnimate() {
    requestAnimationFrame( rotationAnimate );
    
    object.rotation.x += rotateX;
    object.rotation.y += rotateY;

    renderer.render( scene, camera );
    
};

function bounceAnimate(){
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
      if (object.position.y < bottom_position_y) {
        time_counter = 0;
      }
      // calculate sphere position with the s2 = s1 + ut + (1/2)gt*t formula
      // this formula assumes the ball to be bouncing off from the bottom position when time_counter is zero
      object.position.y = bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
      // advance time
      time_counter += time_step;
    
      renderer.render( scene, camera );
};
animate();
};




