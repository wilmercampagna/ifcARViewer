// #version 300 es

// in vec3 position;
// in vec3 normal;
// out vec3 vNormal;
// out vec3 vViewDir;

// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

// void main() {
//     Calculate the normal in view space and pass it to the fragment shader
//     vNormal = normalize(mat3(modelMatrix) * normal);

//     Calculate the view direction in view space and pass it to the fragment shader
//     vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
//     vViewDir = normalize(-viewPosition.xyz);

//     Calculate the final position of the vertex in clip space
//     gl_Position = projectionMatrix * viewPosition;
// }
uniform vec2 uFrequency;
uniform float uAmplitude;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(modelPosition.x * uFrequency.y - uTime) * 0.1;
    modelPosition.x += cos(modelPosition.x * uFrequency.x - uTime) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vUv = uv;
}