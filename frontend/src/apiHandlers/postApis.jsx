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
            message.error(res_json.err)
            return {res:false}
        } else {
            message.warning(res_json.msg)
            return {res:false}
        }
    } catch (error) {
        message.error(error)
        console.log(error);
        return {res:false}
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
