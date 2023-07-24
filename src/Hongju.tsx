import { useRef, useEffect, useState, MutableRefObject } from 'react';
import World from './world';

export default () => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (!canvas) return;

		const world = new World(canvas);
		world.start();

    if (window) {
      window.addEventListener("resize", world.resize);
    }

    return () => {
      world.scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", world.resize);
      }
    };
  }, []);

  return <canvas ref={reactCanvas} />;
};