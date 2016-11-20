import React, {Component, PropTypes} from 'react';
import Index from './Index';

import styles from './index.css';

class App extends Component {
  static propTypes = {

  };
  render() {
    return (
      <div className={styles.main}>
       <Index />
      </div>
    );
  }
}

export default App;
