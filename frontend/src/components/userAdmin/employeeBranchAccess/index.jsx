import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function EmployeeBranchAccess() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Employee Branch Access</p>
                <div>
                    <label htmlFor="">Employee</label>
                    <input type="text" placeholder='Employee'/>
                    <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>

            <SearchManifest/>
            <TableTotalFound/>
        </>
    )
}