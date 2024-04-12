import { useContext, useState } from 'react'
import style from './style.module.css'
import { FaCheck } from 'react-icons/fa6'
import { IoRefresh } from 'react-icons/io5'
import UserAuthContext from '../../../contexts/authContext'
import { serverUrl } from '../../../constants'
import {message} from 'antd'
import {getFormttedDate} from '../../../utils/helpers'

export default function DeliveryStatusEntry() {
    const [pktStatus, setPktStatus] = useState("")
    const [pktStatusDisabled, setPktStatusDisabled] = useState(false)
    const [receivingDateDisabled, setReceivingDateDisabled] = useState(false)
    const [podRemarksDisabled, setPodRemarksDisabled] = useState(false)
    const [receivingTypeDisabled, setReceivingTypeDisabled] = useState(false)
    const [docketDetails, setDocketDetails] = useState({})
    const [docketDetailsArr, setDocketDetailsArr] = useState([])
    const [docket, setDocket] = useState("")

    const { setUser } = useContext(UserAuthContext)

    const fetchDocketData = async (e) => {
        try {
            if (e.keyCode == '13') {
                const res = await fetch(serverUrl + "booking?drsentry=1&docket=" + docket, { credentials: 'include' })
                const json = await res.json()
                if (res.ok) {
                    const detailsArr = Object.entries(json.data)
                    setDocketDetailsArr([...detailsArr])
                    setDocketDetails({...json.data})
                    message.success('Docket details fetched.')
                    if(json.data.packetStatus=="booked"){
                        return
                    }
                    setPktStatus(json.data.packetStatus)
                } else if (res.status == 500) {
                    message.error("Internal server error occured")
                } else if (res.status == 401) {
                    message.error("Session Expired.")
                    setUser(null)
                    sessionStorage.clear()
                } else {
                    message.error(json.msg)
                }
            }
        } catch (err) {
            message.error("Error occured while fetching docket details", err)
        }
    }

    const handlePktStatus = (e) => {
        e.target.checked ? setPktStatusDisabled(true) : setPktStatusDisabled(false)
    }

    const handleReceivingDate = (e) => {
        e.target.checked ? setReceivingDateDisabled(true) : setReceivingDateDisabled(false)
    }

    const handlePodRemarks = (e) => {
        e.target.checked ? setPodRemarksDisabled(true) : setPodRemarksDisabled(false)
    }

    const handleReceivingType = (e) => {
        e.target.checked ? setReceivingTypeDisabled(true) : setReceivingTypeDisabled(false)
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Delivery Status Entry</p>
                <div>
                    <div className={style.left}>

                        <label htmlFor="">Awb No</label>
                        <input type="text" placeholder='Awb No' value={docket} onInput={e => setDocket(e.target.value)} onKeyDown={fetchDocketData} />

                        <label htmlFor="">Runsheet No</label>
                        <input type="text" value={docketDetails.runsheetNumber} placeholder='Runsheet No' disabled />

                        <label htmlFor="">Packet Status</label>
                        <span>
                            <select onChange={e => setPktStatus(e.target.value)} value={pktStatus} disabled={pktStatusDisabled}>
                                <option value="">--Select--</option>
                                <option value="delivered">Delivered</option>
                                <option value="in-transit">In Transit</option>
                                <option value="misroute">MisRoute</option>
                                <option value="out for delivery">Out For Delivery</option>
                                <option value="return to origin">Return To Origin</option>
                                <option value="undelivered">UnDelivered</option>
                            </select>
                            <p>
                                <input type="checkbox" onChange={handlePktStatus} /> Fix
                            </p>
                        </span>

                        <label htmlFor="">Status Remarks</label>
                        <input type="text" name="" id="" placeholder='Status Remark' />

                        {
                            pktStatus == "delivered" ?
                                <>
                                    <label htmlFor="">Receiving Type</label>
                                    <span>
                                        <select name="" id="" disabled={receivingTypeDisabled}>
                                            <option value="">--Select--</option>
                                            <option value="signAndStamp">Sign and Stamp</option>
                                            <option value="sign">Sign</option>
                                            <option value="stamp">Stamp</option>
                                        </select>
                                        <p>
                                            <input type="checkbox" name="" id="" onChange={handleReceivingType} /> Fix
                                        </p>
                                    </span>
                                </> :
                                null
                        }

                        <label htmlFor="">Receiving Date</label>
                        <span>
                            <input type="date" name="" id="" disabled={receivingDateDisabled} />
                            <p>
                                <input type="checkbox" name="" id="" onChange={handleReceivingDate} /> Fix
                            </p>
                        </span>

                        {
                            pktStatus == "delivered" ?
                                <>
                                    <label htmlFor="">Receiver Name</label>
                                    <input type="text" name="" id="" placeholder='Receiver Name' />
                                </> :
                                null
                        }

                        <label htmlFor="">POD Remarks</label>
                        <span>
                            <select name="" id="" disabled={podRemarksDisabled}>
                                <option value="null">--Select--</option>
                                <option value="hardCopy">Hard Copy</option>
                                <option value="softCopy">Soft Copy</option>
                            </select>
                            <p>
                                <input type="checkbox" name="" id="" onChange={handlePodRemarks} /> Fix
                            </p>
                        </span>

                        <label htmlFor="">POD Receiving Date</label>
                        <input type="date" name="" id="" />

                        <label htmlFor="">Remarks</label>
                        <textarea name="" id="" cols="30" rows="3" placeholder='Remarks'></textarea>
                    </div>
                    <div className={style.right}>
                        <table style={{
                            borderCollapse: "collapse",
                            width: "100%"
                        }}>
                            <thead>
                                <tr style={{
                                    backgroundColor: "rgb(227, 227, 225)"
                                }}>
                                    <th style={{
                                        borderBottom: "1px solid black",
                                        borderRight: "1px solid black",
                                        paddingInline: "10px"
                                    }}>Fields</th>
                                    <th style={{
                                        borderBottom: "1px solid black",
                                        paddingInline: "10px"
                                    }}>Values</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        docketDetailsArr.length>0?
                                        docketDetailsArr.map((entry,i)=>{
                                            const trStyle = {
                                                fontSize:"13px",
                                                fontWeight:"500",
                                                backgroundColor:"rgb(244, 240, 240)"
                                            }
                                            i%2==0?trStyle.backgroundColor="rgb(251, 251, 251)":null
                                           return <tr style={trStyle}>
                                                <td style={{
                                                    borderBottom: "1px solid black",
                                                    borderRight:"1px solid black",
                                                    paddingInline:"10px",
                                                    textTransform:"capitalize"
                                                }}>{entry[0].split(/(?=[A-Z])/).join(" ")}</td>
                                                <td style={{
                                                    borderBottom: "1px solid black",
                                                    paddingInline:"10px"
                                                }}>{
                                                entry[0].includes('Date') && entry[1]?
                                                getFormttedDate(entry[1]):
                                                entry[0].includes("Image") && !entry[1]?
                                                <span style={{textDecoration:'underline', color:'blue'}}>Download Image</span>:
                                                entry[1]}</td>
                                            </tr>
                                        }):
                                        <tr>
                                            <td>No Data Available to Show...</td>
                                        </tr>
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> save</button>
                <button className={style.buttonRef}><IoRefresh /> Reset</button>
            </div>
        </>
    )
}