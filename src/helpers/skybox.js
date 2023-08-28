import {TextureLoader, MeshBasicMaterial, BoxGeometry, Mesh, BackSide} from 'three';

//Create the skybox
let materialArray = [];
let texture_ft = new TextureLoader().load('skybox/meadow_ft.jpg');
let texture_bk = new TextureLoader().load('skybox/meadow_bk.jpg');
let texture_up = new TextureLoader().load('skybox/meadow_up.jpg');
let texture_dn = new TextureLoader().load('skybox/meadow_dn.jpg');
let texture_rt = new TextureLoader().load('skybox/meadow_rt.jpg');
let texture_lf = new TextureLoader().load('skybox/meadow_lf.jpg');

materialArray.push(new MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new MeshBasicMaterial( { map: texture_up }));
materialArray.push(new MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = BackSide;

let skyboxGeo = new BoxGeometry( 10000, 10000, 10000);
let skyBox = new Mesh( skyboxGeo, materialArray );

export default skyBox;