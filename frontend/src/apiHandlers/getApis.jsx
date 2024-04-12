import { useEffect, useState } from "react"
import { serverUrl } from "../constants"

async function fetchData(setErr, setLoading, setData,endPoint){
    try{
        setErr(null)
        setLoading(true)
        const res = await fetch(serverUrl + endPoint, {
            method: "GET",
            credentials:'include'
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

export const useDownloader = async(endpoint)=>{
        try {
            const response = await fetch(serverUrl+endpoint,{credentials:'include', method:"GET"});
            if (!response.ok || response.status!=204) {
                const json = await response.json()
                if(response.status==401){
                    return {redirect:true};
                }
                if(response.status==500){
                    throw new Error(json.err);
                } else {
                    throw new Error(json.msg);
                }
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
            return null;
        } catch (error) {
            throw error;
        }
}

export const useFetchDocketForManifest = async (docket, branch) => {
    try {
        const res = await fetch(serverUrl + "booking?docket=" + docket+"&branch="+branch,{method:"GET", credentials:'include'})
        const data = await res.json()
        if(res.ok)
            return {res:true,data:data.data}
        else {
            return {res:false,err:data.msg}
        }
    } catch (error) {
        return {res:false,err:error}
    }
}