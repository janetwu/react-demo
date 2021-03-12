import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tooltip, /* Space,  */Radio } from "antd";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getChartData} from '@/api/home'
import GitHubUser, {RenderList, UserRepositories} from './test'

function Home(){
  const [bindChartData, setBindChartData] = useState([])
  const [bindChartLoading, setBindChartLoading] = useState(true)
  const [activeChartData, setActiveChartData] = useState([])
  const [activeDays, setActiveDays] = useState('recent7days')
  const [activeChartLoading, setActiveChartLoading] = useState(true)

  useEffect(() => {
    setBindChartLoading(true)
    getChartData().then((res) => {
      const xArr = res.data.map((item)=> item.date)
      const yArr = res.data.map((item)=> item.num)
      setBindChartData([xArr, yArr])
      setBindChartLoading(false)
    })

  }, [])
  const relObj = {
    'today': 1,
    'yesterday': 2,
    'recent7days': 5,
  }
  useEffect(() => {
    setActiveChartLoading(true)
    
    getChartData().then((res) => {
      const xArr = res.data.map((item)=> item.date)
      const yArr = res.data.map((item)=> item.num)
      setActiveChartData([xArr, yArr])
      setActiveChartLoading(false)
    })
  }, [activeDays])

  return (
    <div className="container">
      <>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col className="gutter-row" lg={8} md={12} sm={12}>
            <Card size="small" title="总绑定数" extra={
              <Tooltip 
                placement="topLeft" 
                title={(
                  <div>
                    <p>总绑定数：统计该账号权限下，车辆绑定总数</p>
                    <p>趋势图：统计该账号权限下，最近30天的日车辆绑定数趋势</p>
                    <p>今日绑定数：统计该账号权限下，今日车辆绑定数</p>
                  </div>
                )}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            }>
              <LineChart data={bindChartData} loading={bindChartLoading} height="150px" color="#91d5ff"/>
            </Card>
          </Col>
          <Col className="gutter-row" lg={8} md={12} sm={12}>
            <Card size="small" title="总绑定数" extra={
              <Tooltip 
                placement="topLeft" 
                title={(
                  <div>
                    <p>总绑定数：统计该账号权限下，车辆绑定总数</p>
                    <p>趋势图：统计该账号权限下，最近30天的日车辆绑定数趋势</p>
                    <p>今日绑定数：统计该账号权限下，今日车辆绑定数</p>
                  </div>
                )}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            }>
              <PieChart height="150px"/>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={24}>
            <Card size="small" title="设备激活趋势" extra={
              <Radio.Group value={activeDays} onChange={e=>setActiveDays(e.target.value)} className={activeDays==='today'?'primary':''}>
                <Radio.Button value="today" >今天</Radio.Button>
                <Radio.Button value="yesterday">昨天</Radio.Button>
                <Radio.Button value="recent7days">近7天</Radio.Button>
              </Radio.Group>
            }>
              <LineChart data={activeChartData} loading={activeChartLoading} height="300px" showXAxis={true}/>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* <UserRepositories login="janetwu" /> */}
        </Row>
      </>
    </div>
  )
}
export default Home