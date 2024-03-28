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
import { useContext } from 'react'
import UserAuthContext from '../../../contexts/authContext'

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
    return (
        <tr>
            <td><FaPrint style={{ color: "blueviolet" }} onClick={
                async e => {
                    await useDownloader("manifest?mid="+m._id)
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
    const [err, loading, manifests] = useGetData("manifest?fbid="+currBranch._id,[currBranch])
    return (
        <>
        {
            loading?<Loading/>:""
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
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Print</th>
                                <th>Manifest No.</th>
                                <th>Manifest Date</th>
                                <th>BCode</th>
                                <th>ToBCode</th>
                                <th>Total Docket</th>
                                <th>Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                manifests.length > 0 ?
                                    manifests.map(m => <TableRow {...m} />) :
                                    <tr><td colSpan={7}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}