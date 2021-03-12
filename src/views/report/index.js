import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Input, Space, Button, Table } from "antd";
import SearchForm from './SearchForm'
import ReportList from './ReportList'
export default function Report(){
	const [params, setParams] = useState({})
	const paramsChange = (values) => {
		console.log('getValues', values)
		setParams(getParams(values))
	}

	const getParams = (values) => {
		let _p = {}

		if(values.dateRange && values.dateRange.length){
			_p.sTime = values.dateRange[0].startOf('day').format('YYYY-MM-DD HH:mm:ss');
			_p.eTime = values.dateRange[1].endOf('day').format('YYYY-MM-DD HH:mm:ss');
		}
		return _p
	}
	console.log('report page')
  return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<SearchForm onParamsChange={paramsChange} />
				</Col>
				<Col span={24}>
					<ReportList params={params}/>
				</Col>
			</Row>
		</>
	)
}