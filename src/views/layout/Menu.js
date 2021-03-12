import React, {} from 'react'
import { Menu,  } from 'antd';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import menuList from '@/router/menuList'
import getMenuItem from '@/utils/getMenuItem'

export default connect(
  (state) => {return {
    ...state.setting
  }},
)(withRouter(React.memo((props) => {

  const path = props.location.pathname;
  const findItem = (arr, initArr=[]) => {
    return arr.reduce((prevArr, item)=>{
      if(item.path !== '/' && path.indexOf(item.path)>-1){
        prevArr.push(item.path)
        if(item.children && item.children.length){
          return findItem(item.children, prevArr)
        }
      }
      return prevArr
    }, initArr)
  }
  const openKeys = findItem(menuList)
  const items = getMenuItem(menuList)
  
  console.log('Menu')
  return (
    <Menu
      //defaultSelectedKeys={['home']}
      //defaultOpenKeys={['sub1',]}
      mode="inline"
      theme="dark"
      selectedKeys={[path]}
      defaultOpenKeys={openKeys}
    >
      {items}
    </Menu>
  )
}))
)