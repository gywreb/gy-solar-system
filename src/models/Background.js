import * as three from "three";

export default class Background {
  constructor(texture, scene) {
    this.texture = texture;
    this.scene = scene;
  }

  initialize() {
    const textureLoader = new three.TextureLoader();

    // make bg mesh
    const bgGeometry = new three.SphereGeometry(2000, 100, 100);
    const bgMaterial = new three.MeshStandardMaterial({
      map: textureLoader.load(this.texture),
      side: three.DoubleSide, // texture shows on both sides
    });
    const bg = new three.Mesh(bgGeometry, bgMaterial);
    this.scene.add(bg);
  }
}
