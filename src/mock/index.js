import Mock from "mockjs";
import qs from 'qs'
import moment from 'moment'
import tableApi from './table'

Mock.mock(/\/login/, "post", (config) => {
  const { username } = qs.parse(config.body);
  

  return {
    returnCode: '0',
    data: {
      token: 'janet'
    }
  }
  /* const token = tokens[username];
  if (!token) {
    return {
      status: 1,
      message: "用户名或密码错误",
    };
  }
  return {
    status: 0,
    token,
  }; */
});

Mock.mock(/\/getChartData/, "get", config => {
  let daysArr = [...Array(10)].map((item, i)=>{
    return moment().add(i, 'days').format('YYYY-MM-DD')
  })
  let arr = [...Array(10)].map((item, i)=>{
    return Mock.mock({
      'id|+1': '@id',
      'date': daysArr[i],
      'num|0-100': 10
    })
  })
  return {
    data: arr
  }
})

Mock.mock(/\/getTableList/, "get", config => {
  
  let arr = [...Array(10)].map((item, i)=>{
    return Mock.mock({
      'id|+1': '@id',
      'sqbh': '@id',
      'name': '@cname',
      'standno|1000000-9999999': 1000000,
      'date': '@datetime',
      'num|0-100': 10
    })
  })
  return {
    data: arr,
    recordsTotal: 110,
  }
})

export default Mock