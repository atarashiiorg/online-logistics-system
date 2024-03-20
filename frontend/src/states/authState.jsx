import { useState, useEffect } from "react"
import UserAuthContext from "../contexts/authContext"
import {message} from 'antd'
import { useGetBranches } from "../apiHandlers/getApis"
export default function UserAuthState(props){
    const User = JSON.parse(localStorage?.getItem("user")) || null
    const [user, setUser] = useState(User)
    const [docketTracking, setDocketTracking] = useState({show:false})
    const [err, loading, branches, setBranches] = useGetBranches()
    const [currBranch, setCurrBranch] = useState("null")
    const [docket, setDocket] = useState("")

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