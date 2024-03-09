import { message } from "antd"
import { serverUrl } from "../constants"
import { FaSlideshare } from "react-icons/fa"

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