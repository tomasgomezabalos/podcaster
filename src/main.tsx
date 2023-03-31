import './index.css';

import {ConfigProvider} from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import store from './redux/store';

if (process.env.NODE_ENV === 'test') {
  const {worker} = await import('../mocks/browser');
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
