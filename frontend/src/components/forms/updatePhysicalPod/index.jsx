import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'

export default function UpdatePhysicalPod(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Update Physical Pod</p>
                <div>
                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Save</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}