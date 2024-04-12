import { useEffect, useState } from 'react'
import style from './style.module.css'
import { serverUrl } from '../../../constants'
import { useGetData } from '../../../apiHandlers/getApis'
import { message } from 'antd'
import {usePatchData} from '../../../apiHandlers/patchApis'

const Tr = (shipper) => {
    return (
        <tr>
            <td>{shipper.index + 1}</td>
            <td>{shipper.branchCode}</td>
            <td>{shipper.docketFrom}</td>
            <td>{shipper.docketTo}</td>
            <td>{shipper.sendBy}</td>
        </tr>
    )
}
const Treceive = (props) => {
    const recBtnStyle = {
        padding:"5px 10px",
        backgroundColor:"dodgerblue",
        color:"white", 
        border:"none",
        borderRadius:"4px"
    }
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.branchCode}</td>
            <td>{props.docketFrom}</td>
            <td>{props.docketTo}</td>
            <td>{props.sendBy}</td>
            <td style={{textAlign:"center"}}><button style={recBtnStyle} onClick={e=>props.receive(props._id)}>Receive</button></td>
        </tr>
    )
}

export default function ReceiveShipperFromPrinter() {
    const [reload,setReload] = useState(false)
    const [err, loading, shippers] = useGetData("shipper",[reload])
    const [err1, loading1, shippersReceived] = useGetData("shipper?received=true",[reload])

    const receive = async(sid)=>{
        const res = await usePatchData({},"shipper?sid="+sid)
        if(res.res){
            setReload(p=>!p)
        }
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Receive Shipper From Printer</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Branch</th>
                                <th>Docket from</th>
                                <th>Docket To</th>
                                <th>Send by</th>
                                <th>Receive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shippers.length <= 0 ?
                                    <tr>
                                        <td style={{ textAlign: "center" }} colSpan={5}>No data to show...</td>
                                    </tr> :
                                    null
                            }
                            {
                                shippers.map((s, index) => <Treceive {...s} index={Number(index)} receive={receive} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={style.formContainer}>
                <p>Received Shippers</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Branch</th>
                                <th>Docket from</th>
                                <th>Docket To</th>
                                <th>Send by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shippersReceived.length <= 0 ?
                                    <tr>
                                        <td style={{ textAlign: "center" }} colSpan={5}>No data to show...</td>
                                    </tr> :
                                    null
                            }
                            {
                                shippersReceived.map((s, index) => <Tr {...s} index={Number(index)} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}