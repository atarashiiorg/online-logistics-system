import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../forms/manifestDirect'
import { TableTotalFound } from '../forms/manifestPrint'

export default function MisReport() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Mis Report</p>
                <div>
                   <label htmlFor="">Booking Date From</label>
                   <input type="date"/>
                   <label htmlFor="">Date To</label>
                   <input type="date"/>

                   <label htmlFor="">Client</label>
                   <input type="text" placeholder='Client'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaSearch /> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            <TableTotalFound />
        </>
    )
}