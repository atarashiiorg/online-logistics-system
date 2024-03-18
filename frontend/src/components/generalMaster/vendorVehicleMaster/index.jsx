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

export default function VendorVehicleMaster() {
    const [err, loading, vendors] = useGetData("vendor")
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

    const handleSave = () => {
        usePostData(vendor,"vendor")
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
                        <option value=""></option>
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
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={e => setVendor(initialVendor)}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest />
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
                                    vendors.map(v => {
                                        return (
                                            <tr>
                                                <td><FaEdit /></td>
                                                <td><FaTrashAlt /></td>
                                                <td>{v.ownerName}</td>
                                                <td>{v?.vehicleType}</td>
                                                <td>{v.vehicleNumber}</td>
                                                <td>{v.chasisNumber}</td>
                                                <td>{v.engineNumber}</td>
                                                <td>{v.rcNumber}</td>
                                                <td>{v.vehiclePermit}</td>
                                                <td>{v.insuranceCompanyName}</td>
                                                <td>{v.ownerName}</td>
                                                <td>{v.panNumber}</td>
                                                <td>{v.ownerPanName}</td>
                                                <td>{v.insuranceValidity}</td>
                                                <td>{v.fitnessValidity}</td>
                                                <td>{v.isActive?"YES":"NO"}</td>
                                            </tr>
                                        )
                                    })
                                    :
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