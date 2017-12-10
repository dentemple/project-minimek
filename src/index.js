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
