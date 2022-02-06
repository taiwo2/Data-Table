import React, { useEffect, useState } from 'react';
import {StickyTable, Row, Cell} from 'react-sticky-table'
import axios from 'axios';
import MarkPrice from './MarkPrice';
import './style.css'
const Delta = () => {
  const [datas,setDatas] = useState([])
  const deltaValu = () => {
    axios.get('https://api.delta.exchange/v2/products')
    .then(res => {
      console.log(res.data)
      setDatas(res.data.result)
    })
  }

  useEffect(()=> {
    deltaValu()
  },[])
  return (
  <div>
    <div style={{width: '90%', height: '400px', border: '3px solid black'}}>
      <StickyTable borderColor='black' borderLeft='2px solid red' >
        <Row>
          <Cell>Symbol</Cell>
          <Cell>Description</Cell>
          <Cell>Underlying Asset</Cell>
          <Cell>Mark Price</Cell>
        </Row>
        {
          datas.map((data,index) => {
            return (
              <Row key={index}> 
              <Cell>{data.symbol}</Cell>
              <Cell >{data.description}</Cell>
              <Cell>{data.underlying_asset.symbol}</Cell>
              <Cell><MarkPrice /></Cell> 
            </Row> 
            )
          })
         
        }
    
      </StickyTable>
    </div>
  </div>
  );
};

export default Delta;
