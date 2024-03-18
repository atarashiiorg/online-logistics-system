import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'

export default function DestinationMaster() {

    const initialDestination = {
        destCode:"",
        destName:"",
        destBranch:"",
        country:"",
        state:"",
        zone:"",
        isActive:false
    }

    const [destination, setDestination] = useState(initialDestination)

    const handleDest=(e,f)=>{
        setDestination(p=>{
            const obj = {...p}
            if(f=='isActive'){
                obj.isActive = e.target.checked
                return obj
            } else {
                obj[f] = e.target.value
                return obj
            }
        })
    }

    const resetForm = ()=>{
        setDestination(initialDestination)
    }

    const saveDest = ()=>{

    }

    const exportDest = ()=>{
        
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Destination Master</p>
                <div>
                   <label htmlFor="">Country Name</label>
                   <select value={destination.country} onChange={e=>handleDest(e,"country")}>
                    <option value="null">--Please Select Country Name--</option>
                    <option value="india">INDIA</option>
                   </select>
                   <label htmlFor="">Destination Code</label>
                   <input type="text" value={destination.destCode} onInput={e=>handleDest(e,"destCode")} placeholder='Destination Code'/>

                   <label htmlFor="">State Name</label>
                   <select value={destination.state} onChange={e=>handleDest(e,"state")}>
                    <option value="null">--Please Select State Name</option>
                    <option value="HR">Haryana</option>
                   </select>
                   <label htmlFor="">Destination Name</label>
                   <input type="text" value={destination.destName} onInput={e=>handleDest(e,"destName")} placeholder='Destination Name'/>

                   <label htmlFor="">Zone Name</label>
                   <select value={destination.zone} onChange={e=>handleDest(e,"zone")}>
                    <option value="">--Please Select Zone Name--</option>
                   </select>
                   <label htmlFor="">Destination Branch</label>
                   <input type="text" value={destination.destBranch} onInput={e=>handleDest(e,"destBranch")} placeholder='Destination Branch'/>

                   <label htmlFor="">Active</label>
                   <p><input checked={destination.isActive} onChange={e=>handleDest(e,"isActive")} type="checkbox"/></p>
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