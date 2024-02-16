import { useState } from "react"
import UserAuthContext from "../contexts/authContext"
export default function UserAuthState(props){
    const User = JSON.parse(localStorage?.getItem("user")) || null
    const [user, setUser] = useState(User)
    return (
        <UserAuthContext.Provider value={{user,setUser}} >
            {
                props.children
            }
        </UserAuthContext.Provider>
    )
} 