import React, { useEffect, useState } from "react";
import { DatePicker, Radio } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function DateRange(props){
	const [rangeValue, setRangeValue] = useState([])
	const [dayType, setDayType] = useState('')

	const relObj = {
		'today': [moment(), moment()],
		'yesterday': [moment().add(-1, 'day'), moment().add(-1, 'day')],
		'recent7days': [moment().add(-6, 'day'), moment()]
	}
	useEffect(()=>{
		dayType!==-1 && (setRangeValue(relObj[dayType]))
	}, [dayType])

	useEffect(()=>{
		props.onDateChange(rangeValue)
	}, [rangeValue])

	const onChange = (range) =>{
		setRangeValue(range)
		
		setDayType(-1)
	}

  return (
		<>
			<RangePicker
				value={rangeValue}
				onChange={onChange}
				style={{marginRight: '10px'}}
			/>
			<Radio.Group value={dayType} onChange={e=>setDayType(e.target.value)}>
				<Radio.Button value="">全部</Radio.Button>
				<Radio.Button value="today">今天</Radio.Button>
				<Radio.Button value="yesterday">昨天</Radio.Button>
				<Radio.Button value="recent7days">近7天</Radio.Button>
			</Radio.Group>
		</>
	)
}

export default DateRange