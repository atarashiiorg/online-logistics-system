import { FaCheck, FaCross } from 'react-icons/fa6'
import style from './style.module.css'
import { FaTimes } from 'react-icons/fa'
import { IoRefresh } from 'react-icons/io5'
import { useState } from 'react'
import { useGetData } from '../../../apiHandlers/getApis'

export default function DrsEntry() {
    const initialDrs = {
        isNew: false,
        runsheetNumber: "",
        employee: "",
        empText: "",
        date: "",
        mobile: "",
        vendorType: null,
        vendor: "",
        vehicleType: "",
        vehicleNumber:"",
        driver: "",
        area: "",
        dockets: [],
        message: ""
    }
    const [drs, setDrs] = useState(initialDrs)
    const [docket, setDocket] = useState({})
    const [errEmp, loadingEmp, employeeList] = useGetData("employee")
    const [errVendor, loadingVendor, vendorList] = useGetData("vendor")

    const drsHandler = (e, f) => {
        setDrs(p => {
            const obj = { ...p }
            switch (f) {
                case "dockets":
                    obj.dockets = [...p?.dockets, docket._id]
                    return obj
                case "isNew":
                    obj.isNew = e.target.checked
                    return obj
                case "employee":
                    const eCode = e.target.value.split(" : ")[0]
                    const idx = employeeList?.findIndex(e => e?.eCode == eCode)
                    obj.employee = employeeList[idx]?._id
                    obj.empText = e.target.value
                    return obj
                case "vendor":
                    const idx2 = vendorList.findIndex(v => v._id == e.target.value)
                    obj.vendor = vendorList[idx2] || null
                    return obj
                case "vehicleType":
                    obj.vehicleType = e.target.value
                    if(e.target.value!="null")
                        obj.vehicleNumber = obj?.vendor?.vehicleNumber
                    else 
                        obj.vehicleNumber = ""
                    console.log(e.target.value)
                    return obj
                case "vendorType":
                    obj.vendorType = e.target.value
                    if(obj.vendorType=="null" || obj.vendorType=="self"){
                        obj.vendor=""
                        obj.vehicleType="",
                        obj.vehicleNumber=""
                    }
                    return obj
                default:
                    console.log(e.target.value)
                    obj[f] = e.target.value
                    return obj
            }
        })
    }
    return (
        <>
        {
            console.log(drs)
        }
            <div className={style.formContainer}>
                <p>DRS Entry</p>
                <div>
                    <label htmlFor="">DRS No.</label>
                    <div className={style.hybrid}>
                        <input type="text" placeholder='System Generated' value={drs?.runsheetNumber || ""} onInput={e => drsHandler(e, "runsheetNumber")} disabled={drs.isNew} />
                        <span>
                            <input type="checkbox" onChange={e => drsHandler(e, "isNew")} />
                            <label htmlFor="">New</label>
                        </span>
                    </div>
                    <label htmlFor="">Emp Name</label>
                    <input type="text" list='empList' placeholder='Emp Name' value={drs?.empText} onInput={e => drsHandler(e, "employee")} />
                    <datalist id="empList">
                        {
                           employeeList?.map(e => <option value={e.eCode + " : " + e.name}>{e.eCode} : {e.name}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Date</label>
                    <div>
                        <input type="date" value={new Date()} onInput={e => drsHandler(e, "date")} />
                        <input type="text" placeholder='Phone No' onInput={e => drsHandler(e, "mobile")} />
                    </div>

                    <label htmlFor="">Vendor Type</label>
                    <select onChange={e =>{drsHandler(e, "vendorType")}} >
                        <option value="null">--Select Vendor Type--</option>
                        <option value="paper">Paper</option>
                        <option value="self">Self</option>
                    </select>
                    <label htmlFor="">Vendor</label>
                    <select disabled={drs.vendorType == "self"} onChange={e => drsHandler(e, "vendor")} >
                        <option value={null}>--Select Vendor--</option>
                        {
                            //load available vendors
                            drs.vendorType!="null"?vendorList?.map(v => <option value={v._id}>{v.vendorCode} : {v.ownerPanName}</option>):null
                        }
                    </select>
                    <label htmlFor="">Vehicle Type</label>
                    <select disabled={drs.vendorType == "self"} onChange={e=>drsHandler(e,"vehicleType")}>
                        <option value={"null"}>--Select Vehicle Type--</option>
                        {
                            drs.vendor ? <option value={drs?.vendor?.vehicleType}>{drs?.vendor?.vehicleType}</option> : ""
                        }
                    </select>

                    <label htmlFor="">Vehicle No</label>
                    <input type="text" placeholder='Vehicle No' onInput={e => drsHandler(e, "vehicleNumber")} value={drs.vehicleNumber} />
                    <label htmlFor="">Driver</label>
                    <input type="text" placeholder='Driver' onInput={e => drsHandler(e, "driver")} />
                    <label htmlFor="">Area</label>
                    <input type="text" placeholder='Area' onInput={e => drsHandler(e, "area")} />

                    <label htmlFor="">Docket No</label>
                    <p>
                        <input type="text" placeholder='Docket No' onInput={e => setDocket(p => e.target.value)} />
                    </p>
                    <label htmlFor="">Total Weight</label>
                    <p>
                        <input type="text" placeholder='0.00' disabled />
                    </p>
                    <label htmlFor="">Message</label>
                    <textarea cols="30" rows="2" placeholder='Message' onInput={e => drsHandler(e, "message")}></textarea>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Submit</button>
                <button className={style.buttonDel}><FaTimes /> Delete</button>
                <button className={style.buttonDel}><FaTimes /> Del Docket</button>
                <button className={style.buttonRef}><IoRefresh /> Reset</button>
            </div>
        </>
    )
}