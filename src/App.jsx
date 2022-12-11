import React, { useEffect } from "react";
import Background from "./models/Background";
import Earth from "./models/Earth";
import EarthSystem from "./models/EarthSystem";
import Moon from "./models/Moon";
import Scene from "./models/Scene";
import Sun from "./models/Sun";

const App = () => {
  useEffect(() => {
    const solarSystem = new Scene();
    solarSystem.initialize();

    const milkyWay = new Background(
      "/src/assets/milkyway.jpg",
      solarSystem.scene
    );
    milkyWay.initialize();

    const sun = new Sun("/src/assets/planets/sun/sun.jpeg", solarSystem.scene);
    const { sunStar } = sun.initialize();

    const earth = new Earth(
      "/src/assets/planets/earth/earthmap1k.jpg",
      "/src/assets/planets/earth/earthbump1k.jpg",
      "/src/assets/planets/earth/earthspec1k.jpg",
      "/src/assets/planets/earth/earthcloudmap.jpeg"
    );

    const { earthPlanet, earthAtmosphere, earthOrbit, earthOrbitCurve } =
      earth.initialize();

    const moon = new Moon(
      "/src/assets/planets/moon/moonmap1k.jpg",
      "/src/assets/planets/moon/moonbump1k.jpg"
    );

    const { moonSatellite } = moon.initialize();

    const earthSystem = new EarthSystem(
      solarSystem.scene,
      earthPlanet,
      earthAtmosphere,
      earthOrbit,
      earthOrbitCurve,
      moonSatellite,
      sunStar,
      solarSystem.pointLight,
      solarSystem.renderer,
      solarSystem.camera,
      solarSystem.stats,
      solarSystem.effectComposer
    );

    earthSystem.initialize();

    earthSystem.orbitAnimate();
  }, []);

  return (
    <div className="solarSystem-container">
      <canvas id="solarSystem"></canvas>
    </div>
  );
};

export default App;
