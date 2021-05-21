import React from 'react';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import './UI-components/dropdown/Dropdown.css';
import './UI-components/button/Button.css';
import './UI-components/navbar/Navbar.css';
import './UI-components/footer/Footer.css';
import './UI-components/modal/Modal.css';
import './UI-components/form/Form.css';
import './css/bootstrap.min.css';
import './css/base/Effects.css';
import './css/base/Colors.css';
import './css/base/App.css';
import './css/index.css';
import App from './App';

if ('serviceWorker' in navigator) {
  typeof window !== 'undefined' && window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      // console.log('SW registered: ', registration);
    }).catch(registrationError => {
      // console.log('SW registration failed: ', registrationError);
    });
  });
}

loadableReady(() => {
  hydrate(<App />, document.getElementById('root'));
});

// hydrate(<App/>, document.getElementById('root'));
