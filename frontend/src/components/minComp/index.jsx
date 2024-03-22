import { FaTrashAlt } from "react-icons/fa"

export const Mandatory = () => {
    return (
        <span style={{ color: "red" }}>*</span>
    )
}

const docketStyle = {
    width: "95%",
    boxShadow: "0px 0px 4px grey",
    display: "grid",
    padding: "5px",
    textAlign: "left",
    gridTemplateColumns: "repeat(4,1fr) 80px 80px 25px"
}

export const Docket = (props) => {
    return (
        <div style={docketStyle} >
            <p>{props?.docketNumber}</p>
            <p>{props?.itemContent}</p>
            <p>{props?.consignee}</p>
            <p>{props?.destination}</p>
            <p>{props?.pieces}</p>
            <p>{props?.weight}</p>
            <FaTrashAlt style={{ color: "red" }} onClick={e => props?.deleteDocket(props?.docketNumber)} />
        </div>
    )
}

import tableStyle from './tableStyle.module.css'
import React from "react"
import Loading from "../../pages/loading"
export const TableComp = (props) => {
    return (
        <div className={tableStyle.tableContainer}>
            {
                props.children
            }
        </div>
    )
}

export function LazyComp(props){
    return (
        <React.Suspense fallback={<Loading/>}>
            {
                props.children
            }
        </React.Suspense>
    )
}