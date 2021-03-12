import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import store from "./store";
import Router from "./router";
import './mock'

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  );
};

export default App;
