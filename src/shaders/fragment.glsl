// Varyings (data received from the vertex shader)
varying vec3 vNormal;

void main() {
    // Basic Lambertian lighting model (diffuse shading)
    vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
    float diffuseIntensity = max(dot(normalize(vNormal), lightDirection), 0.0);
    vec3 diffuseColor = vec3(1.0, 0.5, 0.0);
    
    // Output the final fragment color
    gl_FragColor = vec4(diffuseColor * diffuseIntensity, 1.0);
}