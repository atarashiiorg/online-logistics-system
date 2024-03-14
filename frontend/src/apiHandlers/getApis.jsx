import { useEffect, useState } from "react"
import { serverUrl } from "../constants"
export const useGetBranches = () => {
    const [branches, setBranches] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "branch", {
                method: "GET",
                headers: {
                    // 'authorization':
                }
            })
            const data = await res.json()
            if (res.ok) {
                setBranches(p => [...data])
            }
            if (res.status == 304) {
                setErr(data.msg)
            }
            if (res.status == 500) {
                setErr("Internal server error : " + data.err)
            }
            setLoading(false)
        } catch (error) {
            setErr(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [err, loading, branches, setBranches]
}

export const useGetVendors = () => {
    const [vendors, setVendors] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "vendor", {
                method: "GET",
                headers: {

                }
            })
            const data = await res.json()
            if (res.ok) {
                setVendors([...data])
            }
            if (res.status == 304) {
                setErr(data.msg)
            }
            if (res.status == 500) {
                setErr("Internal server error: ", data.err)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [err, loading, vendors]
}

export const useGetClients = () => {
    const [clientList, setClientList] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "client", {
                method: "GET",
                headers: {}
            })
            const data = await res.json()
            if (res.ok) {
                setClientList([...data])
            }
            if (res.status == 304) {
                setErr(data.msg)
            }
            if (res.status == 500) {
                setErr("Internal server error: " + data.msg)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [err, loading, clientList]


}

export const useGetEmployees = () => {
    const [employees, setEmployees] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "employee", {
                method: "GET",
                headers: {}
            })
            const data = await res.json()
            if (res.ok) {
                setEmployees([...data])
            }
            if (res.status == 304) {
                setErr(data.msg)
            }
            if (res.status == 500) {
                setErr("Internal server error: " + data.err)
            }
            setLoading(false)
        } catch (err) {
            setErr(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [err, loading, employees]
}

export const useGetShippers = () => {
    const [shippers, setShippers] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "sendshipper")
            const json_res = await res.json()
            if (res.ok) {
                setShippers(json_res.data)
            } else if (res.status == 500) {
                setErr(json_res.err)
            } else {
                setErr(json_res.msg)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [err, loading, shippers]
}

export const useGetManifests = () => {
    const [manifests, setManifests] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setErr(null)
            setLoading(true)
            const res = await fetch(serverUrl + "manifest")
            const res_json = await res.json()
            if (res.status == 200) {
                console.log(res_json)
                setManifests([...res_json.manifests])
            } else if (res.status == 500) {
                setErr(res_json.err)
            } else {
                setErr(res_json.msg)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    return [err, loading, manifests]
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