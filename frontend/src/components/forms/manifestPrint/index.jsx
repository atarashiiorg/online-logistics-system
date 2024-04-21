import { BsCheck, BsFiletypeXls } from 'react-icons/bs'
import style from './style.module.css'
import { CgCheck, CgExport } from 'react-icons/cg'
import { FaCheck, FaPrint } from 'react-icons/fa6'
import { IoRefresh } from 'react-icons/io5'
import { TableComp } from '../../minComp'
import { useGetData } from '../../../apiHandlers/getApis'
import { serverUrl } from '../../../constants'
import { useDownloader } from '../../../apiHandlers/getApis'
import Loading from '../../../pages/loading'
import { useContext, useState } from 'react'
import UserAuthContext from '../../../contexts/authContext'
import { message } from 'antd'
import { FaSearch } from 'react-icons/fa'

export function TableTotalFound(props) {
    return (
        <>
            <div className={style.formContainer}>
                <p>Total Records Found: { }</p>
                <div>
                    {
                        props.children
                    }
                </div>
            </div>
        </>
    )
}

const TableRow = (m) => {
    const {setUser} = useContext(UserAuthContext)
    return (
        <tr>
            <td><FaPrint style={{ color: "blueviolet" }} onClick={
                async e => {
                    m.setIsDownloading(true)
                    try {
                        const res = await useDownloader("manifest?mid="+m._id)
                        if(res.redirect){
                            setUser(null)
                            sessionStorage.clear()
                        }
                    } catch (err){
                        message.error("Error occured: ", err.toString())
                    } finally {
                        m.setIsDownloading(false)
                    }
                }
            } /></td>
            <td>{m.manifestNumber}</td>
            <td>{new Date(m.manifestDate).toDateString()}</td>
            <td>{m?.fromBCode?.branchCode} : {m?.fromBCode?.branchName}</td>
            <td>{m?.toBCode?.branchCode} : {m?.toBCode?.branchName}</td>
            <td>{m?.dockets?.length}</td>
            <td>{m?.isReceived ? "YES" : "NO"}</td>
        </tr>
    )
}

export default function ManifestPrint() {
    const {currBranch} = useContext(UserAuthContext)
    const [err, loading, manifests] = useGetData("manifest?fbid="+currBranch?._id,[currBranch])
    const [isDownloading, setIsDownloading] = useState(false)
    return (
        <>
        {
            loading?<Loading/>:null
        }
        {
            isDownloading?<Loading/>:null
        }
            <div className={style.formContainer}>
                <p>Manifest Print</p>
                <div>
                    <label htmlFor="">Manifest Date From</label>
                    <input type="date" />
                    <label htmlFor="">To</label>
                    <input type="date" />

                    <label htmlFor="">To Branch</label>
                    <input type="text" placeholder='To Branch' />
                    <label htmlFor="">Manifest No</label>
                    <input type="text" placeholder='Manifest No' />
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
                    <table>
                        <thead>
                            <tr>
                                <th>Print</th>
                                <th>Manifest No.</th>
                                <th>Manifest Date</th>
                                <th>From BCode</th>
                                <th>To BCode</th>
                                <th>Total Docket</th>
                                <th>Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manifests.length > 0 ?
                                    manifests.map(m => <TableRow {...m} setIsDownloading={setIsDownloading} />) :
                                    <tr><td colSpan={7} style={{textAlign:'center'}}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}