import { FaCheck } from 'react-icons/fa6'
import { TableTotalFound } from '../manifestPrint'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { IoRefresh } from 'react-icons/io5'

export default function ReceiveAwbNo(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Receive AwbNo Details</p>
                <div>
                    <label htmlFor="">RcDate</label>
                    <input type="date"  />
                    <label htmlFor="">RcTime</label>
                    <input type="time"  />

                    <label htmlFor="">Message</label>
                    <input type="text"  placeholder='To Branch'/>
                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Manifest No' />

                    <label htmlFor="">Auto Receive</label>
                    <span><input type="checkbox" /></span>
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