import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'
import { TableTotalFound } from '../manifestPrint'
import { TableComp } from '../../minComp'
import { useDownloader, useGetData } from '../../../apiHandlers/getApis'
import { useContext, useState } from 'react'
import { FaPrint } from 'react-icons/fa6'
import {getFormttedDate} from '../../../utils/helpers'
import Loading from '../../../pages/loading'
import UserAuthContext from '../../../contexts/authContext'

export default function RunsheetPrint(){
    const {currBranch, user} = useContext(UserAuthContext)
    const [fromData, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [runsheetFrom, setRunsheetFrom] = useState("")
    const [runsheetTo, setRunsheetTo] = useState("")
    const [err, loading, runsheetList] = useGetData("runsheet?bid="+currBranch?._id+"&eid="+user._id,[currBranch])
    const [downloading, setDownloading] = useState(false)

    const downloadRunsheet = (id)=>{
        setDownloading(true)
        const res = useDownloader("runsheet?rid="+id)
        setDownloading(false)
    }

    return (
        <>
        {console.log(runsheetList[0])}
        {
            loading?<Loading/>:null
        }
        {downloading?<Loading/>:null}
            <div className={style.formContainer}>
                <p>Runsheet Print</p>
                <div>
                    <label htmlFor="">Runsheet Date from</label>
                    <input type="date" value={fromData} onInput={e=>setFromDate(e.target.value)} />
                    <label htmlFor="">To</label>
                    <input type="date" value={toDate} onInput={e=>setToDate(e.target.value)} />

                    <label htmlFor="">Runsheet No</label>
                    <input type="text" value={runsheetFrom} onInput={e=>setRunsheetFrom(e.target.value)}/>
                    <label htmlFor="">To</label>
                    <input type="text" value={runsheetTo} onInput={e=>setRunsheetTo(e.target.value)}/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>

            <TableComp>
                <p>Runsheets:</p>
                <div>
                    <table style={{minWidth:"100%"}}>
                        <thead>
                            <tr>
                                <th>Print</th>
                                <th>Runsheet No.</th>
                                <th>Runsheet Date</th>
                                <th>Emp Name</th>
                                <th>Total Dockets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               runsheetList?.length>0?
                               runsheetList?.map(r=>{
                                return (
                                    <tr>
                                        <td><FaPrint onClick={e=>downloadRunsheet(r?._id)} style={{color:"blueviolet",fontSize:"18px"}}/></td>
                                        <td>{r?.runsheetNumber}</td>
                                        <td>{getFormttedDate(r?.date)}</td>
                                        <td>{r?.employee?.name}</td>
                                        <td>{r?.dockets?.length}</td>
                                    </tr>
                                )
                               })
                               :<tr><td colSpan={5} style={{textAlign:'center'}}>No Data Available</td></tr> 
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}