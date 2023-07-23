import React, { useRef, useEffect, useState, MutableRefObject } from 'react';
import World from './world.ts';

export default ({
	antialias,
	engineOptions,
	adaptToDeviceRatio,
	sceneOptions,
	onRender,
	...rest
}) => {
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
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender]);

  return <canvas ref={reactCanvas} {...rest} />;
};