import { message } from "antd";
import { serverUrl } from "../constants";

export async function usePatchData(data, endPoint) {
    try {
        const res = await fetch(serverUrl+ endPoint,{
            method:"PATCH",
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const res_json = await res.json()
        if(res.status==200){
            message.success(res_json.msg)
            return {res:true,data:res_json.data}
        } else if(res.status == 500){
            message.error(res_json.err)
            return {res:false}
        } else {
            message.warning(res_json.msg)
            return {res:false}
        }
    } catch (err) {
        message.error(err)
        return {res:false}
    }
}