import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'

export default function UpdateForwardingNo(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Update ForwardingNo</p>
                <div>
                    <label htmlFor="">Docket No</label>
                    <input type="text" placeholder='Docket No' />
                    <i></i>
                    <i></i>
                    
                    <label htmlFor="">Forwarder 1</label>
                    <input type="text" placeholder='Forwarder 1' />
                    <label htmlFor="">Forwarder 2</label>
                    <input type="text" placeholder='Forwarder 2' />

                    <label htmlFor="">Forwarding No1</label>
                    <input type="text" placeholder='Forwarding No1' />
                    <label htmlFor="">Forwarding No2</label>
                    <input type="text" placeholder='Forwarding No2' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Update</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}