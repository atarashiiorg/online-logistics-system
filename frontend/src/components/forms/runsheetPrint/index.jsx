import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'
import { TableTotalFound } from '../manifestPrint'
import { TableComp } from '../../minComp'
import { useDownloader, useGetData } from '../../../apiHandlers/getApis'
import { useContext, useState } from 'react'
import { FaPrint } from 'react-icons/fa6'
import { getDateForInput, getFormttedDate } from '../../../utils/helpers'
import Loading from '../../../pages/loading'
import UserAuthContext from '../../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

export default function RunsheetPrint() {
    const { currBranch, user, setUser } = useContext(UserAuthContext)
    const [fromDate, setFromDate] = useState(getDateForInput())
    const [toDate, setToDate] = useState(getDateForInput())
    const [runsheetFrom, setRunsheetFrom] = useState("")
    // const [runsheetTo, setRunsheetTo] = useState("")
    const [search,setSearch] = useState(false)
    const [err, loading, runsheetList] = useGetData(
        `runsheet?bid=${currBranch?._id}&fromDate=${fromDate}&toDate=${toDate}${runsheetFrom?"runsheetNo="+runsheetFrom:""}`, 
        [currBranch, search])
    const [downloading, setDownloading] = useState(false)

    const downloadRunsheet = async (id) => {
        setDownloading(true)
        try {
            const response = await useDownloader("runsheet?rid=" + id)
            if (response?.status == 401) {
                message.error("Session Expired")
                setUser(null);
                sessionStorage.clear();
                console.log(response.msg)
                return;
              }
              if (response.status != 200) {
                  message.error(response.msg);
                  console.log(response.msg)
              } else {
                  message.success("Downloaded")
              }
        } catch (error) {
            console.log(error)
            message.error(error.toString())
        } finally{
            setDownloading(false)
        }
    }

    const resetForm=()=>{
        setRunsheetFrom("")
        setFromDate(getDateForInput())
        setToDate(getDateForInput())
        setSearch(p=>!p)
    }

    return (
        <>
            {
                loading ? <Loading /> : null
            }
            {downloading ? <Loading /> : null}
            <div className={style.formContainer}>
                <p>Runsheet Print</p>
                <div>
                    <label htmlFor="">Runsheet Date from</label>
                    <input type="date" value={getDateForInput(fromDate)} onInput={e => setFromDate(e.target.value)} />
                    <label htmlFor="">To</label>
                    <input type="date" value={getDateForInput(toDate)} onInput={e => setToDate(e.target.value)} />

                    <label htmlFor="">Runsheet No</label>
                    <input type="text" value={runsheetFrom} onInput={e => setRunsheetFrom(e.target.value)} />
                    {/* <label htmlFor="">To</label>
                    <input type="text" value={runsheetTo} onInput={e => setRunsheetTo(e.target.value)} /> */}
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={e=>setSearch(p=>!p)}><FaCheck /> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><IoRefresh /> Reset</button>
            </div>

            <TableComp>
                <p>Runsheets:</p>
                <div>
                    <table style={{ minWidth: "100%" }}>
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
                                runsheetList?.length > 0 ?
                                    runsheetList?.map(r => {
                                        return (
                                            <tr>
                                                <td><FaPrint onClick={e => downloadRunsheet(r?._id)} style={{ color: "blueviolet", fontSize: "18px" }} /></td>
                                                <td>{r?.runsheetNumber}</td>
                                                <td>{getFormttedDate(r?.date)}</td>
                                                <td>{r?.employee?.name}</td>
                                                <td>{r?.dockets?.length}</td>
                                            </tr>
                                        )
                                    })
                                    : <tr><td colSpan={5} style={{ textAlign: 'center' }}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}