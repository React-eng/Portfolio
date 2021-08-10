import React from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
function About() {


  
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
   var model2;
   loader.load(
     "https://raw.githubusercontent.com/baronwatts/models/master/real-tree.glb",
      function(gltf) {
 
        gltf.scene.traverse( function( node ) {
           if ( node instanceof THREE.Mesh ) { 
             node.castShadow = true; 
             node.material.side = THREE.DoubleSide;
           }
         });
 
        
         model2 = gltf.scene;
         model2.scale.set(4,4,4);
         
        
         
  
        
         scene.add(model2);


           
        

 
 
       
     
 
     
    










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









  return (
    <div>
      
    </div>
  )
  }

export default About


