import { MeshStandardMaterial, MeshPhongMaterial, DoubleSide } from "three";

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
}

export default Materials;