import { HashRouter, Route, Routes } from 'react-router-dom';

import { PageBox } from '../component/PageBox';
import { HomePage } from './Home';
import { PaginationPage } from './Pagination';
import { ScrollListPage } from './ScrollList';

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
      <Route
        path="/scroll-list"
        element={
          <PageBox narrow>
            <ScrollListPage />
          </PageBox>
        }
      />
    </Routes>
  </HashRouter>
);
