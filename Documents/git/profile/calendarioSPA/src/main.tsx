import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Calendar from './Calendar';
import './index.css'
import './calendar.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Calendar />
  </React.StrictMode>,
)
