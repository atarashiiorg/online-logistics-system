import { BsPrinter } from 'react-icons/bs'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'

export default function AwbPrint(){
    return (
        <>
            <div className={style.formContainer}>
                <p>AwbNo Print</p>
                <div>
                    <label htmlFor="">Awb No</label>
                    <span>
                    <textarea name="" id="" cols="49" rows="5" placeholder='Awb No'></textarea>
                    <p>Enter Your AwbNo, For multiple queries use commas (,)</p>
                    </span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><BsPrinter/> Print</button>
                <button className={style.buttonChk}><BsPrinter/> Print without logo</button>
                <button className={style.buttonChk}><BsPrinter/> Sticker Print</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}