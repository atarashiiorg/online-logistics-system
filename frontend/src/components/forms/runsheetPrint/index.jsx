import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'
import { TableTotalFound } from '../manifestPrint'

export default function RunsheetPrint(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Runsheet Print</p>
                <div>
                    <label htmlFor="">Runsheet Date from</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">To</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">Runsheet No</label>
                    <input type="text" name="" id="" />
                    <label htmlFor="">To</label>
                    <input type="text" name="" id="" />
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