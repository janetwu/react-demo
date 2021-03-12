import request from '@/utils/request'

export function getNewBindDeviceInfo(data) {
	return request({
		url: '/home/getNewBindDeviceInfo',
		method: 'get',
		data,
	})
}

export function getNewActiveDeviceInfo(data) {
	return request({
		url: '/home/getNewActiveDeviceInfo',
		method: 'get',
		data,
	})
}

export function getDeviceActiveList(data) {
	return request({
		url: '/getTableList',
		method: 'get',
		data,
	})
}