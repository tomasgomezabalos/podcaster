import './index.css';

import {ConfigProvider} from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {worker} from '../mocks/browser';

import App from './App';
import store from './redux/store';

if (process.env.NODE_ENV === 'test') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorTextDescription: '#607786'
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
