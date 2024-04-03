import HomeContext from "../contexts/homeContext"
import { useState } from "react"
const HomeState = (props) => {
    const [docket, setDocket] = useState("")
    return (
        <HomeContext.Provider value={{ docket, setDocket }}>
            {
                props?.children
            }
        </HomeContext.Provider>
    )
}

export default HomeState