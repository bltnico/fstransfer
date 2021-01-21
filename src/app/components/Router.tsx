import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppProvider from 'app/components/AppProvider';
import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';

const Embed = lazy(() => import('app/components/Embed'));
const UploadProvider = lazy(() => import('upload/components/UploadProvider'));
const NextUpload = lazy(() => import('upload/components/NextUpload'));
const NextDownload = lazy(() => import('download/components/NextDownload'));

const Router = () => (
  <BrowserRouter>
    <AppProvider>
      <Navbar />
      <Switch>
        <Route path={'/embed'}>
          <Suspense fallback={null}>
            <Embed />
          </Suspense>
        </Route>
        <Route path={'/:id'}>
          <Suspense fallback={null}>
            <NextDownload />
          </Suspense>
        </Route>
        <Route path={'/'}>
          <Suspense fallback={null}>
            <UploadProvider>
              <NextUpload />
            </UploadProvider>
          </Suspense>
        </Route>
      </Switch>
      <Footer />
    </AppProvider>
  </BrowserRouter>
);

export default Router;
