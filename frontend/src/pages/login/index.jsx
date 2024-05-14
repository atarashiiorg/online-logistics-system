import style from './style.module.css'
import loginBg from '../../assets/loginBg1.png'
import { useContext, useEffect, useState } from 'react'
import {message} from 'antd';
import {serverUrl} from "../../constants"
import { useNavigate} from "react-router-dom"
import PasswordInput from '../../components/passwordInput';

export default function Login() {
    const [loginCreds, setLoginCreds] = useState({username:"",password:""})

    useEffect(()=>{
        document.title = "Safe dispatch logistics-Login"
    },[])

    const navigator = useNavigate()
    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            navigator("/dashboard")
        }
    },[])
    const onSubmit = async()=>{
        if(loginCreds.username.length<5){
            message.warning("Please Enter a valid username")
            return
        }
        if(loginCreds.password.length<8){
            message.warning("Password must be 8 characters long")
            return
        }

        try {
            const res = await fetch(serverUrl+"login",{
                method:"POST",
                credentials:'include',
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify(loginCreds)
            })
            if(res.status==404){    
                message.error("User not found !")
                return
            }
            if(res.status==401){
                message.error("Invalid Username or Password !")
                return
            }
            if(res.ok){
                message.success("Logged in successfully !")
            }
            const data = await res.json()
            sessionStorage.setItem("user", JSON.stringify(data.data))
            navigator("/dashboard")
        } catch (error) {
            message.error(error)
        }

    }
    return (
        <div className={style.container}>
            <img src={loginBg} />
            <div className={style.loginForm}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Username' value={loginCreds.username} onInput={e=>setLoginCreds(p=>{return {...p,username:e.target.value}})}/> 
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <PasswordInput onInput={e=>setLoginCreds(p=>{return {...p,password:e.target.value}})} value={loginCreds.password}/>
                </div>
                <button style={{cursor:'pointer'}} onClick={onSubmit}>Login</button>
            </div>
        </div>
    )
}