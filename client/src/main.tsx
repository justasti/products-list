import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import App from './app/App.tsx'
import { reduxStore } from './app/store.ts'
import './styles.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
)
