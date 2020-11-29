import React from 'react'
import { render } from 'react-dom'
import { StateProvider } from './state/state'
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'

render(
  <Router>
    <StateProvider>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root'),
)
