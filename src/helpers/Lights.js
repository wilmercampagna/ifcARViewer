import { AmbientLight, PointLight, SpotLight, DirectionalLight, HemisphereLight } from 'three';

class Lights {
    constructor(lightColor = 0xffffff) {   
        this.lightColor = lightColor;     
        this.ambient = new AmbientLight(lightColor, 0.5);
        this.pointLight = new PointLight({color: '#765CD6', intensity: 0.5, distance: 0 });
        this.pointLight.position.set( 0, 2, 0 );
        this.spotLight = new SpotLight( lightColor );
        this.hemisphere = new HemisphereLight(0xFFFFFF, 0xAAAAAA, 0.8);
        this.directionalLight = new DirectionalLight(lightColor, 1);
        this.pointLight.position.set( 10, 10, 0 );
        this.spotLight.position.set( 0, 10, 10 );
        this.directionalLight.position.set(0, 10, 0);
        this.directionalLight.target.position.set(-5, 0, 0);
        this.ambient.add(this.hemisphere);
        this.ambient.add(this.pointLight);
        this.ambient.add(this.spotLight);
        this.ambient.add(this.directionalLight); 
    }
}

export {Lights};