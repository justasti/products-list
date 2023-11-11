import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './app/App.tsx'
import { reduxStore } from './state/store.ts'
import './styles.css'

let persistor = persistStore(reduxStore)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
