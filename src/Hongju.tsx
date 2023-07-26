import * as React from 'react';
import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { defined } from './utils/type';

import World from './world';
import Controller from './ui/controller';

const MainUI = styled.div`
    position: relative;
    flex: 1;
    width: 100vw;
    height: 100vh;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const CanvasWrapper = styled.div`
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
  const worldRef = useRef<World | null>(null);

  const initWorld = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!defined(canvas)) {
      return;
    }
    
    const world = new World(canvas);
    world.start();
    worldRef.current = world;
  }, []);

  // handle window resize
  useEffect(() => {
    if (!defined(worldRef.current)) return;
		const world = worldRef.current;

    if (window) {
      window.addEventListener("resize", world.resize);
    }
  }, [window]);

  const onClickController = useCallback(() => {
		const world = worldRef.current;
    if (!defined(world)) return;
    world.dropMarbles();
  }, []);

  return (
    <MainUI>
      <CanvasWrapper>
        <Canvas ref={initWorld} />
      </CanvasWrapper>
      <Controller onClickFuncs={[onClickController]}/>
    </MainUI>
  );
};