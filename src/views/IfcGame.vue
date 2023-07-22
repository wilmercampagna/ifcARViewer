<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
  MeshLambertMaterial,
  Mesh,
  WebGLRenderer,
} from 'three';
import { size, camera, cameraDolly, dummyCam } from '../helpers/Camera.js';
import { scene } from '../helpers/configs/Scene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import { JoyStick } from '../helpers/Toon3D.js';

export default {
  name: 'IfcGame',
  components: {
    LoadIfcButton,
  },
  setup() {
    const canvas = ref(null);
    const ifcModels = [];
    setupIfcLoader(ifcLoader);

    const lambMaterial = new MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

    const loadIfcFile = async (change) => {
      const ifcURL = URL.createObjectURL(change.target.files[0]);
      const ifcModel = await ifcLoader.loadAsync(ifcURL);
      const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
      ifcModels.push(ifcModel);
      scene.add(modelCopy)
      scene.add(ifcModel)
    };

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

    return { canvas, loadIfcFile }
  }
};
</script>

<template>
  <div>
    <div class="relative ">
      <div class="pl-5 pr-5 w-full absolute">
        <div class="flex p-5 font-semibold justify-center text-cyan-600 hidden sm:flex">Ifc XR made for wilmercampagna
          <img src="logo.png" alt="Logo" class="h-5 w-5 mr-2 ml-2">
          in collaboration with GRUA
          <img src="../assets/grua.png" alt="Logo" class="h-6  mr-2 ml-2">
        </div>
        <LoadIfcButton :loadFunction="loadIfcFile" />
        <div class="" id="message-container">
          <p class="" id="id-output">_</p>
          <p class="" id="desc-output">_</p>
        </div>
      </div>
      <div>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>
