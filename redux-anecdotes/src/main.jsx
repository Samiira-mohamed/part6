import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)