import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Footer from 'app/components/Footer';
import UploadProvider from 'upload/components/UploadProvider';
import NextUpload from 'upload/components/NextUpload';
import NextDownload from 'download/components/NextDownload';

const Router = () => (
  <BrowserRouter basename={'/projets/e2etransfer'}>
    <Switch>
      <Route path={'/:id'}>
        <NextDownload />
      </Route>
      <Route path={'/'}>
        <UploadProvider>
          <NextUpload />
        </UploadProvider>
      </Route>
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Router;
