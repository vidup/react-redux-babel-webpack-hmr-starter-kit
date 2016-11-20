import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './configureStore';
import routes from './routes';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import browserHistory from './browserHistory';

// injectTapEventPlugin();

import 'whatwg-fetch';

// import 'normalize.css/normalize.css';
// import './styles/fonts/fonts.css';
// import 'react-datepicker/dist/react-datepicker.css';

import numbro from 'numbro';
import culture from 'numbro/languages/fr-FR';
numbro.culture('fr-FR', culture);
numbro.culture('fr-FR');

import moment from 'moment';
import localeFr from 'moment/locale/fr';
moment.updateLocale('fr', localeFr);
moment.locale('fr');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
