import {
  HomeOutlined,
  BarChartOutlined,
  CarOutlined,
  
} from '@ant-design/icons';
const menuList = [{
  key: '/',
  icon: <HomeOutlined />,
  title: '首页',
  path: '/',
}, {
  key: '/report',
  icon: <BarChartOutlined />,
  title: '统计报表',
  path: '/report',
  children: [/* {
    key: 'chart_1',
    icon: 'chart_1',
    title: 'chart_1',
    children: [{
      key: 'chart_1_1',
      icon: 'chart_1_1',
      title: 'chart_1_1',
    }, {
      key: 'chart_1_2',
      icon: 'chart_1_2',
      title: 'chart_1_2',
    }]
  },  */{
    key: '/report/deviceActive',
    icon: '',
    title: '设备激活',
    path: '/report/deviceActive',
  }]
},{
  key: '/monitor',
  icon: <CarOutlined/>,
  title: '车辆监控',
  path: '/monitor',
  children: [{
    key: '/monitor/monitor',
    icon: '',
    title: '车辆监控',
    path: '/monitor/monitor',
  }]
},]

export default menuList