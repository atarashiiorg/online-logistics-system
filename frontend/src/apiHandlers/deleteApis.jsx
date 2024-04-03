import { serverUrl } from "../constants"

export const useDeleteData = async(endPoint)=>{
    try {
        const res = await fetch(serverUrl+endPoint,{
            method:"DELETE",
            credentials:'include',
            headers:{
                
            }
        })
        const res_json = await res.json()
        if(res.ok){
            return {res:true,'msg':res_json.msg}
        } else if(res.status==500){
            return {res:false,'err':res_json.err}
        } else {
            return {res:false,'err':res_json.msg}
        }
    } catch (error) {
        return {res:false,'err':error}
    }
}