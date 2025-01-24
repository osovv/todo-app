import { I18nextProvider } from "react-i18next";
import { i18n } from ".././i18n";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const reactRoot = createRoot(document.querySelector('#root')!);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
