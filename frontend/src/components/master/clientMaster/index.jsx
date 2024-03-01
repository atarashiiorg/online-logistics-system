import { FaCheck, FaTrash, FaUserEdit } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft, FaDeleteLeft, FaXmark } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'
import { useState, useEffect } from 'react'
import { Mandatory } from '../../minComp'
import { serverUrl } from '../../../constants'
import { message } from 'antd'

const ClientListRow = ({c,i}) => {
    return (
        <tr>
            <td><FaUserEdit/></td>
            <td>{c.clientCode}</td>
            <td>{c.clientName}</td>
            <td>{c.state}</td>
            <td>{c.city}</td>
            <td>{c.phone}</td>
            <td>{c.address}</td>
            <td>{c.pincode}</td>
            <td>{c.fovCharge}</td>
            <td>{}</td>
        </tr>
    )
}

export default function ClientMaster() {

    const intialClient = {
        clientName: "",
        introDate: "",
        tinNo: "",
        branchName: "",
        group: "",
        contactPerson: "",
        billPrefix: "",
        address: "",
        place: "",
        city: "",
        pincode: "",
        state: "",
        email: "",
        autoEmails: [],
        phone: "",
        faxNo: "",
        emailTo: "",
        panNo: "",
        gstNo: "",
        emailCC: "",
        fuelOn: "",
        minFovCharge: "",
        fovPercentage: "",
        isActive: false,
        isGroup: false,
        isShipperValid: false,
        isThirdPartyBilling: false,
        airMinWeight: "",
        trainMinWeight: "",
        roadMinWeight: "",
        remarks: ""
    }

    const initialFov = {
        fovUpto: "",
        amount: ""
    }

    const initialFuel = {
        mode: "",
        bookingType: "",
        service: "",
        fuelCharge: ""
    }

    const initialCharge = {
        chargeType: "",
        mode: "",
        fromWeight: "",
        toWeight: "",
        charge: ""
    }

    const initialModeType = {
        modeType: "",
        serviceType: "",
        minWeight: ""
    }

    const intialClientCharge = {
        fovDetails: [],
        clientChargeDetails: [],
        fuelDetails: [],
        modeTypeDetails: []
    }

    const [client, setClient] = useState(intialClient)
    const [clienChrages, setClientChrages] = useState(intialClientCharge)
    const [fov, setFov] = useState(initialFov)
    const [fuel, setFuel] = useState(initialFuel)
    const [charge, setCharge] = useState(initialCharge)
    const [mode, setMode] = useState(initialModeType)
    const [branches, setBranches] = useState([])
    const [clientList, setClientList] = useState([])

    const fetchBranches = async () => {
        try {
            const res = await fetch(serverUrl + "branch")
            if (res.status == 500) {
                message.warning("Internal Server Error Occured")
                return
            }
            if (res.status == 304) {
                message.warning("Something went wrong")
                return
            }
            const data = await res.json()
            setBranches(data)
        } catch (err) {
            message.error(err)
            return
        }
    }

    useEffect(() => {
        fetchBranches()
    }, [])

    const handleClient = (e, field) => {
        setClient(p => {
            const obj = { ...p }
            switch (field) {
                case "introDate":
                    obj.introDate = e.target.valueAsDate
                    return obj
                case "isActive":
                    obj.isActive = e.target.checked
                    return obj
                case "isGroup":
                    obj.isGroup = e.target.checked
                    return obj
                case "isShipperValid":
                    obj.isShipperValid = e.target.checked
                    return obj
                case "isThirdPartyBilling":
                    obj.isThirdPartyBilling = e.target.checked
                    return obj
                case "taxNotApplicable":
                    obj.taxNotApplicable = e.target.checked
                    return obj
                case "autoEmails":
                    obj.autoEmails = e.target.value.trim().split(",")
                    return obj
                case "branchName":
                    const bCode = e.target.value.split(":")[1]
                    const idx = branches.findIndex(b => b.branchCode == bCode)
                    if (idx >= 0) {
                        obj.branchName = branches[idx]._id
                        return obj
                    }
                    return obj
                default:
                    obj[field] = e.target.value
                    return obj
            }
        })
    }

    const resetForm = () => {
        setClient(intialClient)
    }

    const handleSave = () => {
        try {
            const res = fetch(serverUrl + "client", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    client,
                    clienChrages
                })
            })
            if (res.status == 200) {
                message.success("Client Saved Successfully")
                return
            }
            if (res.state == 304) {
                message.warning("Something went wrong")
                return
            }
            if (res.status == 500) {
                message.error("Internal server error occured")
                return
            }
        } catch (err) {
            console.log(err);
            message.error(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(serverUrl + "client")
                if (res.status == 304) {
                    message.warning("Something went wrong while fetching clients data")
                    return
                }
                if (res.status == 500) {
                    message.error("Internal server error occured")
                    return
                }
                if (res.status == 404) {
                    message.warning("Resource not found")
                    return
                }
                const data = await res.json()
                setClientList([...data])
            } catch (err) {
                message.error(err)
                return
            }
        })()
    }, [])

    return (
        <>
            {console.log(client.autoEmails)}
            <div className={style.formContainer}>
                <p>Client Master</p>
                <div>
                    <label htmlFor="">Client Code <Mandatory /></label>
                    <input type="text" placeholder='System Generated' disabled />
                    <label htmlFor="">Tin No</label>
                    <input type="email" placeholder='Tin No' value={client.tinNo} onInput={e => handleClient(e, "tinNo")} />

                    <label htmlFor="">Client Name <Mandatory /></label>
                    <input type="text" placeholder='Client Name' value={client.clientName} onInput={e => handleClient(e, "clientName")} />
                    <label htmlFor="">Intro Date</label>
                    <input type="date" onInput={e => handleClient(e, "introDate")} />

                    <label htmlFor="">Branch Name</label>
                    <input type="text" list='branch' placeholder='Branch Name' onInput={e => handleClient(e, "branchName")} />
                    <datalist id='branch'>
                        {
                            branches.map(b => <option value={b.branchName + ":" + b.branchCode}>{b.branchName}:{b.branchCode}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Group</label>
                    <input type="text" placeholder='Group' value={client.group} onInput={e => handleClient(e, "group")} />

                    <label htmlFor="">Contact Person <Mandatory /></label>
                    <input type="text" placeholder='Contact Person' value={client.contactPerson} onInput={e => handleClient(e, "contactPerson")} />
                    <label htmlFor="">Bill Prefix</label>
                    <input type="mobile" placeholder='Bill Prefix' value={client.billPrefix} onInput={e => handleClient(e, "billPrefix")} />

                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Address' value={client.address} onInput={e => handleClient(e, "address")} />
                    <label htmlFor="">Air Min Weight</label>
                    <input type="text" placeholder='Air Min Weight' value={client.airMinWeight} onInput={e => handleClient(e, "airMinWeight")} />

                    <label htmlFor="">Place</label>
                    <input type="text" placeholder='Place' value={client.place} onInput={e => handleClient(e, "place")} />
                    <label htmlFor="">Train Min Weight</label>
                    <input type="text" placeholder='Train Min Weight' value={client.trainMinWeight} onInput={e => handleClient(e, "trainMinWeight")} />

                    <label htmlFor="">State <Mandatory /></label>
                    <input type="text" placeholder='State' value={client.state} onInput={e => handleClient(e, "state")} />
                    <label htmlFor="">Road Min Weight</label>
                    <input type="text" placeholder='Road Min Weight' value={client.roadMinWeight} onInput={e => handleClient(e, "roadMinWeight")} />

                    <div>
                        <label htmlFor="">City <Mandatory /></label>
                        <label htmlFor="">Pin Code</label>
                    </div>
                    <div>
                        <input type="text" placeholder='City' value={client.city} onInput={e => handleClient(e, "city")} />
                        <input type="text" placeholder='Pin Code' value={client.pincode} onInput={e => handleClient(e, "pincode")} />
                    </div>
                    <label htmlFor="">Remarks</label>
                    <span>
                        <textarea cols="30" rows="3" value={client.remarks} onInput={e => handleClient(e, "remarks")}></textarea>
                    </span>

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email Id' value={client.email} onInput={e => handleClient(e, "email")} />
                    <label htmlFor="">Min FOV Charge</label>
                    <p className={style.triple}>
                        <input type="text" placeholder='0.00' value={client.minFovCharge} onInput={e => handleClient(e, "minFovCharge")} />
                        <strong>FOV(%)</strong>
                        <input type="text" placeholder='FOV Percenet' value={client.fovPercentage} onInput={e => handleClient(e, "fovPercentage")} />
                    </p>

                    <label htmlFor="">Email ID's For Auto Emails</label>
                    <span>
                        <textarea cols="30" rows="3" onInput={e => handleClient(e, "autoEmails")}></textarea>
                    </span>
                    <div>
                        <label htmlFor="">GST No.</label>
                        <label htmlFor="">Email CC</label>
                    </div>
                    <div>
                        <input type="text" placeholder='GST No.' value={client.gstNo} onInput={e => handleClient(e, "gstNo")} />
                        <input type="text" placeholder='Email CC' value={client.emailCC} onInput={e => handleClient(e, "emailCC")} />
                    </div>

                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder='Phone' value={client.phone} onInput={e => handleClient(e, "phone")} />
                    <label htmlFor="">Active</label>
                    <i>
                        <input type="checkbox" onChange={e => handleClient(e, "isActive")} />
                        <div>
                            <strong>Tax Not Applicable</strong>
                            <input type="checkbox" onChange={e => handleClient(e, "taxNotApplicable")} />
                        </div>
                    </i>

                    <label htmlFor="">Fax</label>
                    <input type="text" placeholder='Fax No.' value={client.faxNo} onInput={e => handleClient(e, "faxNo")} />
                    <label htmlFor="">Fuel On</label>
                    <select onInput={e => handleClient(e, "fuelOn")}>
                        <option value="">Base Frieght</option>
                        <option value="">Sub Total</option>
                    </select>

                    <label htmlFor="">Email To</label>
                    <input type="text" placeholder='Email To' value={client.emailTo} onInput={e => handleClient(e, "emailTo")} />
                    <label htmlFor="">Is Shipper Valid</label>
                    <i><input type="checkbox" onChange={e => handleClient(e, "isShipperValid")} /></i>

                    <label htmlFor="">Pan No</label>
                    <input type="text" placeholder='Pan No' value={client.panNo} onInput={e => handleClient(e, "panNo")} />
                    <label htmlFor="">Is Third Party Billing</label>
                    <i><input type="checkbox" onChange={e => handleClient(e, "isThirdPartyBilling")} /></i>

                    <label htmlFor="">Is Group</label>
                    <i><input type="checkbox" onChange={e => handleClient(e, "isGroup")} /></i>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Client Fov Detail</p>
                <div className={style.client}>
                    <label htmlFor="">FOV Upto</label>
                    <input type="text" placeholder='0.00' />
                    <label htmlFor="">Amount</label>
                    <input type="text" placeholder='0.00' />

                    <div>
                        <button className={style.buttonChk}><FaCheck /></button>
                        <button className={style.buttonRef}><FaXmark /></button>
                    </div>
                </div>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Fov Upto</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div className={style.formContainer}>
                <p>Client Fuel Detail</p>
                <div className={style.client}>
                    <label htmlFor="">Mode</label>
                    <select>
                        <option value="">Surface</option>
                    </select>
                    <label htmlFor="">Booking Type</label>
                    <select>
                        <option value="">Domestic</option>
                        <option value="">Export</option>
                        <option value="">Import</option>
                    </select>
                    <div></div>

                    <label htmlFor="">Service</label>
                    <select name="" id="">
                        <option value="">--SELECT SERVICE--</option>
                        <option value="">All</option>
                    </select>
                    <label htmlFor="">Fuel Charge</label>
                    <input type="text" placeholder='0.00' />

                    <div>
                        <button className={style.buttonChk}><FaCheck /></button>
                        <button className={style.buttonRef}><FaXmark /></button>
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Mode</th>
                            <th>Booking Type</th>
                            <th>Service</th>
                            <th>Fuel Charge</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>

            <div className={style.formContainer}>
                <p>Client Charge Detail</p>
                <div className={style.client}>
                    <label htmlFor="">Charge Type</label>
                    <select>
                        <option value="">Docket Charge</option>
                    </select>
                    <label htmlFor="">Mode</label>
                    <select>
                        <option value="">Surface</option>
                    </select>

                    <div></div>

                    <label htmlFor="">From weight</label>
                    <input type="text" />
                    <label htmlFor="">To weight</label>
                    <input type="text" />

                    <div>
                        <button className={style.buttonChk}><FaCheck /></button>
                        <button className={style.buttonRef}><FaXmark /></button>
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Charge Type</th>
                            <th>Mode</th>
                            <th>From Weight</th>
                            <th>To Weight</th>
                            <th>Docket Charge</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div className={style.formContainer}>
                <p>Mode Type Detail</p>
                <div className={style.client}>
                    <label htmlFor="">Mode Type</label>
                    <select>
                        <option value="">AIR</option>
                        <option value="">TRAIN</option>
                        <option value="">ROAD</option>
                    </select>
                    <label htmlFor="">Service Type</label>
                    <input type="text" placeholder='Service Type' />

                    <div></div>

                    <label htmlFor="">Min Weight</label>
                    <input type="text" placeholder='0.00' />

                    <div>
                        <button className={style.buttonChk}><FaCheck /></button>
                        <button className={style.buttonRef}><FaXmark /></button>
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Mode Type</th>
                            <th>Service Type</th>
                            <th>Min Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <div className={style.tableContainer}>
                <p>Clients</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>edit</th>
                                <th>Client Code</th>
                                <th>Client Name</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Pincode</th>
                                <th>FOV Charge</th>
                                <th>FOV Percent</th>
                                <th>Docket Charge</th>
                                <th>Air Min Weight</th>
                                <th>Train Min Weight</th>
                                <th>Road Min Weight</th>
                                <th>GST No.</th>
                                <th>Active</th>
                                <th>isShipperValid</th>
                                <th>Auto Emails</th>
                                <th>createdAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientList.length > 0 ?
                                    clientList.map((c, i) => <ClientListRow c={c} i={i} />) :
                                    <tr>
                                        <td colSpan={18}>No data available</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}