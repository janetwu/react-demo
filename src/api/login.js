import request from '@/utils/request'

export function reqLogin(data) {
	return request({
		url: '/login',
		method: 'post',
		data,
	})
}