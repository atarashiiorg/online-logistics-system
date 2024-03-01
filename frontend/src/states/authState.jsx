import { useState } from "react"
import UserAuthContext from "../contexts/authContext"
export default function UserAuthState(props){
    const User = JSON.parse(localStorage?.getItem("user")) || null
    const [user, setUser] = useState(User)
    const [docketTracking, setDocketTracking] = useState({show:false})
    const [currBranch, setCurrBranch] = useState("null")
    return (
        <UserAuthContext.Provider value={{user,setUser, currBranch, setCurrBranch, docketTracking, setDocketTracking}} >
            {
                props.children
            }
        </UserAuthContext.Provider>
    )
} 