import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Hongju from './Hongju.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Hongju 
            antialias={false}
            engineOptions={null}
            adaptToDeviceRatio={true}
            sceneOptions={null}
            onRender={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
