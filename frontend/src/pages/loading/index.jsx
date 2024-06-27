import React from "react"
import style from './style.module.css'
import ReactLoading from "react-loading"
import {Spin} from 'antd'
export default function Loading() {
    return (
        <div className={style.overlay}>
            <ReactLoading
                type="spokes"
                color="blueviolet"
                height={80}
                width={70}
            />
            {/* <Spin size="large" /> */}
            <h2>Please wait...</h2>
        </div>
    )
}