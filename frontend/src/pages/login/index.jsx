import style from './style.module.css'
import loginBg from '../../assets/loginBg1.png'
import { useContext, useEffect, useState } from 'react'
import {message} from 'antd';
import {loginUrl} from "../../constants"
import { useNavigate} from "react-router-dom"
import UserAuthContext from '../../contexts/authContext';

export default function Login() {
    const [loginCreds, setLoginCreds] = useState({username:"",password:""})

    const navigator = useNavigate()
    const {user,setUser} = useContext(UserAuthContext)
    useEffect(()=>{
        if(user){
            navigator("/dashboard")
        }
    })
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
            const res = await fetch(loginUrl,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(loginCreds)
            })
            if(res.status==404){    
                message.error("User not found !")
                return
            }
            if(res.status==401){
                message.error("Entered password id wrong")
                return
            }
            if(res.ok){
                message.success("Logged in successfully")
            }
            const data = await res.json()
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", data.token)
            setUser(data.user)
            // navigator("/dashboard")
        } catch (error) {
            message.error(error)
        }

    }
    return (
        <div className={style.container}>
            <img src={loginBg} alt="" />
            <div className={style.loginForm}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Username' value={loginCreds.username} onInput={e=>setLoginCreds(p=>{return {...p,username:e.target.value}})}/> 
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="text" placeholder='Password' value={loginCreds.password} onInput={e=>setLoginCreds(p=>{return {...p,password:e.target.value}})}/> 
                </div>
                <button onClick={onSubmit}>Login</button>
            </div>
        </div>
    )
}