import Mock from 'mockjs'


export default {
  getList: (config) => {
		return {
			...Mock.mock({
				'data|10': [{
					'id|+1': '@id',
					'date': '@datetime',
					'num|0-100': 10
				}]
			})
		}
	}
}