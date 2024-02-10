import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'

export default function UpdateClientOfAwb(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Update AwbNo Client</p>
                <div>
                    <label htmlFor="">Booking Date From</label>
                    <input type="date" />
                    <label htmlFor="">To</label>
                    <input type="date" />

                    <label htmlFor="">Client From</label>
                    <input type="text" placeholder='Client From'/>
                    <label htmlFor="">Client To</label>
                    <input type="text" placeholder='Client'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Transfer</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}