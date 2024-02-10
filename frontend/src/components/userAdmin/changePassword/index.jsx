import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'

export default function ChangePassword() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Change Password</p>
                <div>
                    <label htmlFor="">Old Password</label>
                    <input type="text" placeholder='Old Password'/>

                    <label htmlFor="">New Password</label>
                    <input type="text" placeholder='New Password'/>

                    <label htmlFor="">Confirm Password</label>
                    <input type="text" placeholder='Confirm Password'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Change Password</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
        </>
    )
}