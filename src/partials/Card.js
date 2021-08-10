import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



function Card() {


  
   //===================================================== canvas
   var renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
 
   //===================================================== scene
   var scene = new THREE.Scene();
 
   //===================================================== camera
   var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.z = 5;
   camera.position.y = 1.9;

   
 
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
   var model1;
   loader.load(
    "https://raw.githubusercontent.com/baronwatts/models/master/cop.glb",
      function(gltf) {
 
        gltf.scene.traverse( function( node ) {
           if ( node instanceof THREE.Mesh ) { 
             node.castShadow = true; 
             node.material.side = THREE.DoubleSide;
           }
         });
 
        
         model1 = gltf.scene;
         model1.scale.set(2.9,2.9,2.9);
         model1.position.y = -2.85;
        
         model1.rotation.y = 0.85 * Math.PI;
         model1.position.x =-3.2;
         model1.raycaster = false
         scene.add(model1);


           
        

 
 
       console.log(gltf.animations); //shows all animations imported into the dopesheet in blender
       mixer = new THREE.AnimationMixer(model1); 
       mixer.clipAction(gltf.animations[0]).play();
     
 
     
    










   });

   //gunmodels

  
 
        
       



           
        

 
 
      
       

 

 
 
 //===================================================== animate
 var clock = new THREE.Clock();
 function render() {
   requestAnimationFrame(render);
   var delta = clock.getDelta();
   if (mixer != null) mixer.update(delta);
   
   
   
 
   renderer.render(scene, camera);
 }







render();
 


  return (
    <div >
      
    </div>
  )
}

export default Card
