import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass";
import Stats from "three/examples/jsm/libs/stats.module";

export default class Scene {
  constructor(fov = 60) {
    this.fov = fov; // field of view in vertical degrees
  }

  initialize() {
    // scene container for 3d elements
    this.scene = new three.Scene();

    // eye level camera
    this.camera = new three.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight, // ratio of image width to height
      0.1, // near: distance from camera to objects starts to appear
      4000 // far: distance from camera to objects stops appearing
    );
    this.camera.position.set(0, 30, 500);

    // renderer for animation and 3d elements
    this.renderer = new three.WebGLRenderer({
      canvas: document.querySelector("#solarSystem"),
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    // lighting for 3d elements
    const ambientLight = new three.AmbientLight(0x222222); // no shadows
    this.scene.add(ambientLight);

    this.pointLight = new three.PointLight(0xffffff); // shadows
    this.scene.add(this.pointLight);

    // user interaction with dom events like mouses, keyboard, .etc
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // bloom after effect
    // render pass == pass 1
    this.renderPass = new RenderPass(this.scene, this.camera);
    // bloom pass
    this.bloomPass = new UnrealBloomPass(
      new three.Vector2(window.innerWidth, window.innerHeight), // scene illusion ??
      1.5, // intensity
      0.4, // radius
      0.85 // pixel emit the bloom
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0.5; // intensity of glow
    this.bloomPass.radius = 2.5; // radius of glow

    this.effectComposer = new EffectComposer(this.renderer);
    this.effectComposer.setSize(window.innerWidth, window.innerHeight);
    this.effectComposer.renderToScreen = true;
    // add after effect to renderer
    this.effectComposer.addPass(this.renderPass);
    this.effectComposer.addPass(this.bloomPass);

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
