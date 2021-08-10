import React, { useEffect } from 'react'
import './App.css'
import About from './partials/About'
import Card from './partials/Card'
import Footer from './partials/Footer'
import Skills from './partials/Skills'
import star from './star.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable } from "gsap/all"; 




function App() {
  //for AOS animation
  useEffect(() => {
    AOS.init({
      once: true
    })
  })

 


  var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //===================================================== scene
  var scene = new THREE.Scene();

   // Floor
let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
let floorMaterial = new THREE.MeshPhongMaterial({
  color: 0x0066FF,
  shininess: 0,
});

let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
floor.receiveShadow = true;
floor.position.y = -11;
scene.add(floor);

  //===================================================== camera
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;
  camera.position.y = 1.5;

  //===================================================== lights
  var light = new THREE.DirectionalLight(0xefefff, 3);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
  var light = new THREE.DirectionalLight(0xffefef, 3);
  light.position.set(-1, -1, -1).normalize();
  scene.add(light);

  //===================================================== resize
  window.addEventListener("resize", function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });


  //===================================================== model
  var loader = new GLTFLoader();
  var mixer;
  var model;
  loader.load(
    "https://raw.githubusercontent.com/baronwatts/models/master/robber.glb", function(gltf) {

       gltf.scene.traverse( function( node, model ) {
          if ( node instanceof THREE.Mesh ) { 
            node.castShadow = true; 
            node.material.side = THREE.DoubleSide;
            
          }
          if (node.isMesh) {
            node.gltf = gltf;
          }
        });

       
      model = gltf.scene;
      model.scale.set(.75,.75,.75);
      
      scene.add(model);

      console.log(gltf.animations); //shows all animations imported into the dopesheet in blender

      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[1]).play();
      

      var currentlyAnimating = false
      window.addEventListener('click', e => raycast(e));
window.addEventListener('touchend', e => raycast(e, true));

function raycast(e, touch = false) {
  var mouse = {};
  if (touch) {
    mouse.x = 3.5 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
  } else {
    mouse.x = 3.5 * (e.clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
  }
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children, true);


    
   
      if (!currentlyAnimating) {
        currentlyAnimating = true;
        kill();
      }
    
  
  function kill() {
    mixer.clipAction(gltf.animations[1]).stop();
    mixer.clipAction(gltf.animations[0]).play();
    setTimeout(function() {
      mixer.clipAction(gltf.animations[0]).stop();
      mixer.clipAction(gltf.animations[1]).play();
    }, 1500);
  }
  document.addEventListener('mousemove', function(e) {
    var mousecoords = getMousePos(e);
  });
  
  function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
  }
}
function getMouseDegrees(x, y, degreeLimit) {
  let dx = 0,
      dy = 0,
      xdiff,
      xPercentage,
      ydiff,
      yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  
   // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;  
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1; }
// Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    }
  
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}










      
      

 
  });


//===================================================== animate
var clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  var delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);
  if (model) model.rotation.y += 0.035;

  renderer.render(scene, camera);
}
//==================================================== raycasting
var raycaster = new THREE.Raycaster() // Used to detect the click on our character

render();
  return (
    <div className="min-h-screen py-1 px-3 sm:px-5 justify-items-right">
      <div data-aos="fade-down"  data-aos-duration="80" data-aos-delay="400">
      
      </div>
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
        
       
        
        
        
      </div>
    </div>
  );
  
}
export default App;
