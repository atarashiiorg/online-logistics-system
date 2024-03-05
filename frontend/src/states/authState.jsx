import { useState, useEffect } from "react"
import UserAuthContext from "../contexts/authContext"
import {message} from 'antd'
export default function UserAuthState(props){
    const User = JSON.parse(localStorage?.getItem("user")) || null
    const [user, setUser] = useState(User)
    const [docketTracking, setDocketTracking] = useState({show:false})
    const [branches, setBranches] = useState([])
    const [currBranch, setCurrBranch] = useState("null")

    const fetchBranches = async()=>{
        try {
            const res = await fetch(serverUrl+"client")
            if(res.ok){
                const d = await res.json()
                setClients(d)
            } else {
                message.warning("Something went wrong while fetching clients")
            }
        } catch(err) {
            message.error(err)
        }
    }

    useEffect(()=>{
        fetchBranches()
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
                setBranches
            }
        } >
            {
                props.children
            }
        </UserAuthContext.Provider>
    )
} 