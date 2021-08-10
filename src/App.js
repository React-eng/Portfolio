import React, { useEffect } from 'react'
import './App.css';
import './m4.glb';
import Card from './partials/Card'
import About from './partials/About'
import 'aos/dist/aos.css';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable } from "gsap/all"; 
import { init } from 'aos';


let raycaster;
let currentlyAnimating = false;
const pointer =new THREE.Vector2();
init()

function App() {

  

   //===================================================== canvas
   var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
 
   //===================================================== scene
   var scene = new THREE.Scene();
 
   //===================================================== camera
   var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.z = 5;
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
     "https://raw.githubusercontent.com/baronwatts/models/master/robber.glb",
      function(gltf) {
 
        gltf.scene.traverse( function( node ) {
           if ( node instanceof THREE.Mesh ) { 
             node.castShadow = true; 
             node.material.side = THREE.DoubleSide;
           }
         });
 
        
       model = gltf.scene;
       
       model.scale.set(.25,.25,.25);
       scene.add(model);
       



           
        

 
 
       console.log(gltf.animations); //shows all animations imported into the dopesheet in blender
 
      mixer = new THREE.AnimationMixer(model); 
       mixer.clipAction(gltf.animations[1]).play();
 
     
    







raycaster = new THREE.Raycaster();
window.addEventListener('click', e => raycast(e,));
window.addEventListener('touch', e => raycast(e, true));

function raycast(e, touch = false) {
  var mouse = {};
  if (touch) {
    mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
  } else {
    mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
  }


raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children , true );

  if (intersects[0]) {
    var object = intersects[0].object;

   
      if (!currentlyAnimating) {
        currentlyAnimating = true;
        kill();
      }
    
  }

function kill() {
         
  mixer.clipAction(gltf.animations[1]).stop();
  mixer.clipAction(gltf.animations[0]).play();
  setTimeout(function() {
    mixer.clipAction(gltf.animations[0]).stop();
    mixer.clipAction(gltf.animations[1]).play();
  }, 1500);
  
}
  
  

   
       
 
      }
   });

   
       

 

 
 
 //===================================================== animate
 var clock = new THREE.Clock();
 function render() {
   requestAnimationFrame(render);
   var delta = clock.getDelta();
   if (mixer != null) mixer.update(delta);
   
   if (model) model.rotation.y += 0.015;
   
   
 
   renderer.render(scene, camera);
 }










 
 
  
render();
  return (
    <div >
<Card/>
<div>

<About/>
</div>

    </div>
  );
  
}
export default App;
