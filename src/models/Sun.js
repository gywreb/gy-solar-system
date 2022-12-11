import * as three from "three";

export default class Sun {
  constructor(texture, scene) {
    this.texture = texture;
    this.scene = scene;
  }

  initialize() {
    const textureLoader = new three.TextureLoader();

    const sunGeometry = new three.SphereGeometry(209, 400, 200);
    const sunSurface = new three.MeshStandardMaterial({
      emissive: 0xffd700, // glow color
      emissiveMap: textureLoader.load(this.texture),
      emissiveIntensity: 0.5, // glow intensity (default = 1)
    });
    const sunMesh = new three.Mesh(sunGeometry, sunSurface);
    this.scene.add(sunMesh);

    return { sunStar: sunMesh };
  }
}
