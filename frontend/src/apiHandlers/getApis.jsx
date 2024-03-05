import { useEffect, useState } from "react"
import { serverUrl } from "../constants"
export const useGetBranches = ()=>{
    const [branches, setBranches] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchData = async()=>{
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl+"branch",{
                method:"GET",
                headers:{
                    // 'authorization':
                }
            })
            const data = await res.json()
            if(res.ok){
                setBranches(p=>[...data])
            } 
            if(res.status==304) {
                setErr(data.msg)
            }
            if(res.status==500){
                setErr("Internal server error : "+data.err)
            }
            setLoading(false)
        } catch (error) {
            setErr(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return [err,loading,branches]
}

export const useGetVendors = ()=>{
    const [vendors, setVendors] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchData = async()=>{
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl+"vendor",{
                method:"GET",
                headers:{

                }
            })
            const data = await res.json()
            if(res.ok){
                setVendors([...data])
            }
            if(res.status==304){
                setErr(data.msg)
            }
            if(res.status==500){
                setErr("Internal server error: ",data.err)
            }
            setLoading(false)
        } catch (err){
            setErr(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return [err, loading, vendors]
}

export const useGetClients = ()=>{
    const [clients, setClients] = useState([])
    const [err,setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchData = async()=>{
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl+"client",{
                method:"GET",
                headers:{}
            })
            const data = await res.json()
            if(res.ok){
                setClients([...data])
            }
            if(res.status==304){
                setErr(data.msg)
            }
            if(res.status==500){
                setErr("Internal server error: "+data.msg)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return [err, loading, clients]


}

export const useGetEmployees = ()=>{
    const [employees, setEmployees] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async()=>{
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl+"employee",{
                method:"GET",
                headers:{}
            })
            const data = await res.json()
            if(res.ok){
                setEmployees([...data])
            }
            if(res.status==304){
                setErr(data.msg)
            }
            if(res.status==500){
                setErr("Internal server error: "+data.err)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return [err, loading, employees]
}

