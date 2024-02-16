import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserAuthState from './states/authState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthState>
      <App />
    </UserAuthState>
  </React.StrictMode>,
)
