import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppProvider from 'app/components/AppProvider';
import PwaInstallBanner from 'app/components/PwaInstallBanner';
import Loader from 'app/components/Loader';
import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';
import useDefaultInstalledAppSize from 'app/hooks/useDefaultInstalledAppSize';
import UploadProvider from 'upload/components/UploadProvider';
import Upload from 'upload/components/Upload';

const Versus = lazy(() => import('app/components/Versus'));
const Embed = lazy(() => import('app/components/Embed'));
const About = lazy(() => import('app/components/About'));
const InsecureContextProvider = lazy(() => import('download/components/InsecureContextProvider'));
const Download = lazy(() => import('download/components/Download'));

const Router = () => {
  useDefaultInstalledAppSize();

  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <Switch>
          <Route path={'/embed'}>
            <Suspense fallback={<Loader />}>
              <Embed />
            </Suspense>
          </Route>
          <Route path={'/versus-wetransfer'}>
            <Suspense fallback={<Loader />}>
              <Versus />
            </Suspense>
          </Route>
          <Route path={'/about'}>
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          </Route>
          <Route path={'/:id'}>
            <Suspense fallback={<Loader />}>
              <InsecureContextProvider>
                <Download />
              </InsecureContextProvider>
            </Suspense>
          </Route>
          <Route path={'/'}>
            <UploadProvider>
              <Upload />
            </UploadProvider>
          </Route>
        </Switch>
        <Footer />
        <PwaInstallBanner />
      </AppProvider>
    </BrowserRouter>
  );
}

export default Router;
