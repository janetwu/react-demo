import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";
// 指定图表的配置项和数据
var option = {
		grid: {
			top: 0,
			bottom: 0,
			height: '100%'
		},
		series: [{
				type: 'pie',
				radius: ['100%', '60%'],
				areaStyle: {},
				showSymbol: true,
				label: {
					show: false,
					position: 'center'
				},
				labelLine: {
					show: false
				},
				data: [
					{value: 30, name: '1', itemStyle: {color: '#ffa39e'}},
					{value: 70, name: '2', itemStyle: {color: 'rgba(0,0,0,0.2)'}},
				]
		}],
		tooltip: {
			formatter: '{c}<br/>ccc'
		},
		color: ['#99d6b4']
}
const PieChart = (props) => {
	let chartEle = null
	const chart = useRef(null)
	//const [chart, setChart] = useState(null)
	
	const resize = () => {
		if (chart.current) {
      debounce(chart.current.resize.bind(chart.current), 300)();
    }
	}

	useEffect(() => {
		//setChart(echarts.init(chartEle))
		chart.current = echarts.init(chartEle)
		//console.log(echarts.init(chartEle))
		
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		}
	}, []);

	useEffect(() => {
		chart.current.setOption(option)
		resize()
		return () => {
			
		}
	}, [chart]);
	
	useEffect(() => {
		resize()
	}, [props.collapse]);
	
	return(
		<div ref={ref=>chartEle=ref} style={{margin: '10px', width: '100%',height: props.height}}>
			
		</div>
	)
}
	

export default connect(
  (state) => {return {
    ...state.setting
  }},
)(PieChart)