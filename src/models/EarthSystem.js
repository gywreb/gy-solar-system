import * as three from "three";

export default class EarthSystem {
  constructor(
    scene,
    earth,
    atmosphere,
    orbit,
    orbitCurve,
    moon,
    sun,
    pointLight,
    renderer,
    camera,
    stats,
    effect
  ) {
    this.earth = earth;
    this.atmosphere = atmosphere;
    this.orbit = orbit;
    this.orbitCurve = orbitCurve;
    this.moon = moon;
    this.sun = sun;
    this.scene = scene;
    this.pointLight = pointLight;
    this.renderer = renderer;
    this.camera = camera;
    this.stats = stats;
    this.effect = effect;
    this.loopTime = 1; // 1 year for each orbit around sun
    this.earthOrbitSpeed = 0.00001;
    this.moonOrbitRadius = 55;
    this.moonOrbitSpeed = 80;
    this.earthSystem = new three.Group();
  }

  initialize() {
    this.earthSystem.add(this.earth, this.atmosphere, this.moon);

    this.scene.add(this.earthSystem, this.orbit);

    // cast shadow on earth system
    this.renderer.shadowMap.enabled = true; // renderer will render shadows
    this.pointLight.castShadow = true; // point light can cast shadows

    // set up shadow properties for the point light
    this.pointLight.shadow.mapSize.width = 512; // width of shadow map, higher # = better quality
    this.pointLight.shadow.mapSize.height = 512; // height of shadow map, higher # = better quality
    this.pointLight.shadow.camera.near = 150; // shadows start 150m from light
    this.pointLight.shadow.camera.far = 750; // shadows end 350m from light

    // how can objects interact with shadows
    this.earth.castShadow = true; // earth can cast shadow
    this.earth.receiveShadow = true; // earth can receive shadow
    this.atmosphere.receiveShadow = true; // atmosphere can receive shadows
    this.moon.castShadow = true;
    this.moon.receiveShadow = true;
  }

  orbitAnimate() {
    const time = this.earthOrbitSpeed * performance.now(); // time in ms * value to slow orbit
    const t = time % this.loopTime; // ranges from 0 - 1

    let p = this.orbitCurve.getPoint(t); // at given time, where the point in the orbit curve -> return a vector(x, y)

    this.earthSystem.position.x = p.x; // set x position of earthSystem at point on curve
    this.earthSystem.position.z = p.y; // set y position of earthSystem at point on curve

    // move moon around earth; moon orbits around earthSystem position
    this.moon.position.x =
      -Math.cos(time * this.moonOrbitSpeed) * this.moonOrbitRadius;
    this.moon.position.z =
      -Math.sin(time * this.moonOrbitSpeed) * this.moonOrbitRadius;

    // rotate earth and sun on axis
    this.sun.rotation.y += 0.0008;
    this.earth.rotation.y += 0.0015;
    this.atmosphere.rotation.y += 0.0025;
    this.moon.rotation.y += 0.005;

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
    this.effect.render();

    requestAnimationFrame(this.orbitAnimate.bind(this));
  }
}
