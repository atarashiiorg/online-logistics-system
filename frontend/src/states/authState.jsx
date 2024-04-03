import { useState, useEffect } from "react"
import UserAuthContext from "../contexts/authContext"
import {message} from 'antd'
import { serverUrl } from "../constants"
export default function UserAuthState(props){
    const User = JSON.parse(sessionStorage?.getItem("user")) || null
    const [user, setUser] = useState(User)
    const [docketTracking, setDocketTracking] = useState({show:false})
    const [branches, setBranches] = useState([])
    const [currBranch, setCurrBranch] = useState(null)
    const [docket, setDocket] = useState("")

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res = await fetch(serverUrl+"checklogin",{credentials:'include'})
                const json = await res.json()
                if(res.ok){
                    setUser(json.data)
                    setBranches(json.data.permissions.branchAccess.access)
                    sessionStorage.setItem("user",JSON.stringify(json.data))
                } else if(res.status==500){
                    message.error("Server Error: "+json.err)
                } else if(res.status==401){
                    setUser(null)
                    sessionStorage.removeItem("user")
                    message.error(json.msg)
                }
            } catch (error) {
                message.error(error)
            }
        }
        fetchUser()
    },[])

    return (
        <UserAuthContext.Provider value={
            {
                user,
                setUser,
                currBranch, 
                setCurrBranch, 
                docketTracking, 
                setDocketTracking,
                branches,
                setBranches,
                docket,
                setDocket
            }
        } >
            {
                props.children
            }
        </UserAuthContext.Provider>
    )
} 