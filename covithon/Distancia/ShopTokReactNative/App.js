import * as React from 'react';
import { Provider } from 'react-redux'

import createStore from './src/store'
import AppContainer from './src/containers/AppContainer';

const store = createStore();


export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
