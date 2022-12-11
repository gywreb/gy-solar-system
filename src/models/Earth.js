import * as three from "three";

export default class Earth {
  constructor(surface, bump, spec, cloud) {
    this.surfaceTexture = surface;
    this.bumpTexture = bump;
    this.specTexture = spec;
    this.cloud = cloud;
  }

  initialize() {
    const radius = 25; // radius of earth, r + 1 is radius of atmosphere
    const segments = {
      width: 50,
      height: 50,
    }; // widrh segments, height segments sphere geometry
    const tilt = 0.41; // earth, atmosphere, axis line tilt in radians

    const textureLoader = new three.TextureLoader();
    const earthSurface = textureLoader.load(this.surfaceTexture);
    const earthBump = textureLoader.load(this.bumpTexture);
    const earthSpec = textureLoader.load(this.specTexture);

    const earthGeometry = new three.SphereGeometry(
      radius,
      segments.width,
      segments.height
    );

    // phone material for shininess element
    const earthMaterial = new three.MeshPhongMaterial({
      map: earthSurface, // color map
      bumpMap: earthBump, // affects lighting to give depth
      bumpScale: 0.5, // how bumpy bump map will look
      specularMap: earthSpec, // how shiny material looks
      shininess: 0.5, // shininess/reflectivity of specular highlight
    });

    const earthMesh = new three.Mesh(earthGeometry, earthMaterial);

    earthMesh.position.z = tilt;

    const earthCloudGeometry = new three.SphereGeometry(
      radius + 0.5,
      segments.width,
      segments.height
    );

    const earthCloudMaterial = new three.MeshPhongMaterial({
      map: textureLoader.load(this.cloud),
      transparent: true,
      opacity: 0.3,
    });

    const earthCloudMesh = new three.Mesh(
      earthCloudGeometry,
      earthCloudMaterial
    );

    earthCloudMesh.position.z = tilt;

    const orbitCurve = new three.EllipseCurve(
      0,
      0, // center x, y
      350,
      400, // radius x, y
      0,
      2 * Math.PI // start, end angles (0, 360 degree)
    );

    const orbitPoints = orbitCurve.getSpacedPoints(200); // divide curve into 200 even pieces, gets array of points

    const orbitGeometry = new three.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new three.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });

    const orbitLine = new three.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotateX(-Math.PI / 2); // rotate -90 degrees to orbit around y axis

    return {
      earthPlanet: earthMesh,
      earthAtmosphere: earthCloudMesh,
      earthOrbit: orbitLine,
      earthOrbitCurve: orbitCurve,
    };
  }
}
