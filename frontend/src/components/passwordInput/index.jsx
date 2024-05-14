import React, { useState } from "react";
import style from './style.module.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function PasswordInput({onInput,value}){
    const [showPassword,setShowPassword] = useState(false)
    const [icon,setIcon] = useState(<FaEye className={style.icon}/>)
    return(
        <div className={style.container}>
            <input type={(showPassword)?"text":"password"} name="password" id="password" onInput={onInput} placeholder="Password" value={value}/>
            <span onClick={
                (e)=>{
                    if(showPassword){
                        setShowPassword(false)
                        setIcon(<FaEye className={style.icon}/>)
                    } else {
                        setShowPassword(true)
                        setIcon(<FaEyeSlash className={style.icon}/>)
                    }
                }
            }>{icon}</span>
        </div>
    )
}