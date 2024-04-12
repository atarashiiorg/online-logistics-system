import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { usePatchData } from '../../../apiHandlers/patchApis'

export default function ChangePassword() {
    const initPasswords = {
        currPass: "",
        newPass: "",
        conPass: ""
    }
    const [err, setErr] = useState(null)
    const [passes, setPasses] = useState(initPasswords)
    const setVal = (ev, key) => {
        setPasses(p => {
            const obj = { ...p }
            obj[key] = ev.target.value
            return obj
        })
    }

    const validate = () => {
        if (passes.currPass.length < 5) {
            setErr("Please enter current password !")
            return false
        }
        if (passes.newPass != passes.conPass) {
            setErr("New Password and Confirm Password Did'nt matched !")
            return false
        }
        setErr(null)
        return true
    }

    const changePass = async () => {
        if(!validate()){
            return
        } 
        const res = await usePatchData(passes,"self")
        if(res.res){
            // message.success("Password updated successfully")
            setPasses(initPasswords)
        } 
    }

    return   (
        <>
            <div className={style.formContainer}>
                <p>Change Password</p>
                <div>
                    <label htmlFor="">Old Password</label>
                    <input type="text" placeholder='Old Password' value={passes.currPass} onInput={e => setVal(e, "currPass")} onKeyUp={validate}/>

                    <label htmlFor="">New Password</label>
                    <input type="text" placeholder='New Password' value={passes.newPass} onInput={e => setVal(e, "newPass")} onKeyUp={validate}/>

                    <label htmlFor="">Confirm Password</label>
                    <input type="text" placeholder='Confirm Password' value={passes.conPass} onInput={e => setVal(e, "conPass")} onKeyUp={validate} />
                    <span style={{ color: "red" }}>{err}</span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={changePass} ><FaCheck /> Change Password</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
        </>
    )
}