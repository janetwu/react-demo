import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Spin } from 'antd';
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";
import { connect } from "react-redux";
// 指定图表的配置项和数据
var option = {
	grid: {
		top: 10,
		bottom: 0,
		left: 10,
		right: 10
	},
	xAxis: {
			type: 'category',
			boundaryGap: false,
			//data: ['1','1'],
			show: false,
			nameTextStyle: {
				align: 'center'
			},
			boundaryGap: ['20%', '20%'],
			axisTick: {
				show: false,
			},
			axisLabel: {
				interval: 0,
				rotate: 45
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(0,0,0,0.5)'
				}
			}
			
	},
	yAxis: {
			type: 'value',
			show: false,
	},
	series: [{
			//data: ['2','1'],
			type: 'line',
			areaStyle: {},
			showSymbol: true,
			smooth: true,
	}],
	tooltip: {
		formatter: '{c}<br/>{b}'
	},
	color: ['#99d6b4']
}
const LineChart = (props) => {
	let chartEle = null
	const chart = useRef(null)
	const [chartData, setChartData] = useState(props.data)
	//const [loading, setLoading] = useState(true)
	
	const resize = () => {
		if (chart.current) {
      debounce(chart.current.resize.bind(chart.current), 300)();
    }
	}

	useEffect(() => {
		//setChart(echarts.init(chartEle))
		chart.current = echarts.init(chartEle)
		chart.current.showLoading()
		//console.log(echarts.init(chartEle))
		
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		}
	}, []);

	useEffect(() => {
		
		if(props.data && props.data.length) {
			
			let computedOption = {...option}//Object.assign({}, option)
			computedOption.xAxis.data = [].concat(props.data[0])
			computedOption.series[0].data = [].concat(props.data[1])
			if('color' in props){
				computedOption.color = props.color
			}
			if('showXAxis' in props){
				computedOption.xAxis = {
					...option.xAxis,
					show: props.showXAxis
				}
				computedOption.grid.bottom = 30
			}
			chart.current.setOption(computedOption, true)
			chart.current.hideLoading()
			resize()
		}
		
		return () => {
			
		}
	}, [props.data]);

	useEffect(() => {
		if(props.loading){
			chart.current.showLoading()
		}
	}, [props.loading]);
	
	useEffect(() => {
		resize()
	}, [props.collapse]);

	return (
		<div ref={ref=>chartEle=ref} style={{margin: '10px', width: 'auto',height: props.height}}>
			
		</div>
	)	
	
}
	

export default connect(
  (state) => {return {
    ...state.setting
  }},
)(LineChart)