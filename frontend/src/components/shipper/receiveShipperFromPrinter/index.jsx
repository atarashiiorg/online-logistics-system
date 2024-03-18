import { useEffect, useState } from 'react'
import style from './style.module.css'
import { serverUrl } from '../../../constants'
import { useGetData } from '../../../apiHandlers/getApis'

const Tr = (shipper) => {
    return (
        <tr>
            {
                console.log(shipper)
            }
            <td>{shipper.index + 1}</td>
            <td>{shipper.branchCode}</td>
            <td>{shipper.docketFrom}</td>
            <td>{shipper.docketTo}</td>
            <td>{shipper.sendBy}</td>
        </tr>
    )
}

export default function ReceiveShipperFromPrinter() {
    const [err, loading, shippers] = useGetData("shipper")

    return (
        <>
            <div className={style.formContainer}>
                <p>Receive Shipper From Printer</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Branch</th>
                                <th>Docket from</th>
                                <th>Docket To</th>
                                <th>Send by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shippers.length <= 0 ?
                                    <tr>
                                        <td style={{ textAlign: "center" }} colSpan={5}>No data to show...</td>
                                    </tr> :
                                    null
                            }
                            {
                                shippers.map((s, index) => <Tr {...s} index={Number(index)} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}