import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import LoadingOverlay from 'components/LoadingOverlay';
import RecoilNexus, { getRecoil } from 'recoil-nexus';
import './i18n';
import { ConfigProvider } from 'antd';
import { localeState } from 'recoils/localeState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <RecoilNexus />
    <React.Suspense fallback={<LoadingOverlay isSuspense={true} />}>
      <BrowserRouter>
        <LoadingOverlay />
        <App />
      </BrowserRouter>
    </React.Suspense>
  </RecoilRoot>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
