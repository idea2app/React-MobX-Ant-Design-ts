import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Home';
import { PaginationPage } from './Pagination';

export default () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pagination" element={<PaginationPage />} />
    </Routes>
  </HashRouter>
);
