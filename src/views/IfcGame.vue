<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import IfcThree from '../components/IfcThree.vue'
import {
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
} from 'three';
import { size, camera, cameraDolly, dummyCam } from '../helpers/Camera.js';
import { scene } from '../helpers/configs/Scene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import { JoyStick } from '../helpers/Toon3D.js';
import { MousePick } from '../helpers/MousePicker.js';
import Materials from '../helpers/Materials.js';

export default {
  name: 'IfcGame',
  components: {
    LoadIfcButton,
    IfcThree
},
  setup() {
    const canvas = ref(null);    
    const ifcModels = [];
    const ifcDataStructure = ref([]);
    setupIfcLoader(ifcLoader);
    const ifcManager = ifcLoader.ifcManager;

    let showIfcData = ref(false);
    const toggleIfcData = () => {
      showIfcData.value = !showIfcData.value;
    }

    // Getting custom materials
    const materials = new Materials();
    const lambMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.1, color: '#8050D7' });

    // Load a ifc file
    const loadIfcFile = async (change) => {
      const ifcURL = URL.createObjectURL(change.target.files[0]);
      const ifcModel = await ifcLoader.loadAsync(ifcURL);
      const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
      const modelId = ifcModel.modelID;
      ifcModel.material.push(materials.bricksWallMaterial);
      ifcModel.mesh.geometry.groups[0].materialIndex = 4;
      ifcModels.push(ifcModel);
      scene.add(modelCopy)
      scene.add(ifcModel)
      getIfcDataStructure(modelId);
    };
    
    //Config a ifcManager
    const getIfcDataStructure = async (modelId) => {
      const ifcData = await ifcManager.getSpatialStructure(modelId);
      ifcDataStructure.value.push(ifcData);
      console.log(ifcData)
    }

    const dataTester = () => {
      console.log(ifcDataStructure.value)
      console.log(ifcDataStructure.value[0])
    }

    onMounted(() => {


      // Creaeting the joystick
      const joystick = new JoyStick({
        onMove: (forward, turn) => {
          cameraDolly.translateZ(forward * -0.1);
          cameraDolly.rotateY(turn * -0.01);
        },
      });

     
      const cubeGeometry = new BoxGeometry(1, 1, 1);
      const cube = new Mesh(cubeGeometry, materials.whiteCeramicFloorMaterial);
      cube.position.set(0, 1, 0);
      // scene.add(cube);

      cube.material = materials.bricksWallMaterial;
      

      // Config the renderer      
      const renderer = new WebGLRenderer({ antialias: true, canvas: canvas.value, alpha: true });
      renderer.setSize(size.width, size.height);

      const outputId = document.getElementById('id-output');
			const outputDesc = document.getElementById('desc-output');
			const mousePicker = new MousePick(canvas.value, camera, ifcModels,
				ifcLoader, outputId, outputDesc)
			canvas.value.ondblclick = mousePicker;

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      animate();
      Resizer(size, renderer, camera);      

      return { canvas }
    })

    onBeforeUnmount(() => {
      const theJoystick = document.getElementById('joystick');
      document.body.removeChild(theJoystick);
    });

    return { canvas, loadIfcFile, dataTester, ifcDataStructure, toggleIfcData, showIfcData }
  }
};
</script>

<template>
  <div>
    <div class="relative ">
      <div class="pl-5 pr-5 w-full absolute">
        <div class="flex p-5 font-semibold justify-center text-cyan-600 hidden sm:flex">Ifc XR made for wilmercampagna
          <img src="../assets/logo.png" alt="Logo" class="h-5 w-5 mr-2 ml-2">
          in collaboration with GRUA
          <img src="../assets/grua.png" alt="Logo" class="h-6  mr-2 ml-2">
        </div>
        <LoadIfcButton :loadFunction="loadIfcFile" />
        <div class="" id="message-container">
          <p class="" id="id-output">_</p>
          <p class="" id="desc-output">_</p>
        </div>
        <div>
          <button class="bg-pink-500 text-white rounded-full p-1" @click="toggleIfcData"> Show data </button>
        </div>

        <div v-if="ifcDataStructure.length > 0 && showIfcData">
          <IfcThree :data="ifcDataStructure" />
          <!-- <div >
            <div v-for="model in ifcDataStructure">
              <h2> {{model.type}} {{ model.expressID }} </h2>
              <div>
                <h3>{{model.children[0].type}} {{ model.children[0].expressID }}</h3>
                <div>
                  <h4>{{model.children[0].children[0].type}} {{ model.children[0].children[0].expressID }}</h4>
                  <div v-for="el in model.children[0].children[0].children">
                    <p> {{ el.type }} {{ el.expressID }} </p>
                    <div v-for="subel in el.children">
                      <p> {{ subel.type }} {{ subel.expressID }} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        </div>

      </div>
      <div>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>
