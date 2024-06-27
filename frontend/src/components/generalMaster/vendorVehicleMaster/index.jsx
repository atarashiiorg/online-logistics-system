import { FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { Mandatory, TableComp } from '../../minComp'
import { useGetData } from '../../../apiHandlers/getApis'
import { usePatchData } from '../../../apiHandlers/patchApis'
import { useDeleteData } from '../../../apiHandlers/deleteApis'
import { message } from 'antd'


const TableRow = (props)=>{
    const btnStyle = {
        fontSize:"20px",
        color:"blueviolet"
    }
    if(props.editKey==props.data._id)[
        btnStyle.color="green"
    ]
    return (
        <tr>
            <td><FaEdit style={btnStyle} onClick={e=>props.edit(props?.data)}/></td>
            <td><FaTrashAlt style={{fontSize:"20px", color:"red"}} onClick={e=>props.delete(props.data?._id)}/></td>
            <td>{props.data.ownerName}</td>
            <td>{props.data?.vehicleType}</td>
            <td>{props.data.vehicleNumber}</td>
            <td>{props.data.chasisNumber}</td>
            <td>{props.data.engineNumber}</td>
            <td>{props.data.rcNumber}</td>
            <td>{props.data.vehiclePermit}</td>
            <td>{props.data.insuranceCompanyName}</td>
            <td>{props.data.ownerName}</td>
            <td>{props.data.panNumber}</td>
            <td>{props.data.ownerPanName}</td>
            <td>{props.data.insuranceValidity}</td>
            <td>{props.data.fitnessValidity}</td>
            <td>{props.data.isActive?"YES":"NO"}</td>
        </tr>
    )
}


export default function VendorVehicleMaster() {
    const [err, loading, vendors, setVendors] = useGetData("vendor")
    const initialVendor = {
        vehicleNumber: "",
        vehicleType: "",
        chasisNumber: "",
        engineNumber: "",
        rcNumber: "",
        vehiclePermit: "",
        insuranceValidity: "",
        fitnessValidity: "",
        insuranceCompanyName: "",
        ownerName: "",
        panNumber: "",
        ownerPanName: "",
        isActive: false
    }

    const [vendor, setVendor] = useState(initialVendor)
    const [editKey, setEditKey] = useState("")

    const setVal = (e, f) => {
        setVendor(p => {
            const obj = { ...p }
            if (f == "isActive") {
                obj.isActive = e.target.checked
                return obj
            }
            obj[f] = e.target.value
            return obj
        })
    }

    const resetForm = ()=>{
        setVendor(initialVendor)
        setEditKey("")
    }

    const edit = (data)=>{
        setVendor(data)
        setEditKey(data._id)
    }

    const handleSave = async() => {
        const res = await usePostData(vendor,"vendor")
        if(!res.res){
            return
        }
        setVendors(p=>[...p, res.data])
        resetForm()
    }

    const handleEdit = async()=>{
        const res = await usePatchData(vendor,"vendor?vid="+editKey)
        if(!res.res){
            return
        }
        const newArr = [...vendors]
        const idx = newArr.findIndex(v=>v._id==editKey)
        newArr[idx] = {...res.data}
        setVendors(p=>[...newArr])
        setEditKey("")
        resetForm()
    }

    const handleDelete = async(id)=>{
        const res = await useDeleteData("vendor?vid="+id)
        if(!res.res){
            message.error(res.err)
            return
        } 
        const newArr = vendors.filter(v=>v._id!=id)
        setVendors(p=>[...newArr])
        message.success("Deleted successfully")
    }
    return (
        <>
            <div className={style.formContainer}>
                <p>Vendor Vehicle Master</p>
                <div>
                    <label htmlFor="">Vendor Code <Mandatory /></label>
                    <input type="text" placeholder='Vendor Code' disabled />
                    <label htmlFor="">Vehicle Number <Mandatory /></label>
                    <input type="text" placeholder='Vehicle Number' value={vendor.vehicleNumber} onInput={e => setVal(e, "vehicleNumber")} />
                    <label htmlFor="">Vehicle Type <Mandatory /></label>
                    <select onChange={e => setVal(e, "vehicleType")}>
                        <option value="null">--Select Vehicle Type--</option>
                        <option value="TATA ACE">TATA ACE</option>
                        <option value="BOLERO PICKUP">BOLERO PICKUP</option>
                        <option value="LPT 14 ft">LPT 14 ft</option>
                        <option value="LPT 17 ft">LPT 17 ft</option>
                        <option value="LPT 20 ft">LPT 20 ft</option>
                        <option value="LPT 22 ft">LPT 22 ft</option>
                    </select>

                    <label htmlFor="">Chasis No. <Mandatory /></label>
                    <input type="text" placeholder='Chasis No.' value={vendor.chasisNumber} onInput={e => setVal(e, "chasisNumber")} />
                    <label htmlFor="">Engine No. <Mandatory /></label>
                    <input type="text" placeholder='Engine No.' value={vendor.engineNumber} onInput={e => setVal(e, "engineNumber")} />
                    <label htmlFor="">RC Book No <Mandatory /></label>
                    <input type="text" placeholder='RC Book No.' value={vendor.rcNumber} onInput={e => setVal(e, "rcNumber")} />

                    <label htmlFor="">Vehicle Permit </label>
                    <input type="date" placeholder='Vehicle Permit' onInput={e => setVal(e, "verhiclePermit")} />
                    <label htmlFor="">Insurance Validity</label>
                    <input type="date" value={vendor.insuranceValidity} onInput={e => setVal(e, "insuranceValidity")} />
                    <label htmlFor="">Fitness Validity</label>
                    <input type="date" onInput={e => setVal(e, "fitnessValidity")} />

                    <label htmlFor="">Company Name <Mandatory /></label>
                    <input type="text" placeholder='Insurance Company Name' value={vendor.insuranceCompanyName} onInput={e => setVal(e, "insuranceCompanyName")} />
                    <label htmlFor="">Owner Name <Mandatory /></label>
                    <input type="text" placeholder='Vehicle Owner Name' value={vendor.ownerName} onInput={e => setVal(e, "ownerName")} />
                    <label htmlFor="">PAN No. <Mandatory /></label>
                    <input type="text" placeholder='PAN No.' value={vendor.panNumber} onInput={e => setVal(e, "panNumber")} />

                    <label htmlFor="">Owner Name <Mandatory /></label>
                    <input type="text" placeholder='Owner Name on PANCARD' value={vendor.ownerPanName} onInput={e => setVal(e, "ownerPanName")} />
                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" checked={vendor.isActive} onChange={e => setVal(e, "isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={editKey==""?handleSave:handleEdit}><FaCheck /> {editKey==""?"Save":"Update"}</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={e => setVendor(initialVendor)}><FaArrowRotateLeft /> Reset</button>
            </div>
    
            <TableComp>
                <p>Vendors</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Vendor Name</th>
                                <th>Vehicle Type</th>
                                <th>Vehicle Number</th>
                                <th>Chasis Number</th>
                                <th>Engine Number</th>
                                <th>RC Book Number</th>
                                <th>Vehicle Permit</th>
                                <th>Insurance Company Name</th>
                                <th>Vehicle Owner Name</th>
                                <th>PAN No</th>
                                <th>Owner Name on PAN</th>
                                <th>Insurance Validity</th>
                                <th>Fitness Validity</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendors.length > 0 ?
                                    vendors.map(v=><TableRow data={v} edit={edit} editKey={editKey} delete={handleDelete} key={v._id} />):
                                    <tr>
                                        <td colSpan={17} style={{ textAlign: "center" }}>No Data available</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}