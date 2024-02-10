import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'

export default function ResetPassword() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Reset Password</p>
                <div>
                    <label htmlFor="">Type</label>
                    <select name="" id="">
                        <option value="user">User</option>
                        <option value="client">Client</option>
                    </select>

                    <label htmlFor="">User Id</label>
                    <input type="text" placeholder='User Id'/>

                    <label htmlFor="">New Password</label>
                    <input type="text" placeholder='New Password'/>

                    <label htmlFor="">Confirm Password</label>
                    <input type="text" placeholder='Confirm Password'/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Reset Password</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
        </>
    )
}