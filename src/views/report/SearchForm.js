import React, {  } from "react";
import { Card, Form, Input, Select, Button, } from "antd";
import DateRange from '@/components/DateRange'
import './style.less'
const { Option } = Select;

const SearchForm = (props) => {console.log(props)
	const { getFieldDecorator } = props.form;
	const DateRangeChange = (value)=>{
		console.log(value)
		props.form.setFieldsValue({ dateRange: value });
	}
	const prefixSelector = (
    
      <Select style={{ width: 100 }} defaultValue="sn">
        <Option value="sn">设备号</Option>
        <Option value="vin">车架号</Option>
      </Select>
    
	);
	const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
				console.log('Received values of form: ', values);
				props.onParamsChange(values)
      }
    });
  };
	return (
		<Form onSubmit={handleSubmit} layout="inline">
			<Form.Item
				name="dateRange"
			>
				{getFieldDecorator('dateRange', {
					
				})(
					<DateRange onDateChange={DateRangeChange} />
				)}
			</Form.Item>
			<Form.Item
				name="isOnline"
				label="是否在线"
				
			>
				<Select style={{width: '80px'}} defaultValue="">
					<Option value="">全部</Option>
					<Option value="1">在线</Option>
					<Option value="2">离线</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('username', {
					rules: [{ required: false}]
				})(
					<Input style={{width: '220px'}} placeholder="请输入车架号"/>
				)}
			</Form.Item>
			<Form.Item
				name="phone"
			>
				<Input style={{width: '320px'}} addonBefore={prefixSelector} />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					查询
				</Button>
			</Form.Item>
		</Form>
	)
}

const WrapForm = Form.create({ name: 'normal_login' })(SearchForm)

export default function WrapSearchForm(props){
  return (
		<>
			<Card>
				<WrapForm  {...props}/>
			</Card>
		</>
	)
}