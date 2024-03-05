import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'

export default function VendorVehicleMaster() {
    const initialVendor = {
        vehicleNumber:"",
        vehicleType:"",
        chasisNumber:"",
        engine:"",
        rcNumber:"",
        vehiclePermit:"",
        insuranceValidity:"",
        fitnessValidity:"",
        insuranceCompanyName:"",
        ownerName:"",
        panNumber:"",
        ownerPanName:"",
        isActive:false
    }

    const [vendor, setVendor] = useState(initialVendor)

    const setVal = (e,f)=>{
        setVendor(p=>{
            const obj = {...p}
            if(f=="isActive"){
                obj.isActive = e.target.checked
                return obj
            }
            obj[f] = e.target.value
        })
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Vendor Vehicle Master</p>
                <div>
                   <label htmlFor="">Vendor Code</label>
                   <input type="text" placeholder='Vendor Code' disabled/>
                   <label htmlFor="">Vehicle Number</label>
                   <input type="text" placeholder='Vehicle Number' value={vendor.vehicleNumber} onInput={e=>setVal(e,"vehicleNumber")}/>
                   <label htmlFor="">Vehicle Type</label>
                   <select>
                    <option value="null">--Select Vehicle Type--</option>
                    <option value=""></option>
                   </select>

                   <label htmlFor="">Chasis No.</label>
                   <input type="text" placeholder='Chasis No.'/>
                   <label htmlFor="">Engine No.</label>
                   <input type="text" placeholder='Engine No.'/>
                   <label htmlFor="">RC Book No</label>
                   <input type="text" placeholder='RC Book No.'/>

                   <label htmlFor="">Vehicle Permit</label>
                   <input type="date" placeholder='Vehicle Permit'/>
                   <label htmlFor="">Insurance Validity</label>
                   <input type="date"/>
                   <label htmlFor="">Fitness Validity</label>
                   <input type="date"/>

                   <label htmlFor="">Company Name</label>
                   <input type="text" placeholder='Insurance Company Name'/>
                   <label htmlFor="">Owner Name</label>
                   <input type="text" placeholder='Vehicle Owner Name'/>
                   <label htmlFor="">PAN No.</label>
                   <input type="text" placeholder='PAN No.'/>

                   <label htmlFor="">Owner Name</label>
                   <input type="text" placeholder='Owner Name on PANCARD'/>
                   <label htmlFor="">Active</label>
                   <p><input type="checkbox" /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest/>
            <TableTotalFound />
        </>
    )
}