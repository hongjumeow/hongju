import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Hongju from './Hongju';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Hongju />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
