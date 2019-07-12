import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainContainer, NotFoundContainer } from './containers';

export default () => (
  <Switch>
    <Route exact path="/" component={MainContainer} />
    <Route component={NotFoundContainer} />
  </Switch>
);
