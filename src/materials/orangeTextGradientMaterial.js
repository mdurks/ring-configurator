import * as THREE from 'three'

export const orangeTextGradientMaterial = {
    uniforms: {
        colorTop: { value: new THREE.Color('#ffb732') },
        colorBottom: { value: new THREE.Color('#744500') },
    },
    vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 colorTop;
    uniform vec3 colorBottom;
    varying vec2 vUv;

    vec3 linearToSRGB(vec3 linearColor) {
      return pow(linearColor, vec3(1.0 / 2.9)); // Gamma correction with gamma value of 2.2
    }

    void main() {
      float gradient = smoothstep(-1.25, 1.25, vUv.y);
      vec3 color = mix(colorBottom, colorTop, gradient);
      color = linearToSRGB(color); // Convert to sRGB before output
      gl_FragColor = vec4(color, 1.0);
    }
  `,
}
