import { FaCheck, FaDownload, FaFileImport, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ImportPacketBooking() {
    return (
        <>
            <div className={style.note}>
                <h3>Note:</h3>
                <p>1. Please upload only Excel files of format .xlsx .</p>
                <p>2. Below Given Fields and Excel Header Should be Same.</p>
            </div>

            <div className={style.formContainer}>
                <input type="file" name="" id="" />
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaFileImport/> Import</button>
                <button className={style.buttonExp}><FaDownload/> Download Format 1</button>
                <button className={style.buttonExp}><FaDownload /> Download Format 2</button>
            </div>
            
            <SearchManifest/>
            <TableTotalFound/>
        </>
    )
}