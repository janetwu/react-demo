import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Input, /* Space,  */Button, Table, Pagination  } from "antd";
import { getDeviceActiveList } from '@/api/report'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default function ReportList({params}){
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(10)

	useEffect(()=>{
		//getList()
	}, [])

	useEffect(()=>{
		console.log('params', params)
		getList()
	}, [params])

	const getList = (currentPage=1, pageSize=10) => {
		setLoading(true)
		getDeviceActiveList({currentPage, pageSize, ...params}).then((res)=>{
			setData(res.data)
			setTotal(res.recordsTotal)
			setLoading(false)
		})
	}

	const changePage = (page, pageSize) => {
		setCurrentPage(page)
		getList(page, pageSize)
	}

  return (
		<Card title="设备激活">
			<>
				<Table
					rowKey="id"
					rowSelection={{
						...rowSelection,
					}}
					columns={[
						{
							title: '工单号',
							dataIndex: 'sqbh',
						},
						{
							title: '姓名',
							dataIndex: 'name',
						},
						{
							title: '车架号',
							dataIndex: 'standno',
						},
						{
							title: '品牌车型',
							dataIndex: 'brand',
						},
						{
							title: '设备型号',
							dataIndex: 'unitType',
						},
						{
							title: '是否在线',
							dataIndex: 'isOnLine',
						},
					]}
					dataSource={data}
					pagination={false}
					loading={loading}
				/>
				
				<Pagination 
					defaultCurrent={currentPage} 
					total={total} 
					onChange={changePage}
					disabled={loading}
					hideOnSinglePage={true}
					style={{textAlign: 'right'}}
				/>
				
			</>
		</Card>
	)
}