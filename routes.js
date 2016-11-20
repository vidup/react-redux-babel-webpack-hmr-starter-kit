import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Index from './containers/Index';
import Map from './containers/Map';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route component={Map} />
  </Route>
);
// <Route path="/logs" component={Logs} />
