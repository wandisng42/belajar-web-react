import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: "#ffffff",
          },
          links: {
            enable: true,
            color: "#ffffff",
            distance: 150,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}