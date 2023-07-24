import { useRef, useEffect, useCallback } from 'react';
import * as React from 'react';
import World from './world';
import styled from 'styled-components';
import { defined } from './utils/type';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
`;

const Canvas = React.memo(styled.canvas`
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
margin: 0;
padding: 0;
`);

export default () => {
  const reactCanvas = useRef(null);
  const worldRef = useRef<World | null>(null);

  const initWorld = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!defined(canvas)) {
      return;
    }
    
    const world = new World(canvas);
    world.start();
    worldRef.current = world;
  }, []);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (!canvas) return;
    if (!defined(worldRef.current)) return;

		const world = worldRef.current;

    if (window) {
      window.addEventListener("resize", world.resize);
    }

    return () => {
      world.scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", world.resize);
      }
    };
  }, [worldRef.current]);

  return (
    <Wrapper>
      <Canvas ref={initWorld} />
    </Wrapper>
  );
};