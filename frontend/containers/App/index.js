/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import HomePage from '../../containers/HomePage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

import Header from '../../components/Header';

const App = () => (
  <div>
    <Helmet titleTemplate="%s - Insurance" defaultTitle="Insurance">
      <meta name="description" content="A risk type management platform" />
    </Helmet>
    <Header />
    <Container>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </Container>
  </div>
);

export default App;
