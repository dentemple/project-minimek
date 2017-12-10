# Redux course

* Bootstrap with Create React App
* Add packages
  * redux, react-redux, redux-thunk, reselect, lodash
* Configure an offline mirror of packages
  * Create `.yarnrc` file
  * Add:
    * yarn-offline-mirror "./offline-mirror"
    * yarn-offline-mirror-pruning true
  * Re-install packages
* Add License & README
* Configure store

```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

export default function configureStore(preloadedState) {
  const middlewares = [thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const storeEnhancers = [middlewareEnhancer]
  const composedEnhancer = compose(...storeEnhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  return store
}
```

* Configure a test reducer

```js
const initialState = {
  data: 42
}

export default function testReducer(state = initialState, action) {
  return state
}
```

```js
import { combineReducers } from 'redux'
import testReducer from './testReducer'

const rootReducer = combineReducers({
  test: testReducer
})

export default rootReducer
```

* Configure the provider

```js
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

* Add a sample component

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

class SampleComponent extends Component {
  render() {
    const { data } = this.props
    return <div>Data from Redux: {data}</div>
  }
}

const mapState = state => {
  data: state.test.data
}

export default connect(mapState)(SampleComponent)
```

* Configure `redux-devtools-extension`

```git
- import {createStore, applyMiddleware, compose} from "redux";
+ import {createStore, applyMiddleware} from "redux";
+ import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


- const composedEnhancer = compose(...storeEnhancers);
+ const composedEnhancer = composeWithDevTools(...storeEnhancers);
```

* Configure HMR

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import configureStore from './store/configureStore'

const store = configureStore()

// Save a reference to the root element for reuse
const root = document.getElementById('root')

// Create a reusable render method
let render = () => {
  // Dynamically import and render
  const App = require('./App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

// Configure HMR
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      setTimeout(render)
    })
  }
}

render()
```

* Configure HMR for the store

```git
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

+   if(process.env.NODE_ENV !== "production") {
+       if(module.hot) {
+           module.hot.accept("../reducers/rootReducer", () =>{
+               const newRootReducer = require("../reducers/rootReducer").default;
+               store.replaceReducer(newRootReducer)
+           });
+       }
+   }

    return store;
```
