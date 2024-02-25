import { BsCheck, BsFiletypeXls } from 'react-icons/bs'
import style from './style.module.css'
import { CgCheck, CgExport } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa6'
import { IoRefresh } from 'react-icons/io5'

export function TableTotalFound(props){
    return (
        <>
             <div className={style.formContainer}>
                <p>Total Records Found: {}</p>
                <div>
                    {
                        props.children
                    }
                </div>
            </div>
        </>
    )
}

export default function ManifestPrint() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest Print</p>
                <div>
                    <label htmlFor="">Manifest Date From</label>
                    <input type="date"  />
                    <label htmlFor="">To</label>
                    <input type="date"  />

                    <label htmlFor="">To Branch</label>
                    <input type="text"  placeholder='To Branch'/>
                    <label htmlFor="">Manifest No</label>
                    <input type="text" placeholder='Manifest No' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>

            <TableTotalFound/>   
        </>
    )
}