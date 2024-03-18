import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { exportExcel } from '../../../utils/helpers'

export default function StateMaster() {
    const initialState = {
        stateCode:"",
        stateName:"",
        isActive:false
    }

    const [state, setState] = useState(initialState)

    const handleState = (e,f)=>{
        setState(p=>{
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
    
    const resetForm =()=>{
        setState(initialState)
    }

    const handleSave = ()=>{
        if(!usePostData(state,"state")){
            return
        }
        resetForm()
    }

    const exportData = ()=>{
        exportExcel("state master")
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>State Master</p>
                <div>
                   <label >State Code</label>
                   <input type="text" value={state.stateCode} onInput={e=>handleState(e,"stateCode")} placeholder='State Code'/>
                   <label htmlFor="">State Name</label>
                   <input type="text" value={state.stateName} onInput={e=>handleState(e,"stateName")} placeholder='State Name'/>

                   <label htmlFor="">Active</label>
                   <p><input type="checkbox" checked={state.isActive} onChange={e=>handleState(e,"isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp} onClick={exportData}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest/>
            <TableTotalFound />
        </>
    )
}