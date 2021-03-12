import React, { useEffect, useState, useRef } from "react";
import Map from './Map'
import { data } from './data'

 
function Monitor(){
	console.log(data)
  return (
		<>
      <Map/>
		</>
	)
}

export default Monitor