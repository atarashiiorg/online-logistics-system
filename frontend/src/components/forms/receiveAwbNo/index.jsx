import { FaArrowRotateRight, FaCheck } from 'react-icons/fa6'
import { TableTotalFound } from '../manifestPrint'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'
import { useGetData } from '../../../apiHandlers/getApis'
import { useContext, useEffect, useState } from 'react'
import UserAuthContext from '../../../contexts/authContext'
import { TableComp } from '../../minComp'
import { getFormttedDate } from '../../../utils/helpers'
import { usePatchData } from '../../../apiHandlers/patchApis'
import { message } from 'antd'

const TableRow = (props) => {
    return (
        <>
            {
                props.dockets.map(d => {
                    const [isCheked, setIsChecked] = useState(false)
                    const check = (e, id) => {
                        if (props.message == "") {
                            message.warning("Please enter a message first")
                            return
                        }
                        if (props.date == "") {
                            message.warning("Please select a date first")
                            return
                        }
                        if (e.target.checked) {
                            props.select(p => {
                                const idx = p.findIndex(d => d.docket == id)
                                if (idx > -1) {
                                    return p
                                } else {
                                    return [...p, { docket: id, rcDate: props.date, message: props.message }]
                                }
                            })
                            setIsChecked(e.target.checked)
                        } else {
                            props.select(p => {
                                const newArr = p.filter(d => d.docket != id)
                                return [...newArr]
                            })
                            setIsChecked(e.target.checked)
                        }
                    }
                    useEffect(() => {
                        if (props.allChecked) {
                            if (props.message == "") {
                                message.warning("Please enter a message first")
                                return
                            }
                            if (props.date == "") {
                                message.warning("Please select a date first")
                                return
                            }
                            props.select(p => {
                                const idx = p.findIndex(docket => docket.docket == d?._id)
                                if (idx > -1) {
                                    return p
                                } else {
                                    return [...p, { docket: d._id, rcDate: props.date, message: props.message }]
                                }
                            })
                        } else {
                            if (props.message == "") {
                                message.warning("Please enter a message first")
                                return
                            }
                            if (props.date == "") {
                                message.warning("Please select a date first")
                                return
                            }
                            props.select(p => [])
                            setIsChecked(false)
                        }
                    }, [props.allChecked])
                    return <tr>
                        <td><input type="checkbox" disabled={props.allChecked} checked={props.allChecked || isCheked} onChange={e => check(e, d._id)} /></td>
                        <td>{d?.booking?.docketNumber}</td>
                        <td>{props?.manifestNumber}</td>
                        <td>{""}</td>
                        <td>{""}</td>
                        <td>{props?.fromBCode?.branchName}</td>
                        <td>{d?.booking?.shipment?.totalBoxes}</td>
                        <td>{d?.booking?.shipment?.totalActualWeight}</td>
                        <td>{getFormttedDate(d?.booking?.bookingDate)}</td>
                        <td>{d?.booking?.consignorConsignee?.consignee}</td>
                        <td>{d?.booking?.consignorConsignee?.consignor}</td>
                    </tr>
                })
            }
        </>
    )
}

export default function ReceiveAwbNo() {
    const { currBranch } = useContext(UserAuthContext)
    const [reload, setReload] = useState(false)
    const [err, loading, manifests, setManifests] = useGetData("manifest?bid=" + currBranch?._id, [currBranch, reload])
    const [receiveAllCheck, setReceiveAllCheck] = useState(null)
    const [selectedDockets, setSelectedDockets] = useState([])
    const [docketNum, setDocketNum] = useState("")
    const [rcDate, setRcDate] = useState("")
    const [msg, setMessage] = useState("")
    const handleReceive = async () => {
        if (!currBranch) {
            message.warning('Please select current branch.')
            return
        }
        const result = await usePatchData(selectedDockets, "manifest?bid=" + currBranch?._id)
        if (result.res) {
            setReload(p => !p)
        }
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Receive AwbNo Details</p>
                <div>
                    <label htmlFor="">RcDate</label>
                    <input type="date" value={rcDate} onInput={e => setRcDate(e.target.value)} />
                    {/* <label htmlFor="">RcTime</label>
                    <input type="time" /> */}

                    <label htmlFor="">Message</label>
                    <input type="text" value={msg} onInput={e => setMessage(e.target.value)} placeholder='Message' />
                    <label htmlFor="">Docket No</label>
                    <input type="text" placeholder='Docket No' value={docketNum} onInput={e => setDocketNum(e.target.value)} />

                    <label htmlFor="">Auto Receive</label>
                    <span><input type="checkbox" /></span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleReceive}><FaCheck /> Receive</button>
                <button className={style.buttonChk}><FaCheck /> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateRight /> Reset</button>
            </div>

            <TableComp>
                <p>Manifests:</p>
                <div>
                    <table style={{ minWidth: "100%" }}>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={receiveAllCheck || false} onChange={e => setReceiveAllCheck(p => {
                                    if (msg == "") {
                                        message.warning("Please enter a message first")
                                        return
                                    }
                                    if (rcDate == "") {
                                        message.warning("Please select a date first")
                                        return
                                    }
                                    if (e.target.checked == false)
                                        return null
                                    else
                                        return true
                                })} /> All</th>
                                <th>Docket No</th>
                                <th>Manifest No</th>
                                <th>ManualManifest No</th>
                                <th>Challan No</th>
                                <th>From Branch</th>
                                <th>Pcs</th>
                                <th>Weight</th>
                                <th>Booking Date</th>
                                <th>Consignor</th>
                                <th>Consignee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manifests.length > 0 ?
                                    manifests.map(m => <TableRow {...m} allChecked={receiveAllCheck} select={setSelectedDockets} date={rcDate} message={msg} />) :
                                    <tr><td colspan="11" style={{ textAlign: "center" }}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}