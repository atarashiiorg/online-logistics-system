import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function DrsReport() {
    return (
        <>
            <div className={style.formContainer}>
                <p>DRS Report</p>
                <div>
                    <label htmlFor="">Date From</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Date To</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/>
                    <label htmlFor="">Physical POD</label>
                    <select>
                        <option value="all">All</option>
                        <option value="recieved">Recieved</option>
                        <option value="pending">Pending</option>
                    </select>

                    <label htmlFor="">Delivery Status</label>
                    <select>
                        <option value="all">All</option>
                        <option value="delivered">Delivered</option>
                        <option value="pending">Pending</option>
                    </select>
                    <label htmlFor="">Runsheet No</label>
                    <input type="text" placeholder='Runsheet No'/>

                    <label htmlFor="">Delivery Boy</label>
                    <input type="text" placeholder='Delivery Boy'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaSearch/> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            
        </>
    )
}