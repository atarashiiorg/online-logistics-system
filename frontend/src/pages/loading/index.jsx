import React from "react"
import style from './style.module.css'
import ReactLoading from "react-loading"
export function Loading() {
    return (
        <div className={style.overlay}>
            <ReactLoading
                type="spin"
                color="#333333"
                height={100}
                width={50}
            />
            <h3>Please wait</h3>
        </div>
    )
}