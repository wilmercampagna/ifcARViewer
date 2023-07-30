<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import IfcThree from '../components/IfcThree.vue'
import {
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
  PCFShadowMap,
  // RGBAFormat,
  ACESFilmicToneMapping,
} from 'three';
import { size, camera, cameraDolly } from '../helpers/Camera.js';
import { scene } from '../helpers/configs/Scene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import { JoyStick } from '../helpers/Toon3D.js';
import { MousePick } from '../helpers/MousePicker.js';
import Materials from '../helpers/Materials.js';
import { useStore } from '../store/index.js';
import ModelsTransform from '../helpers/TransformModels.js';

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

    const store = useStore();

    // Getting custom materials
    const materials = new Materials();
    const lambMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.1, color: '#8050D7' });

    const modTransform = new ModelsTransform(ifcModels);
    const moveModels = modTransform.moveModels;

    // Config the geometry     
    const cubeGeometry = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(cubeGeometry, materials.whiteCeramicFloorMaterial);
    cube.position.set(0, 1, 0);

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

      // Config the renderer      
      const renderer = new WebGLRenderer({ antialias: true, canvas: canvas.value, alpha: true });
      renderer.setSize(size.width, size.height);
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = PCFShadowMap
      renderer.useLegacyLights = true
      // renderer.outputColorSpace = RGBAFormat 
      renderer.toneMapping = ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      
      scene.add(cube);

      // function to move the cube in z in the scene pressing up and down arrow
      

      cube.material = materials.concreteMaterial;
                  
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

    return { canvas, loadIfcFile, dataTester, ifcDataStructure,
      store, moveModels
    }
  }
};
</script>

<template>
  <div>
    <div class="relative ">
      <div class="p-5 mt-10 w-full absolute">
        <div class="flex p-5 font-semibold justify-center text-cyan-600 hidden sm:flex">Ifc XR made for wilmercampagna
          <button @click="moveModels">
            <img src="../assets/logo.png" alt="Logo" class="h-5 w-5 mr-2 ml-2">
          </button>
          in collaboration with GRUA
          <button >
            <img src="../assets/grua.png" alt="Logo" class="h-6  mr-2 ml-2">
          </button>
        </div>
        <LoadIfcButton :loadFunction="loadIfcFile" />
        
        <div class="" id="message-container">
          <p class="" id="id-output">_</p>
          <p class="" id="desc-output">_</p>
        </div>
        <div v-if="ifcDataStructure.length > 0 && store.showIfcData">
          <IfcThree :data="ifcDataStructure" />          
        </div>
        
      </div>
      <div>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>
