import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ArrivalEntryReport() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Arrival Entry Report</p>
                <div>
                    <label htmlFor="">Booking Date From</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Date To</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/>
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