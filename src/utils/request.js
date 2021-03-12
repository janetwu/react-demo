import axios from "axios";
import qs from 'qs'
import { getToken } from './auth'

axios.defaults.withCredentials=true
//创建一个axios示例
const service = axios.create({
	baseURL: '/',//process.env.REACT_APP_BASE_API, // api 的 base_url
  //timeout: 5000, // request timeout
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    /* if (store.getState().user.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken();
    } */

    
    
    if(config.method === 'get'){
      config.params = config.data
    }else{
      config.headers['Content-Type'] = typeof config.data == 'string'?'application/json':'application/x-www-form-urlencoded; charset=UTF-8'
      config.data = typeof config.data == 'string'? config.data:qs.stringify(config.data) // 转为formdata数据格式
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
    
    return response.data
  },
	(error) => {
    console.log("err" + error); // for debug
    //const { status } = error.response;
    /* if (status === 403) {
      Modal.confirm({
        title: "确定登出?",
        content:
          "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } */
    return Promise.reject(error);
  }
);

export default service;
