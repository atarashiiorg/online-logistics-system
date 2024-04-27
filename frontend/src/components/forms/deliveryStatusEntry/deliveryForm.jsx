import { Button, Input, Popconfirm, Select, Space, message } from "antd"
import { useState } from "react"
import { BsFillCameraFill } from "react-icons/bs"
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa"

export const Form = (props) => {
    const [deliverStatus, setDeliveryStatus] = useState({
        status: props.docketDetails?.packetStatus || "-1",
        rcType: "",
        rcName: "",
        podRemarks: "",
        podImage: null
    })

    const handleForm = (e) => {
        setDeliveryStatus(p => {
            const obj = { ...p }
            if (e.target.type == "file") {
                obj[e.target.name] = e.target.files[0]
            } else {
                obj[e.target.name] = e.target.value
            }
            console.log(obj)
            return obj
        })
    }

    const handleSelect = (f, val) => {
        setDeliveryStatus(p => {
            const obj = { ...p }
            obj[f] = val
            console.log(obj)
            return obj
        })
    }

    const validate = () => {
        if (deliverStatus.status == "-1") {
            message.warning("Please select delivery status.")
            return false
        }
        if (deliverStatus.rcType == "-1") {
            message.warning("Please select Receiving Type.")
            return false
        }
        if (deliverStatus.rcName.trim().length < 3) {
            message.warning("Please Enter Receiver Name.")
            return false
        }
        if (deliverStatus.podRemarks.trim().length < 3) {
            message.warning("Please Enter POD Remarks")
            return false
        }
        if (deliverStatus.podImage == null) {
            message.warning("Please upload POD")
            return false
        }

        return true
    }

    const submit = () => {
        if (!validate()) {
            return
        }

        props.onSubmit(deliverStatus)
    }
    return (
        <>
        {
            console.log(props.docketDetails)
        }
            {
                props.visible ?
                    <>
                        <Space style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch", gap: "22px" }}>
                            <label htmlFor="">Status</label>
                            <label htmlFor="">Receiving Type</label>
                            <label htmlFor="">Receiver Name</label>
                            <label htmlFor="">POD Remarks</label>
                            <label htmlFor=""></label>
                        </Space>
                        <Space style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                            <Select
                                name="status"
                                style={{ width: "100%" }}
                                defaultValue={deliverStatus.status}
                                onChange={(val) => handleSelect("status", val)}
                                options={[
                                    { value: "-1", label: "---Select status---" },
                                    { value: "delivered", label: "delivered" },
                                    { value: "undelivered", label: "unDelivered" },
                                    { value: "out for delivery", label: "Out for delivery" }
                                ]}
                            >
                            </Select>
                            <Select
                                name="rcType"
                                style={{ width: "100%" }}
                                defaultValue={"-1"}
                                onChange={(v) => handleSelect("rcType", v)}
                                options={[
                                    { value: "-1", label: "Select Receiving Type" },
                                    { value: "sign", label: "Sign" },
                                    { value: "stamp", label: "Stamp" },
                                    { value: "signAndStamp", label: "Sign and Stamp" }
                                ]}
                            >
                            </Select>
                            <Input placeholder='Receiver Name' value={deliverStatus.rcName} name="rcName" onInput={handleForm} />
                            <span style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
                                <Input placeholder='POD Remarks' name="podRemarks" onInput={handleForm} value={deliverStatus.podRemarks} />
                                <label htmlFor='pod' style={{
                                    color: "purple",
                                    padding: "3px",
                                    boxShadow: "2px 2px 3px grey",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                    backgroundColor: "whitesmoke"
                                }}><BsFillCameraFill style={{ fontSize: "23px" }} /></label>
                            </span>
                            <input id='pod' type='file' capture="environment" name="podImage" onChange={handleForm} hidden />
                            <span>{deliverStatus.podImage?.name}</span>
                            <Popconfirm onConfirm={submit} title="Sure to submit ?">
                                <Button style={{ width: "100%" }} type='primary'>Submit</Button>
                            </Popconfirm>
                        </Space>
                    </> : null
            }
        </>
    )
}