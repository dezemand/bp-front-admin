import 'react-app-polyfill/ie11';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './utils/fa'
import * as serviceWorker from './serviceWorker'

if(window.document.location.protocol === "http:"
  && window.document.location.port !== "3000")
  window.document.location.replace(window.document.location.href.replace("http", "https"));

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
