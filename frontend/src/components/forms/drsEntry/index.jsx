import { FaCheck, FaCross } from 'react-icons/fa6'
import style from './style.module.css'
import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import { IoRefresh } from 'react-icons/io5'
import { useContext, useEffect, useState } from 'react'
import { useFetchDocketForManifest, useGetData } from '../../../apiHandlers/getApis'
import UserAuthContext from '../../../contexts/authContext'
import { message } from 'antd'
import { TableComp } from '../../minComp/index'
import Loading from '../../../pages/loading'
import {usePostData} from '../../../apiHandlers/postApis'

export default function DrsEntry() {
    const initialDrs = {
        isNew: true,
        runsheetNumber: "",
        employee: "",
        empText: "",
        date: "",
        mobile: "",
        vendorType: "",
        vendor: "",
        vehicleType: "",
        vehicleNumber: "",
        driver: "",
        area: "",
        dockets: [],
        message: ""
    }
    const [drs, setDrs] = useState(initialDrs)
    const { currBranch } = useContext(UserAuthContext)
    const [docket, setDocket] = useState({ dnum: "", weight: "" })
    const [errEmp, loadingEmp, employeeList] = useGetData("employee?role=dlb&branch="+currBranch?._id)
    const [errVendor, loadingVendor, vendorList] = useGetData("vendor")
    const [isPosting,setIsPosting] = useState(false)


    const handleDocket = async (e) => {
        if (e.keyCode == 13) {
            if (!currBranch) {
                message.warning("Please select Current Branch")
                return
            }

            if (!parseInt(docket.dnum) || docket.length < 3 ) {
                message.warning("Enter a valid docket Number")
                return
            }

            const data = await useFetchDocketForManifest(docket.dnum, currBranch?._id)
            if (data.res) {
                setDocket(p => ({ ...p, weight: data.data?.weight }))
                const idx = drs.dockets.findIndex(d=>d._id==data.data?._id)
                if(idx>-1){
                    return
                }
                setDrs(p => {
                    return { ...p, dockets:[...p.dockets,{...data.data, booking:data.data._id}] }
                })
            } else {
                message.error(data?.err)
            }
            return
        } else if (e.keyCode == 8 || e.keyCode == 46) {
            setDocket(p=>{
                return {...p,weight:0}
            })
            return
        }
    }

    const removeDocket = (id)=>{
        const newArr = drs.dockets.filter(d=>d._id!=id)
        setDocket({dnum:"",weight:""})
        setDrs(p=>{
            return {...p,dockets:[...newArr]}
        })
    }

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
                    obj.vendor = vendorList[idx2] || ""
                    return obj
                case "vehicleType":
                    obj.vehicleType = e.target.value
                    if (e.target.value != "null")
                        obj.vehicleNumber = obj?.vendor?.vehicleNumber
                    else
                        obj.vehicleNumber = ""
                    return obj
                case "vendorType":
                    obj.vendorType = e.target.value
                    if (obj.vendorType == "null" || obj.vendorType == "self") {
                        obj.vendor = ""
                        obj.vehicleType = "",
                            obj.vehicleNumber = ""
                    }
                    return obj
                default:
                    obj[f] = e.target.value
                    return obj
            }
        })
    }

    const resetForm = ()=>{
        setDrs(p=>initialDrs)
        setDocket({dnum:"",weight:""})
    }

    const handleSubmit = async()=>{
        const rest = "to prepare runsheet"
        if(!currBranch){
            message.warning("Please select current branch")
            return
        }
        if(drs.employee==""){
            message.warning("Please select employee "+rest)
            return
        }
        if(drs.date==""){
            message.warning("Please select date "+rest)
            return
        }
        // if(dr)
        if(drs.dockets.length<=0){
            message.warning("Please select some dockets"+rest)
            return
        }
        if(drs.vendorType=="self"){
            delete drs.vendor
        }
        setIsPosting(true)
        const result = await usePostData({...drs,branch:currBranch?._id},"runsheet")
        if(result.res){
            resetForm()
        }
        setIsPosting(false)
    }


    useEffect(()=>{
        resetForm()
    },[currBranch])

    return (
        <>
        {
            isPosting?<Loading/>:null
        }
        {
            loadingEmp?<Loading/>:loadingVendor?<Loading/>:null
        }
            <div className={style.formContainer}>
                <p>DRS Entry</p>
                <div>
                    <label htmlFor="">DRS No.</label>
                    <div className={style.hybrid}>
                        <input type="text" placeholder='System Generated' value={drs?.runsheetNumber || ""} onInput={e => drsHandler(e, "runsheetNumber")} disabled={drs.isNew} />
                        <span>
                            <input type="checkbox" checked={drs.isNew} onChange={e => drsHandler(e, "isNew")} />
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
                        <input type="date" onInput={e => drsHandler(e, "date")} />
                        <input type="text" placeholder='Phone No' onInput={e => drsHandler(e, "mobile")} />
                    </div>

                    <label htmlFor="">Vendor Type</label>
                    <select value={drs.vendorType} onChange={e => { drsHandler(e, "vendorType") }} >
                        <option value="">--Select Vendor Type--</option>
                        <option value="paper">Paper</option>
                        <option value="self">Self</option>
                    </select>
                    <label htmlFor="">Vendor</label>
                    <select disabled={drs.vendorType == "self"} value={drs.vendor?._id} onChange={e => drsHandler(e, "vendor")} >
                        <option value="">--Select Vendor--</option>
                        {
                            //load available vendors
                            drs.vendorType != "" ? vendorList?.map(v => <option value={v._id}>{v.vendorCode} : {v.ownerPanName}</option>) : null
                        }
                    </select>
                    <label htmlFor="">Vehicle Type</label>
                    <select disabled={drs.vendorType == "self"} value={drs.vehicleType} onChange={e => drsHandler(e, "vehicleType")}>
                        <option value={""}>--Select Vehicle Type--</option>
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
                        <input type="text" inputMode='search' placeholder='Docket No' value={docket.dnum} onKeyDown={handleDocket} onInput={e=>setDocket(p=>{return {...p,dnum:e.target.value}})} />
                    </p>
                    <label htmlFor="">Total Weight</label>
                    <p>
                        <input type="text" value={docket.weight} placeholder='0.00' disabled />
                    </p>
                    <label htmlFor="">Message</label>
                    <textarea cols="30" rows="2" placeholder='Message' onInput={e => drsHandler(e, "message")}></textarea>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSubmit}><FaCheck /> Submit</button>
                <button className={style.buttonDel}><FaTimes /> Delete</button>
                <button className={style.buttonDel}><FaTimes /> Del Docket</button>
                <button className={style.buttonRef} onClick={resetForm}><IoRefresh /> Reset</button>
            </div>

            {
                drs.dockets.length > 0 ?
                    <TableComp>
                        <div>
                            <table style={{ minWidth: "100%" }}>
                                <thead>
                                    <th>Docket No.</th>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Consignor</th>
                                    <th>Consignee</th>
                                    <th>Weight</th>
                                    <th>ToPay</th>
                                    <th>Cod</th>
                                    <th>Remove</th>
                                </thead>
                                <tbody>
                                    {
                                        drs.dockets.map(d => {
                                            return <tr>
                                                <td>{d.docketNumber}</td>
                                                <td>{d.origin}</td>
                                                <td>{d.destination}</td>
                                                <td>{d.consignor}</td>
                                                <td>{d.consignee}</td>
                                                <td>{d.weight||0}</td>
                                                <td>{d.toPay||0}</td>
                                                <td>{d.cod||0}</td>
                                                <td style={{textAlign:"center"}}><FaTrashAlt style={{color:"red", fontSize:"18px"}} onClick={e=>removeDocket(d._id)} /></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </TableComp> : null
            }
        </>
    )
}