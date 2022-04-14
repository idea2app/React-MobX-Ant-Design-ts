import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Home';

export default () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </HashRouter>
);
