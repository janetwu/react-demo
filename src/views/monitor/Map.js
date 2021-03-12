import React, { useEffect, useState, useRef } from "react";
import remoteLoad from '@/utils/remoteLoad'
import { Row, Col, Card, Form, Input, Space, Button, Table } from "antd";
import ReplayMap from './replayMap'
import './style.less'

let replayMap = null
const play = () => {
  replayMap && replayMap.initReplay()
}

function Map(){
  const mapRef = useRef()

  useEffect(()=>{
    replayMap = new ReplayMap(mapRef.current)
    return () => {
      replayMap.destroy()
    }
  }, [])
  
  return (
		<div className="map_wrap">
      <div 
        id="map" 
        className="map"
        ref={mapRef}>
      </div>
      <Button type="primary" className="play_btn" onClick={play}>
        播放
      </Button>
		</div>
	)
}

export default Map