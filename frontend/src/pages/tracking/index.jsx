import { useContext, useEffect, useState } from 'react'
import style from './style.module.css'
import UpperNavbar from '../../components/landing/upperNavbar'
import logo from '../../assets/sdlLogo.png'
import { useGetData } from '../../apiHandlers/getApis'
import { publicUrl, serverUrl, title } from '../../constants'
import { message } from 'antd'
import { getFormttedDate } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading'
import HomeContext from '../../contexts/homeContext'
import Footer from '../../components/landing/footer'

const ActivityDateCell = ({ date }) => {
    return (
        <td><pre>{getFormttedDate(date)}   {new Date(date).toLocaleTimeString()}</pre></td>
    )
}

export function TrackingPage() {

    useEffect(()=>{
        document.title = "Safe dispatch logistics-Tracking"
    })

    const navigate = useNavigate()
    const { docket } = useContext(HomeContext)
    const [trackingData, setTrackingData] = useState()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch(publicUrl + "track?docket=" + docket)
            const res_json = await res.json()
            if (res.ok) {
                setTrackingData(p => res_json.data)
            } else if (res.status == 500) {
                message.error(res_json.err)
            } else {
                message.warning(res_json.msg)
            }
            setLoading(false)
        } catch (error) {
            message.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const track = () => {
        if (docket.length < 3) {
            message.warning("Enter a valid docket number")
            return
        }
        fetchData()
    }

    return (
        <>
            <div className={style.trackingPage}>
                <UpperNavbar track={track} />
                <div className={style.header}>
                    <div className={style.logo} onClick={e => navigate("/home")}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1>Tracking Result</h1>
                </div>
                {
                    loading ? <Loading /> :
                        !trackingData && docket.length < 10 ?
                            <div className={style.notValid} style={{ fontSize: "25px", color: 'grey', fontWeight: "700" }}>Enter a Docket number to track</div> :
                            !trackingData ? <div className={style.notValid}>Not a valid tracking number....</div> :
                                <div className={style.container}>
                                    <div className={style.box}>
                                        <div className={style.upper}>
                                            <div className={style.upper_child}>
                                                <div className={style.status}>
                                                    {trackingData?.tracking?.status || ""}
                                                </div>
                                            </div>
                                            <div className={style.upper_child}>
                                                <p>Docket No. <span style={{ fontWeight: "600" }}>{trackingData?.docketNumber}</span></p>
                                                <p>Delivery Date: <span style={{ fontWeight: "600" }}>{trackingData?.receivingDate}</span></p>
                                            </div>
                                            <div className={style.upper_child}>
                                                <p>Booking Date: <span style={{ fontWeight: "600" }}>{getFormttedDate(trackingData?.bookingDate)}</span></p>
                                                <p>Delivery Boy: <span style={{ fontWeight: "600" }}>{trackingData?.emp?.name}</span></p>
                                            </div>
                                            <div className={style.upper_child}>
                                                <p>Receiver Name: <span style={{ fontWeight: "600" }}>{trackingData?.tracking?.receiver}</span></p>
                                                <p>Mobile No. <span style={{ fontWeight: "600" }}>{trackingData?.emp?.mobile}</span></p>
                                            </div>
                                            <div className={style.upper_child}>
                                                <p>Receiver Type: <span style={{ fontWeight: "600" }}>{trackingData?.tracking?.receiverType}</span></p>
                                            </div>
                                        </div>
                                        <div className={style.lower}>
                                            <div className={style.left}>
                                                <h3>Shipment Details</h3>
                                                <table className={style.table}>
                                                    <tbody>
                                                        <tr>
                                                            <td>Docket No.</td>
                                                            <td>{trackingData?.docketNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Pcs</td>
                                                            <td>{trackingData?.shipment?.totalBoxes}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Origin</td>
                                                            <td>{trackingData?.shipment?.origin?.destName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Destination</td>
                                                            <td>{trackingData?.shipment?.destination?.destName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Forwarding No</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Consignor</td>
                                                            <td>{trackingData?.consignorConsignee?.consignor}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Consignee</td>
                                                            <td>{trackingData?.consignorConsignee?.consignee}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ToPay</td>
                                                            <td>{trackingData?.invoice?.bookingType == "topay" ? trackingData?.invoice?.amountToPay : ""}</td>
                                                        </tr>
                                                        {/* <tr>
                                        <td>POD</td>
                                        <td></td>
                                    </tr> */}
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
                                                        {
                                                            trackingData?.tracking?.details?.map(d => {
                                                                return <tr>
                                                                    <ActivityDateCell date={d.actionDate} />
                                                                    <td style={{ fontSize: "13px", fontWeight: "600" }}>{d.action.split("in")[0]}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                }
            </div>
            < Footer />
        </>
    )
}