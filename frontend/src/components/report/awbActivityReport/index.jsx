import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function AwbActivityReport() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Awb Activity Report</p>
                <div>
                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No'/>
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