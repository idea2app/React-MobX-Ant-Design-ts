import { HashRouter, Route, Routes } from 'react-router-dom';

import { PageBox } from '../component/PageBox';
import HomePage from './Home';
import { PaginationPage } from './Pagination';

export default () => (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PageBox narrow>
            <HomePage />
          </PageBox>
        }
      />
      <Route
        path="/pagination"
        element={
          <PageBox narrow>
            <PaginationPage />
          </PageBox>
        }
      />
    </Routes>
  </HashRouter>
);
