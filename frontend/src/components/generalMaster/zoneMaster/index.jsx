import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { exportExcel } from '../../../utils/helpers'

export default function ZoneMaster() {
    const initialZone = {
        zoneCode:"",
        zoneName:"",
        isActive:false,
    }
    const [zone, setZone] = useState(initialZone)

    const handleZone = (e,f)=>{
        setZone(p=>{
            const obj = {...p}
            if(f=="isActive"){
                obj.isActive = e.target.checked
                return obj
            } else {
                obj[f] = e.target.value
                return obj
            }
        })
    }

    const resetForm = ()=>{
        setZone(initialZone)
    }

    const handleSave = ()=>{
        if(!usePostData(zone,"zone")){
            return
        } 
        resetForm()
    }

    const exportData = ()=>{
        exportExcel("zone master")
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Zone Master</p>
                <div>
                    <label htmlFor="">Zone Code</label>
                    <input type="text" value={zone.zoneCode} onInput={e=>handleZone(e,"zoneCode")} placeholder='Zone Code'/>
                    <label htmlFor="">Zone Name</label>
                    <input type="text" value={zone.zoneName} onInput={e=>handleZone(e,"zoneName")} placeholder='Zone Name'/>

                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" checked={zone.isActive} onChange={e=>handleZone(e,"isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp} onClick={exportData}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest />
            <TableTotalFound />
        </>
    )
}