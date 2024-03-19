import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'
import { useContext, useEffect, useState } from 'react'
import { message } from 'antd'
import { serverUrl } from '../../../constants'
import UserAuthContext from '../../../contexts/authContext'

export default function SendShipperForPrinting() {
    const shippers = {
        branch: "",
        date: "",
        docketFrom: "",
        docketTo: "",
        sendBy: "",
        remarks: ""
    }
    const [shipper, setShipper] = useState(shippers)
    const { branches } = useContext(UserAuthContext)
    const resetForm = () => {
        setShipper(shippers)
    }

    const onSubmit = async () => {
        if (shipper.branch.length < 5) {
            message.warning("Please enter a branch !")
            return
        }
        if (shipper.date == "") {
            message.warning("Please select a date !")
            return
        }
        if (shipper.docketFrom.length < 3) {
            message.warning("Please enter docket from number !")
            return
        }
        if (shipper.sendBy.length < 3) {
            message.warning("Please Enter send by !")
            return
        }
        if (shipper.docketTo.length < 3) {
            message.warning("Please enter docket To number !")
            return
        }
        if (shipper.remarks.length < 5) {
            message.warning("Enter some remarks !")
            return
        }
        if (Number(shipper.docketFrom) >= Number(shipper.docketTo)) {
            message.warning("shipper to must be greater than shipper from.")
            return
        }
        const res = await fetch(serverUrl + "sendshipper", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(shipper)
        })
        if (res.ok) {
            message.success("Data Saved successfully")
            resetForm()
            return
        }
        if (res.status == 401) {
            message.warning("Access Denied")
            return
        }
        if (res.status == 409) {
            message.warning("Shipper series already used")
            return
        }
        if (res.status == 500) {
            message.warning("Internal server error")
            return
        } else {
            message.warning("Something went wrong")
            return
        }
    }

    const setBranchCode = async (bCode) => {
        const b_code = bCode.split(":")[1]
        const b_id = await branches.filter(b => {
            if (b.branchCode == b_code) {
                return b
            }
        })
        await setShipper(p => { return { ...p, branch: b_id[0]?._id } })
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Send Shipper For Printing</p>
                <div>
                    <label htmlFor="">Branch</label>
                    <input type="text" list="branchOptions" placeholder='Branch' onInput={e => setBranchCode(e.target.value)} />
                    <datalist id='branchOptions'>
                        {
                            branches.map(branch => <option value={branch.branchName + ":" + branch.branchCode}>{branch.branchName}:{branch.branchCode}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Date</label>
                    <input type="date" onInput={e => setShipper(p => { return { ...p, date: e.target.valueAsDate } })} />

                    <label htmlFor="">Docket From</label>
                    <input type="text" placeholder='Docket From' value={shipper.docketFrom} onInput={e => setShipper(p => { return { ...p, docketFrom: e.target.value } })} />
                    <label htmlFor="">SendBy</label>
                    <input type="text" placeholder='Send By' value={shipper.sendBy} onInput={e => setShipper(p => { return { ...p, sendBy: e.target.value } })} />

                    <label htmlFor="">Docket To</label>
                    <span>
                        <input type="text" placeholder='Docket To' value={shipper.docketTo} onInput={e => setShipper(p => { return { ...p, docketTo: e.target.value } })} />
                    </span>
                    <label htmlFor="">Remarks</label>
                    <textarea cols="30" rows="3" placeholder='Remarks' value={shipper.remarks} onInput={e => setShipper(p => { return { ...p, remarks: e.target.value } })}></textarea>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={onSubmit}><FaCheck /> Save</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableTotalFound />
            <SearchManifest />
        </>
    )
}