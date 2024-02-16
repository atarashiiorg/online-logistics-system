import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ZoneMaster() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Zone Master</p>
                <div>
                    <label htmlFor="">Zone Code</label>
                    <input type="text" placeholder='Zone Code'/>
                    <label htmlFor="">Zone Name</label>
                    <input type="text" placeholder='Zone Name'/>

                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest />
            <TableTotalFound />
        </>
    )
}