uniform vec3 concreteColor;
uniform float roughness;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Simple diffuse lighting for concrete appearance
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);

    // Add subtle noise-like variation based on position for concrete texture
    float grain = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
    float grainEffect = mix(0.95, 1.05, grain) * (1.0 - roughness * 0.3);

    vec3 ambient = concreteColor * 0.3;
    vec3 diffuse = concreteColor * diff * 0.7 * grainEffect;

    gl_FragColor = vec4(ambient + diffuse, 1.0);
}
