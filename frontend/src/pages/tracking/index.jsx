import { useContext, useEffect, useState } from 'react'
import style from './style.module.css'
import UserAuthContext from '../../contexts/authContext'
import UpperNavbar from '../../components/landing/upperNavbar'
import logo from '../../assets/logo1.jpg'
import { useGetData } from '../../apiHandlers/getApis'
import { serverUrl, title } from '../../constants'
import { message } from 'antd'

export function TrackingPage() {
    const { docket } = useContext(UserAuthContext)
    const [trackingData, setTrackingData] = useState(null)
    const fetchData = async () => {
        if(docket.lentgh<7){
            message.warning("Enter a valid docket number")
            return
        }
        try {
            const res = await fetch(serverUrl + "track?docket=" + docket)
            const res_json = await res.json()
            if (res.ok) {
                message.success("success")
                setTrackingData(p={...res_json.data})
            } else if (res.status == 500) {
                message.error(res_json.err)
            } else {
                message.warning(res_json.msg)
            }
        } catch (error) {
            message.error(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const track = ()=>{
        if(docket.length<7){
            message.warning("Enter a valid docket number")
            return
        }
        fetchData()
    }

    return (
        <>
            <div className={style.header}>
                <div className={style.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Tracking Result</h1>
            </div>
            <UpperNavbar track={track} />
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.upper}>
                        <div className={style.upper_child}>
                            <div className={style.status}>
                                Delivered
                            </div>
                        </div>
                        <div className={style.upper_child}>
                            <p>Docket No. { }</p>
                            <p>Delivery Date: { }</p>
                        </div>
                        <div className={style.upper_child}>
                            <p>Booking Date</p>
                            <p>Delivery Boy</p>
                        </div>
                        <div className={style.upper_child}>
                            <p>Receiver Name</p>
                            <p>Mobile No.</p>
                        </div>
                        <div className={style.upper_child}>
                            <p>Receiver Type</p>
                        </div>
                    </div>
                    <div className={style.lower}>
                        <div className={style.left}>
                            <h3>Shipment Details</h3>
                            <table className={style.table}>
                                <tbody>
                                    <tr>
                                        <td>Docket No.</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Pcs</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Origin</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Forwarding No</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Consignor</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Consignee</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>ToPay</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>POD</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={style.right}>
                            <h3>Tracking History</h3>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Activities</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                    <tr>
                                        <td>{new Date().toDateString()}</td>
                                        <td>Docket booked on this date</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}