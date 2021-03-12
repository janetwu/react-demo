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

export function getChartData(data) {
	return request({
		url: '/getChartData',
		method: 'get',
		data,
	})
}