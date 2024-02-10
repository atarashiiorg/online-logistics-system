import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ViewPodScan() {
    return (
        <>
            <div className={style.formContainer}>
                <p>View POD Scan</p>
                <div>
                    <label htmlFor="">Booking Date From</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">To Date</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No'/>
                    <label htmlFor="">Branch Name</label>
                    <input type="text" placeholder='Branch Name'/>

                    <label htmlFor="">Client Name</label>
                    <input type="text" placeholder='Client Name'/>
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