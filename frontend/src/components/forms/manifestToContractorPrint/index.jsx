import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls, BsPrinter } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'

export default function ManifestToContractorPrint(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest To Contractor Print</p>
                <div>
                    <label htmlFor="">Manifest Date</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No'/>

                    <label htmlFor="">Contractor</label>
                    <input type="text" placeholder='Contractor Party' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Search</button>
                <button className={style.buttonPrint}><BsFiletypeXls/> Export</button>
                <button className={style.buttonPrint}><BsPrinter/> Print</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}