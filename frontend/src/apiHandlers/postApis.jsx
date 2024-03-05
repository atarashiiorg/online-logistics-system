import { message } from "antd"
import { serverUrl } from "../constants"

export const usePostBooking = async(booking)=>{
    try {
        const res = await fetch(serverUrl+"booking",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        if(res.ok){
            message.success("Booked Successfully")
            return
        } 
        if(res.status==304){
            message.warning("Something went wrong")
            return
        }
        if(res.status==401){
            message.warning("Access Denied")
            return
        }
        if(res.status==409){
            message.warning("This docket number already used")
            return
        }
    } catch (error) {
        message.error(error)
        console.log(error);
    }
}

export const usePostVendor = async(vendor)=>{
    try {
        const res = fetch(serverUrl+"vendor",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(vendor)
        })
        const data =  await res.json()
        if(res.status==201){
            message.success("Vendor created successfully")
            return data
        }
        if(res.status==304){
            message.error(data.msg)
            return null
        }
        if(res.status==500){
            message.error("Internal server error: ",data.err)
            return null
        }
    } catch (error) {
        message.error(error)
        return null
    }
}