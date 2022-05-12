import React from 'react'
import ReactDOM from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from './services/reducers'
import App from './components/app'
import { socketMiddleware } from './middleware/socketMiddleware'
import { userSocketMiddleware } from './middleware/userSocketMiddleware'
import './index.css'
import 'simplebar/dist/simplebar.min.css'
import './assets/css/simplebar.css'

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware('wss://norma.nomoreparties.space/orders/all'),
  userSocketMiddleware('wss://norma.nomoreparties.space/orders')
))
export const store = createStore(
  rootReducer,
  enhancer
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
