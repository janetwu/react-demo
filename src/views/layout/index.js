import React, {  } from 'react';
import { Layout, } from 'antd';
import Content from './Content'
import Header from './Header'
import Sider from './Sider'
const { Footer, } = Layout;

export default (props) => {
  return (
    <Layout style={{height: '100vh'}}>
      <Sider/>
      <Layout>
        <Header />
        <Content />
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}