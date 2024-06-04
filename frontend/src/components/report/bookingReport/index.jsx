import { FaSearch } from 'react-icons/fa';
import style from './style.module.css';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { BsFiletypeXls } from 'react-icons/bs';
import { getDateForInput, getFormttedDate } from '../../../utils/helpers';
import { useGetData } from '../../../apiHandlers/getApis';
import { useContext, useState } from 'react';
import UserAuthContext from '../../../contexts/authContext';
import { serverUrl } from '../../../constants';
import { TableComp } from '../../minComp';
import { ExportToExcel } from '../../../utils/exportExcel';
import Loading from '../../../pages/loading';
import { message } from 'antd';

export default function BookingReport() {
  const [clientErr, clientLoading, clientList] = useGetData('client');
  const [destErr, destLoading, destList] = useGetData('dest');
  const [reports, setReports] = useState([])
  const [reportFormatData,setReportFormatData] = useState([])
  const [loading, setLoading] = useState(false)
  const { branches, setUser } = useContext(UserAuthContext);
  const initialFilters = {
    mode: '',
    dateFrom: getDateForInput(),
    dateTo: getDateForInput(),
    content: '',
    branch: '',
    branchText: '',
    org: '',
    orgText: '',
    dest: '',
    destText: '',
    billingType: '',
    client: '',
    clientText: '',
  };
  const [filters, setFilters] = useState(initialFilters);
  const handleFilters = (e) => {
    setFilters((p) => {
      const obj = { ...p };
      if (e.target.name == 'dest' || e.target.name == 'org') {
        const dCode = e.target.value.split(' : ')[0] || '';
        const dest = destList.filter((d) => d.destCode == dCode);
        obj[e.target.name] = dest[0]?._id || '';
        obj[e.target.id] = e.target.value;
      } else if (e.target.name == 'branch') {
        const bCode = e.target.value.split(' : ')[0] || '';
        const branch = branches.filter((b) => b.branchCode == bCode);
        obj[e.target.name] = branch[0]?._id || '';
        obj[e.target.id] = e.target.value;
      } else if (e.target.name == 'client') {
        const cCode = e.target.value.split(' : ')[0] || '';
        const client = clientList.filter((b) => b.clientCode == cCode);
        obj[e.target.name] = client[0]?._id || '';
        obj[e.target.id] = e.target.value;
      } else {
        obj[e.target.name] = e.target.value;
      }
      // console.log(obj)
      return obj;
    });
  };

  const searchReports = async () => {
    let query = '';
    if (filters.dateFrom && filters.dateTo) {
      query += `dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}&`;
    }
    if (filters.mode) {
      query += `mode=${filters.mode}&`;
    }
    if (filters.client) {
      query += `client=${filters.client}&`;
    }
    if (filters.branch) {
      query += `branch=${filters.branch}&`;
    }
    if (filters.org) {
      query += `org=${filters.org}&`;
    }
    if (filters.dest) {
      query += `dest=${filters.dest}&`;
    }
    if (filters.content) {
      query += `content=${filters.content}&`;
    }
    if (filters.billingType) {
      query += `billingType=${filters.billingType}&`;
    }

   try {
      setLoading(true)
     const res = await fetch(serverUrl + 'booking?report=1&' + query, {
       credentials: 'include',
     })
     const json = await res.json();
     if(res.status==500){
        message.error(res.err)
        return
     }
     if(res.status==401){
        message.error("Session Expired")
        setUser(null)
        return
     }
     if(res.status!=200){
        message.error(res.msg)
        return
     }
     setReports(p=>[...json.data])
     const data = json.data.map((d,i)=>{
      const obj = {sNo:i+1,...d}
      delete obj._id
      return obj
     })
     setReportFormatData(p=>[...data])
     message.success('Booking Reports fetched successfully')
   } catch (error) {
        message.error(error)
   }
   finally{
    setLoading(false)
   }
  };

  const cols = {
    sno:"SNo",
    bookingDate:"Booking Date",
    docketNumber:"Docket Number",
    bookingBranch:"Booking Branch",
    invoiceNumber:"Invoice Number",
    invoiceValue:"Invoice Value",
    client:"Client",
    consignor:"Consignor",
    consignee:"Consignee",
    origin:"Origin",
    destination:"Destination",
    destinationBranch:"Destination Branch",
    boxes:"Boxes",
    actualWeight:"Actual Weight",
    chargedWeight:"Charged Weight",
    status:"Status",
    paymentMode:"Payment Mode",
    codType:"COD/NONCOD",
    codAmount:"COD Amt.",
    odaCharges:"ODA Charges",
    statusRemarks:"Status Remarks",
    receiverName:"Receiver Name",
    receiverType:"Receiver Type",
    deliveryDate:"Delivery Date",
    // podLink:"POD"
  }
  const colsArr = Object.values(cols)
  const colsValArr = Object.keys(cols)
  return (
    <>
    {
      destLoading?<Loading/>:clientLoading?<Loading/>?loading:<Loading/>:null
    }
      <div className={style.formContainer}>
        <p>Booking Report</p>
        <div>
          <label htmlFor="">Booking Date From</label>
          <input
            type="date"
            name="dateFrom"
            value={getDateForInput(filters.dateFrom)}
            onInput={handleFilters}
          />
          <label htmlFor="">Date To</label>
          <input
            type="date"
            name="dateTo"
            value={getDateForInput(filters.dateTo)}
            onInput={handleFilters}
          />
          <label htmlFor="">Branch</label>
          <input
            type="text"
            list="branchlist"
            placeholder="Branch"
            name="branch"
            id="branchText"
            value={filters.branchText}
            onInput={handleFilters}
          />
          <datalist id="branchlist">
            {branches.map((b) => (
              <option value={b.branchCode + ' : ' + b.branchName}>
                {b.branchCode} : {b.branchName}
              </option>
            ))}
          </datalist>
          <label htmlFor="">Client</label>
          <input
            type="text"
            list="clientList"
            placeholder="Client"
            name="client"
            id="clientText"
            value={filters.clientText}
            onInput={handleFilters}
          />
          <datalist id="clientList">
            {clientList.map((c) => (
              <option value={c.clientCode + ' : ' + c.clientName}>
                {c.clientCode} : {c.clientName}
              </option>
            ))}
          </datalist>
          <label htmlFor="">Origin</label>
          <input
            type="text"
            list="dest"
            placeholder="Origin"
            name="org"
            id="orgText"
            value={filters.orgText}
            onInput={handleFilters}
          />
          <datalist id="dest">
            {destList.map((d) => (
              <option value={d.destCode + ' : ' + d.destName}>
                {d.destCode} : {d.destName}
              </option>
            ))}
          </datalist>
          <label htmlFor="">Destination</label>
          <input
            type="text"
            list="dest"
            placeholder="Destination"
            name="dest"
            id="destText"
            value={filters.destText}
            onInput={handleFilters}
          />

          <label htmlFor="">Mode</label>
          <select value={filters.mode} name="mode" onChange={handleFilters}>
            <option value="">--Select Service Type--</option>
            <option value="surface">Surface</option>
          </select>
          <label htmlFor="">Packet Content</label>
          <select
            name="content"
            value={filters.content}
            onChange={handleFilters}
          >
            <option value="">--Select Packet Content--</option>
            <option value="doc">Document</option>
            <option value="nondoc">Non Document</option>
          </select>

          <label htmlFor="">Billing Type</label>
          <select
            name="billingType"
            value={filters.billingType}
            onChange={handleFilters}
          >
            <option value="">--Select--</option>
            <option value="credit">Credit</option>
            <option value="topay">Topay</option>
            <option value="cash">Cash</option>
          </select>
          {/* <label htmlFor="">Contractor</label>
                    <input type="text" placeholder='Contractor Party'/>

                    <label htmlFor="">Contractor Date From</label>
                    <input type="date"/>
                    <label htmlFor="">Date To</label>
                    <input type="date" /> */}
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.buttonChk} onClick={searchReports}>
          <FaSearch /> Search
        </button>
        <ExportToExcel apiData={reportFormatData} fileName={"BookingReport"} />
        <button className={style.buttonRef}>
          <FaArrowRotateLeft /> Reset
        </button>
      </div>

      <TableComp>
        <p>Booking Reports:</p>
        <div>
            <table>
                <thead>
                    <tr>
                        {colsArr.map(h=><th>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        reports.map((b,index)=>{
                            return <tr>
                                {
                                    colsValArr.map((d)=>{
                                    if(d.toLowerCase()=='sno'){
                                        return <td>{index+1}</td>
                                    } else if(d.toLowerCase().includes("date")){
                                        return <td>{b[d]?getFormttedDate(b[d]):""}</td>
                                    } else if(d.toLowerCase()=="podlink"){
                                        return <td>{ b[d]?<a href={b[d]} target='_blank'>View POD</a>:"" }</td>
                                    }else{
                                        return <td>{b[d]}</td>
                                    }
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
      </TableComp>
    </>
  );
}
