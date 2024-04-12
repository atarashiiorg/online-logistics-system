import { FaCheck, FaEdit } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { exportExcel } from '../../../utils/helpers'
import { useGetData } from '../../../apiHandlers/getApis'
import { TableComp } from '../../minComp'
import { usePatchData } from '../../../apiHandlers/patchApis'

const TableRow = (props)=>{
    const btnStyle = {
        fontSize:"20px",
        color:"blueviolet"
    }
    if(props.editKey==props.data?._id){
        btnStyle.color = "green"
    }
    return (
        <tr>
            <td><FaEdit style={btnStyle} onClick={e=>props.edit(props.data)}/></td>
            <td>{props?.data?.zoneCode}</td>
            <td>{props?.data?.zoneName}</td>
            <td>{props?.data?.createdBy?.name}</td>
            <td>{new Date(props?.data?.createdAt).toDateString()}</td>
            <td>{new Date(props?.data?.updatedAt).toDateString()}</td>
        </tr>
    )
}

export default function ZoneMaster() {
    const initialZone = {
        zoneCode:"",
        zoneName:"",
        isActive:false,
    }
    const [err,loading,zones, setZones] = useGetData("zone")
    const [zone, setZone] = useState(initialZone)
    const [editKey, setEditKey] = useState("")

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

    const edit = (data)=>{
        setEditKey(data._id)
        setZone(data)
    }

    const resetForm = ()=>{
        setZone(initialZone)
        setEditKey("")
    }

    const handleSave = async()=>{
        const res = await usePostData(zone,"zone")
        if(!res.res){
            return
        } 
        resetForm()
        setZones(p=>[...p, res.data])
    }

    const handleEdit = async()=>{
        const obj = {
            zoneCode:zone.zoneCode,
            zoneName:zone.zoneName,
            isActive:zone.isActive,
        }
        const res = await usePatchData(obj,"zone?zid="+editKey)
        if(!res.res){
            return
        }
        const idx = zones.findIndex(z=>z._id==editKey)
        const newArr = [...zones]
        newArr[idx] = {...res.data}
        setZones(p=>[...newArr])
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
                <button className={style.buttonChk} onClick={editKey==""?handleSave:handleEdit}><FaCheck />{editKey==""?"Save":"Update"}</button>
                <button className={style.buttonExp} onClick={exportData}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>
            <TableComp>
                <p>Zones:</p>
                <div>
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Zone Code</th>
                                <th>Active</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Modified At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                zones.length>0?
                                zones.map(z=><TableRow data={z} edit={edit} editKey={editKey} />):
                                <tr><td colSpan={6}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}