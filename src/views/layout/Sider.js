import React, {  } from 'react';
import { connect } from "react-redux";
import { Layout, } from 'antd';
import Menu from './Menu'
const { Sider} = Layout;

export default connect(
  (state) => {return {
    ...state.setting
  }},
)((props) => {console.log('Sider')
  const {collapse} = props
  return (
    <Sider collapsible collapsed={collapse} trigger={null}>
      <div 
        style={
          {
            height: '80px',
            lineHeight: '80px',
            color: '#fff',
            padding: '0 20px',
            visibility: collapse?'hidden':'visible'
          }
        }
      >
        admin
      </div>
      <Menu />
    </Sider>
  )
})