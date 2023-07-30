// #version 300 es
// precision highp float;

// uniform vec3 lightDirection;
// uniform vec3 lightColor;
// uniform vec3 ambientColor;
// uniform sampler2D bumpMap;

// varying vec3 vNormal;
// varying vec3 vViewDir;

// void main() {
//     // Basic Lambertian lighting model (diffuse shading)
//     float diffuseIntensity = max(dot(vNormal, normalize(lightDirection)), 0.0);
//     vec3 diffuseComponent = lightColor * diffuseIntensity;

//     // Ambient color
//     vec3 ambientComponent = ambientColor;

//     // Bump mapping
//     vec3 bumpedNormal = texture(bumpMap, gl_FragCoord.xy / vec2(800.0, 600.0)).xyz * 2.0 - 1.0;
//     bumpedNormal = normalize(bumpedNormal + vNormal);

//     // Specular lighting (Blinn-Phong)
//     vec3 halfVec = normalize(lightDirection + vViewDir);
//     float specularIntensity = pow(max(dot(halfVec, bumpedNormal), 0.0), 32.0);
//     vec3 specularColor = vec3(1.0, 1.0, 1.0); // White specular highlights
//     vec3 specularComponent = lightColor * specularIntensity * specularColor;

//     // Final fragment color (combined diffuse, ambient, and specular)
//     vec3 concreteColor = vec3(0.7, 0.7, 0.7); // Adjust the color to your preference
//     vec3 finalColor = concreteColor * (diffuseComponent + ambientComponent) + specularComponent;

//     gl_FragColor = vec4(finalColor, 1.0);
// }
varying vec2 vUv;

void main() 
{
    gl_FragColor = vec4(vUv, 0.5, 0);
}