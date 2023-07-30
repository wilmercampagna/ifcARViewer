import { MeshStandardMaterial, 
    MeshPhongMaterial, 
    DoubleSide,
    ShaderMaterial,
    Vector2,
    Vector3
} from "three";
import vertexConcrete from '../shaders/concrete/vertex.glsl';
import fragmentConcrete from '../shaders/concrete/fragment.glsl';

class Materials{
    constructor(){}
    bricksWallMaterial = new MeshPhongMaterial({
        color: '#9F6E65',
        shininess: 4,
        specular: '#7e4444',
        side: DoubleSide,
        emissive: '#231f1f',
        // map: bricks,
    });
    whiteCeramicFloorMaterial = new MeshStandardMaterial({
        color: '#d2ccad',
        side: DoubleSide,
        roughness: 0,
        metalness: 0.2,
        emissive: '#503926',
        depthTest: true,
    });
    concreteMaterial = new ShaderMaterial({
        uniforms: {
            concreteColor: { value: new Vector3(0.75, 0.75, 0.75) }, // Default gray color
            roughness: { value: 0.5 }, // Default roughness value
        },
        vertexShader: vertexConcrete,
        fragmentShader: fragmentConcrete,
    });
}

export default Materials;