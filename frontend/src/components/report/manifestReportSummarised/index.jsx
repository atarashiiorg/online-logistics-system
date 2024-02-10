import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ManifestReportSummarised() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest Report Summarised</p>
                <div>
                    <label htmlFor="">Manifest Date From</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Date To</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">From Branch</label>
                    <input type="text" placeholder='From Branch'/>
                    <label htmlFor="">To Branch</label>
                    <input type="text" placeholder='To Branch'/>

                    <label htmlFor="">Mode</label>
                    <select>
                        <option value="null">--Select Service Type--</option>
                        <option value="surface">Surface</option>
                    </select>
                    <label htmlFor="">Manual Manifest Number</label>
                    <input type="text" placeholder='Manual Manifest No.'/>

                    <label htmlFor="">Vendor Name</label>
                    <input type="text" placeholder='Vendor Name'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaSearch/> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            
            <SearchManifest/>
            <TableTotalFound/>
        </>
    )
}