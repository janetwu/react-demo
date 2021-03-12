import React, {  } from 'react';
import { connect } from "react-redux";
import { Layout, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { toggleCollapse } from '@/store/actions'
import logo from '@/assets/images/logo.png'
const { Header, } = Layout;

export default connect(
  (state) => state.setting,
  {toggleCollapse}
)((props) => {console.log('Header')
  const {collapse, toggleCollapse} = props
  return (
    
        <Header 
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff', 
            padding: '0 20px 0', 
            maring: '0'
          }}
        >
          <Button type="primary" onClick={toggleCollapse} style={{ marginRight: 10}}>
            {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <img src={logo}/>
        </Header>
        
  )
  
})