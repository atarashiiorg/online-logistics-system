import { FaCheck } from 'react-icons/fa6'
import { TableTotalFound } from '../manifestPrint'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'
import { useGetData } from '../../../apiHandlers/getApis'
import { useContext, useState } from 'react'
import UserAuthContext from '../../../contexts/authContext'
import { TableComp } from '../../minComp'

const TableRow = (props) => {
    return (
        <>
            {
                props.dockets.map(d => {
                    const [isCheked, setIsChecked] = useState(false)
                    return <tr>
                        <td><input type="checkbox"  checked={isCheked} onChange={e=>setIsChecked(p=>!p)}/></td>
                        <td>{d?.booking?.docketNumber}</td>
                        <td>{props?.manifestNumber}</td>
                        <td>{""}</td>
                        <td>{""}</td>
                        <td>{props?.fromBCode?.branchName}</td>
                        <td>{d?.booking?.shipment?.totalBoxes}</td>
                        <td>{d?.booking?.shipment?.totalActualWeight}</td>
                        <td>{new Date(d?.booking?.bookingDate).toDateString()}</td>
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
    const [err, loading, manifests, setManifests] = useGetData("manifest?bid=" + currBranch._id, [currBranch])

    const receiveAll = ()=>{
        
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Receive AwbNo Details</p>
                <div>
                    <label htmlFor="">RcDate</label>
                    <input type="date" />
                    <label htmlFor="">RcTime</label>
                    <input type="time" />

                    <label htmlFor="">Message</label>
                    <input type="text" placeholder='Message' />
                    <label htmlFor="">Docket No</label>
                    <input type="text" placeholder='Docket No' />

                    <label htmlFor="">Auto Receive</label>
                    <span><input type="checkbox" /></span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><IoRefresh /> Reset</button>
            </div>

            <TableComp>
                <p>Manifests:</p>
                <div>
                    <table style={{ minWidth: "100%" }}>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /> All</th>
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
                                    manifests.map(m => <TableRow {...m} />) :
                                    <tr><td colspan="11" style={{ textAlign: "center" }}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}