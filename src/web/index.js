import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { LoadingFallback } from './lazy-loaders/LoadingFallback';
import './UI-components/dropdown/Dropdown.css';
import './UI-components/button/Button.css';
import './UI-components/navbar/Navbar.css';
import './UI-components/footer/Footer.css';
import './UI-components/modal/Modal.css';
import './UI-components/form/Form.css';
import './info-pages/InfoPage.css';
import './css/bootstrap.min.css';
import './css/base/Effects.css';
import './css/base/Colors.css';
import './css/base/App.css';
import './error/Error.css';
import './css/index.css';
import './utils/i18n';
import App from './App';

if ('serviceWorker' in navigator && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // console.log('SW registered: ', registration);
    }).catch(registrationError => {
      // console.log('SW registration failed: ', registrationError);
    });
  });
}

// reportWebVitals(console.log());

render(
  <Suspense fallback={<LoadingFallback/>}>
    <App/>
  </Suspense>, document.getElementById('root'));
