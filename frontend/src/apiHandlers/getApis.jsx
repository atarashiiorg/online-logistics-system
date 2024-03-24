import { useEffect, useState } from "react"
import { serverUrl } from "../constants"

async function fetchData(setErr, setLoading, setData,endPoint){
    try{
        setErr(null)
        setLoading(true)
        const res = await fetch(serverUrl + endPoint, {
            method: "GET",
            headers: {
                // 'authorization':
            }
        })
        const res_json = await res.json()
        if (res.ok) {
            setData(p => [...res_json.data])
        } else if (res.status == 500) {
            setErr("Internal server error : " + res_json.err)
        } else {
            setErr(res_json.err)
        }
        setLoading(false)
    } catch(err){
        setLoading(false)
        setErr(err)
    }
}

export const useGetBranches = () => {
    const [branches, setBranches] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData(setErr,setLoading, setBranches, "branch")
    }, [])

    return [err, loading, branches, setBranches]
}

export const useGetData = (url, dependency) => {
    const [data, setData] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData(setErr, setLoading, setData, url)
    }, [...dependency || ""])

    return [err, loading, data, setData]
}

function getFilenameFromContentDisposition(contentDisposition) {
    const match = contentDisposition.match(/filename="(.+?)"/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

export const useDownloader = async (mid)=>{
        try {
            const response = await fetch(serverUrl+"manifest?mid="+mid);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = getFilenameFromContentDisposition(contentDisposition);

            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = objectUrl;
            anchor.download = filename || 'manifest.pdf';

            document.body.appendChild(anchor);
            anchor.click();
            
            setTimeout(() => {
              window.URL.revokeObjectURL(objectUrl);
              document.body.removeChild(anchor);
            }, 0);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
}

export const useFetchDocketForManifest = async (docket, branch) => {
    try {
        const res = await fetch(serverUrl + "booking?docket=" + docket+"&branch="+branch)
        const data = await res.json()
        if(res.ok)
            return {res:true,data:data.data}
        else 
            return {res:false,err:data.msg}
    } catch (error) {
        return {res:false,err:error}
    }
}