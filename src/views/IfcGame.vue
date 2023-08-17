<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import IfcThree from '../components/IfcThree.vue'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import {
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
  PCFShadowMap,
  // RGBAFormat,
  ACESFilmicToneMapping,
  MeshPhongMaterial,  
  Group,
  PlaneHelper,
  Plane,
  Vector3,
  DoubleSide,
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

    const localPlane = new Plane( new Vector3( 0, - 1, 0 ), 1 );
		const globalPlane = new Plane( new Vector3( - 1, 0, 0 ), 2 );
		const globalPlane2 = new Plane( new Vector3( 0, -1, 0 ), 5 );
		const globalPlane3 = new Plane( new Vector3( 0, 1, 0 ), 5 );

    // const material = new MeshPhongMaterial( {
    //     clippingPlanes: [ localPlane ],
    //     clipShadows: true
    // } );
    // const clipHelpers = new Group();
    // clipHelpers.add( new PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
    // clipHelpers.add( new PlaneHelper( clipPlanes[ 1 ], 2, 0x00ff00 ) );
    // clipHelpers.add( new PlaneHelper( clipPlanes[ 2 ], 2, 0x0000ff ) );
    // clipHelpers.visible = true;
    const cubeMaterial = new MeshPhongMaterial( {
			color: 0x80ee10,
			shininess: 100,
			side: DoubleSide,
			// ***** Clipping setup (material): *****
			clippingPlanes: [ localPlane ],
			clipShadows: true
		} );
    // const cubeMaterial = materials.whiteCeramicFloorMaterial;
    // cubeMaterial.clippingPlanes = clipPlanes;
    const cubeGeometry = new BoxGeometry(2, 2, 2);
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 1, 0);

    // scene.add(clipHelpers);

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
      console.log(ifcModel)
      getIfcDataStructure(modelId);
    };
    
    //Config a ifcManager
    const getIfcDataStructure = async (modelId) => {
      const ifcData = await ifcManager.getSpatialStructure(modelId);
      ifcDataStructure.value.push(ifcData);
      const elements = ifcData.children[0].children[0].children;
      let elType = []
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i].children;
        elType.push(...element)
      }
      const uniqueTypes = []
      const unique = elType.filter(el => {
        const isDuplicate = uniqueTypes.includes(el.type);
        if (!isDuplicate) {
          uniqueTypes.push(el.type);
        }
      })
      console.log(uniqueTypes)
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

      
      // ***** Clipping setup (renderer): *****
			// const globalPlanes = [ globalPlane ],
      // Empty = Object.freeze( [] );
      renderer.clippingPlanes = [ globalPlane, globalPlane2, globalPlane3 ];
			// renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
			renderer.localClippingEnabled = true;
      
      scene.add(cube);

      const dControl = new DragControls([cube], camera, canvas.value);
      dControl.addEventListener('dragstart', function (event) {
        event.object.material.opacity = 0.1;
      });
      dControl.addEventListener('dragend', function (event) {
        event.object.material.opacity = 1;
      });

      // function to move the cube in z in the scene pressing up and down arrow
      

      // cube.material = materials.concreteMaterial;
                  
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
