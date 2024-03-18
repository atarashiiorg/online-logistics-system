import { message } from "antd"
import { serverUrl } from "../constants"
import { FaSlideshare } from "react-icons/fa"

export const usePostData = async (data,endPoint) => {
    try {
        const res = await fetch(serverUrl + endPoint, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res_json = await res.json()
        if (res.status == 201) {
            message.success(res_json.msg)
            return {res:true,data:res_json.data}
        } else if(res.status==500){
            message.error(res_json.msg)
            return {res:false}
        } else {
            message.warning(res_json.err)
            return {res:false}
        }
    } catch (error) {
        message.error(error)
        console.log(error);
        return {res:false}
    }
}

export const usePostBooking = async (booking) => {
    try {
        const res = await fetch(serverUrl + "booking", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        const res_json = await res.json()
        if (res.status == 201) {
            message.success("Booked Successfully")
            return true
        } else {
            message.warning(res_json.msg)
        }
        if (res.status == 500) {
            message.error(res_json.err)
            return false
        }
        return false
    } catch (error) {
        message.error(error)
        console.log(error);
        return false
    }
}

export const usePostVendor = async (vendor) => {
    console.log(vendor);
    try {
        const res = await fetch(serverUrl + "vendor", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(vendor)
        })
        const data = await res.json()
        if (res.status == 201) {
            message.success("Vendor created successfully")
            return data
        }
        if (res.status == 304) {
            message.error(data.msg)
            return null
        }
        if (res.status == 500) {
            message.error("Internal server error: ", data.err)
            return null
        }
    } catch (error) {
        message.error(error)
        return null
    }
}

export const usePostManifest = async (manifest) => {
    console.log(manifest)
    try {
        const res = await fetch(serverUrl + "manifest", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(manifest)
        })
        const data = await res.json()
        if (res.status == 201) {
            message.success("Manifest created successfully")
            return data
        }
        if (res.status == 203) {
            message.error(data.msg)
            return null
        }
        if (res.status == 404) {
            message.error(data.msg || "not found")
        }
        if (res.status == 500) {
            message.error("Internal server error: ", data.err)
            return null
        }
    } catch (error) {
        message.error(error)
        return null
    }
}

export const usePostClient = async (client) => {
    try {
        const res = await fetch(serverUrl + "client", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(client)
        })
        const res_json = await res.json()
        if (res.status == 201) {
            message.success("Client created")
        } else {
            message.error(res_json.msg)
        }
        if (res.status == 500) {
            message.error(res_json.err)
        }
    } catch (err) {
        message.error(err)
    }
}

export const usePostBranch = async(branch, update)=>{
    try {
        let res = {}
        let res_json = {}
        if(!update){
            res = await fetch(serverUrl+"branch",{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(branch)
            })
            res_json = await res.json()
            if(res.status==201){
                message.success("Branch created successfully")
                return {res:true, branch: res_json.branch}
            } 
        } else {
            res = await fetch(serverUrl+"branch?bid="+branch.id,{
                method:"PATCH",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(branch.branch)
            })
            res_json = await res.json()
            if(res.status==200){
                message.success("Branch updated successfully")
                return {res:true, branch: res_json.branch}
            } 
        }

        if(res.status==500){
            message.error(res_json.err)
            return {res:false}
        } else {
            message.error(res_json.msg)
            return {res:false}
        } 

    } catch (err) {
        message.error("Error Occured: ",err)
        return {res:false}
    }
}

export const usePostState = async (state) => {
    try {
        const res = await fetch(serverUrl + "state", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(state)
        })
        const res_json = await res.json()
        if (res.status == 201) {
            message.success("State created")
            return true
        } else if(res.status==500){
            message.error(res_json.err)
            return false
        } else {
            message.error(res_json.msg)
            return false
        }
    } catch (err) {
        message.error(err)
        return false
    }
}

// export const usePostData = async (endPoint,data) => {
//     try {
//         const res = await fetch(serverUrl + endPoint, {
//             method: "POST",
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         const res_json = await res.json()
//         if (res.status == 201) {
//             message.success(res_json.msg)
//             return true
//         } else if(res.status==500){
//             message.error(res_json.err)
//             return false
//         } else {
//             message.error(res_json.msg)
//             return false
//         }
//     } catch (err) {
//         message.error(err)
//         return false
//     }
// }