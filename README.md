# Modern React project starter Kit

This is a first version a of starter kit for modern React & Redux applications.
It uses webpack to bundle. For now, it's only for development use.

To use it, just clone the repository and use `yarn start` (or npm if you still use it).
# Main features :

- React, Redux, Immutable.
- Webpack bundling, with Hot Module Replacement, through an express server, thanks to the webpack-dev-middleware.
- Contains a preset browserHistory object (based on the `history` package), which you can use to handle your user history.

```
browserHistory.push({ pathname: '/newPath' });
```
which allows the user to come back to the page he previously in, or :
```
browserHistory.replace({ pathname: '/newPath' });
```
which replace the current page by the new one, preventing the user to come back, or :
```
browserHistory.push({
  pathname: '/newPath',
  search: '?the=query',
})
```
The search property allows you to add a queryString to the new page.

- A routing also present, which allows you to add containers to specific routes.

```
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Index from './containers/Index';
import Map from './containers/Map';

<Route path="/" component={App}>
  <IndexRoute component={Index} />
  <Route component={Map} />
</Route>
```

- Redux stores are pre-configured to be combined, following the official documentation.

- Actions are transformed into asynchronous functions by the redux-thunk middleware. It looks like this.

```
import services from '../services';

const fetchData = () => async (dispatch) => {
  dispatch({ type: 'BOOKING_DATA_PENDING' });

  let data;
  try {
    data = await services.data.fetch();
  } catch (error) {
    dispatch({ type: 'BOOKING_FETCH_FULFILLED', data: null, error });
    return;
  }
  dispatch({ type: 'BOOKING_FETCH_FULFILLED', data, error: null });
};
```
The same ```BOOKING_FETCH_FULFILLED``` action is emitted whether or not the fetching (from a service file dedicated to it)
actually worked. The only difference is in the data and error passed within it. You need to take this into consideration in the reducer.

- Redux & React linking packages are shipped.
- Class properties are allowed, which means, among other things, that you can add static properties to your React (and plain JS) classes.

```
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class ReactContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = ({ stuffReducer, userReducer, etc... }) => ({
  data: stuffReducer.get('data'),
});

export default connect(mapStateToProps)(ReactContainer);
```


# TODO

- Better README
- Add Tests to the starter kit.
