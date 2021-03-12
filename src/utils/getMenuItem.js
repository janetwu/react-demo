import { Menu, Button, Icon } from 'antd';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function getMenuNode(item) {//console.log('getMenuNode')
  return (
    (item.children && item.children.length) ?
      (
        <SubMenu 
          key={item.key} 
          title={
            <span>
              {item.icon}
              <span>{item.title}</span>
            </span>
          }
        >
          {
            item.children.map((childItem)=>{
              return (
                getMenuNode(childItem)
              )
            })
          }
        </SubMenu>
      ):(
        <Menu.Item 
          key={item.key} 
        >
          <Link to={item.path}>{item.icon}<span>{item.title}</span></Link>
        </Menu.Item>
      )
  )
}

export default (items) => {console.log('getMenuItems')
  return (
    items.reduce((pre, item)=>{
      pre.push(getMenuNode(item))
      return pre
    }, [])
  )
}