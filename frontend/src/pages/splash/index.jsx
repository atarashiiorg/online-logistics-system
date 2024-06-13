import React from 'react'
import style from './style.module.css'
import {Spin} from 'antd'

function Splash() {
  return (
    <div className={style.container}>
        <Spin size='large'/>
        <h1>Loading...</h1>
    </div>
  )
}

export default Splash