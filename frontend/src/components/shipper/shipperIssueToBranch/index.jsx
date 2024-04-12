import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState, useEffect, useContext } from 'react'
import { message } from 'antd'
import { serverUrl } from '../.../../../../constants'
import { useGetData } from '../../../apiHandlers/getApis'
import { usePostData } from '../../../apiHandlers/postApis'
import UserAuthContext from '../../../contexts/authContext'


export default function ShipperIssueToBranch() {
    const initial = {
        issuedTo: "",
        docketFrom: "",
        docketTo: "",
        issueDate: "",
        receivedBy: ""
    }
    const [data, setData] = useState(initial)
    const { branches, user } = useContext(UserAuthContext)

    const handleData = (e, field) => {
        setData(p => {
            const obj = { ...p }
            switch (field) {
                case "issueDate":
                    obj.issueDate = e.target.valueAsDate
                    return obj
                case "issuedTo":
                    const bCode = e.target.value.split(":")[1]
                    if (e.target.value == "") {
                        obj.issuedTo = ""
                        return obj
                    }
                    const idx = branches.findIndex(b => b.branchCode == bCode)
                    if (idx >= 0) {
                        obj.issuedTo = branches[idx].branchCode
                    }
                    return obj
                default:
                    obj[field] = e.target.value
                    return obj
            }
        })
    }

    const resetForm = () => {
        setData(initial)
    }

    const handleSave = async () => {
        try {
            const res = await usePostData(data,"issueshippertobranch")
            if (res.res) {
                message.success("Shipper Issued To Branch")
                return
            } else {
                
            }
        } catch (err) {
            message.error(err)
            return
        }
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Shipper Issue To Branch</p>
                <div>
                    <label htmlFor="">Issued To</label>
                    <input type="text" list='branch' placeholder='Issued To' onInput={e => handleData(e, "issuedTo")} />
                    <datalist id="branch">
                        {
                                branches.map(b => <option value={b.branchName + ":" + b.branchCode}>{b.branchName}:{b.branchCode}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Docket From</label>
                    <input type="text" placeholder='Docket From' value={data.docketFrom} onInput={e => handleData(e, "docketFrom")} />

                    <label htmlFor="">Issue Date</label>
                    <input type="date" onInput={e => handleData(e, "issueDate")} />
                    <label htmlFor="">Docket To</label>
                    <input type="text" placeholder='Docket To' value={data.docketTo} onInput={e => handleData(e, "docketTo")} />

                    <label htmlFor="">Received By</label>
                    <input type="text" placeholder='Received By' value={data.receivedBy} onInput={e => handleData(e, "receivedBy")} />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableTotalFound />
        </>
    )
}