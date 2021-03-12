import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
import { MonitorOutlined } from '@ant-design/icons';

const Home = Loadable({loader: () => import(/*webpackChunkName:'home'*/'@/views/home'),loading: Loading});
const Report = Loadable({loader: () => import(/*webpackChunkName:'Report'*/'@/views/report'),loading: Loading});
const Monitor = Loadable({loader: () => import(/*webpackChunkName:'Monitor'*/'@/views/monitor'),loading: Loading});

export default [
  { path: "/", component: Home, },
  { path: "/report/deviceActive", component: Report, },
  { path: "/monitor/monitor", component: Monitor, },
  //{ path: "/error/404", component: error404, },
]