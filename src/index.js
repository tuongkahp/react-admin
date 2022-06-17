import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import LoadingOverlay from 'components/LoadingOverlay';
import RecoilNexus from 'recoil-nexus';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<>Loading...</>}>
      <RecoilRoot>
        <RecoilNexus />
        <BrowserRouter>
          <LoadingOverlay />
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
