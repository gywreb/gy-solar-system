import * as three from "three";

export default class Moon {
  constructor(surface, bump) {
    this.moonSurface = surface;
    this.moonBump = bump;
  }

  initialize() {
    const textureLoader = new three.TextureLoader();

    const moonGeometry = new three.SphereGeometry(5, 40, 20);
    const moonMaterial = new three.MeshPhongMaterial({
      map: textureLoader.load(this.moonSurface),
      bumpMap: textureLoader.load(this.moonBump),
      bumpScale: 0.5,
    });

    const moonMesh = new three.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(40, 0, 0);

    return { moonSatellite: moonMesh };
  }
}
