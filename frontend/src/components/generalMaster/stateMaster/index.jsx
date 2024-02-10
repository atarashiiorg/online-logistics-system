import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function StateMaster() {
    return (
        <>
            <div className={style.formContainer}>
                <p>State Master</p>
                <div>
                   <label htmlFor="">State Code</label>
                   <input type="text" placeholder='State Code'/>
                   <label htmlFor="">State Name</label>
                   <input type="text" placeholder='State Name'/>

                   <label htmlFor="">Active</label>
                   <p><input type="checkbox" /></p>
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