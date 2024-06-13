import { useContext, useEffect, useState } from 'react';
import style from './style.module.css';
import { FaArrowCircleDown, FaCheck, FaRegSave, FaTrashAlt } from 'react-icons/fa';
import { IoRefresh } from 'react-icons/io5';
import { Mandatory, TableComp } from '../../minComp';
import { getDateForInput } from '../../../utils/helpers';
import UserAuthContext from '../../../contexts/authContext';
import { useGetData } from '../../../apiHandlers/getApis';
import { serverUrl } from '../../../constants';
import { message } from 'antd';
import { MdRefresh } from 'react-icons/md';

export function VolWeight({
  volWeight,
  handleVolWeight,
  add,
  reset,
  deleteWeight,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={style.formContainer}>
        <p>
          <input
            type="checkbox"
            onChange={(e) =>
              e.target.checked ? setShow(true) : setShow(false)
            }
          />{' '}
          Vol Weight
        </p>
        <div>
          <label htmlFor="">
            Total Boxes <Mandatory />
          </label>
          <input
            type="text"
            placeholder="0"
            value={volWeight?.totalBoxes}
            onInput={(e) => handleVolWeight(e, 'totalBoxes')}
          />
          <label htmlFor="">
            Actual Weight <Mandatory />
          </label>
          <input
            type="text"
            placeholder="0.00"
            value={volWeight?.actualWeight}
            onInput={(e) => handleVolWeight(e, 'actualWeight')}
          />
        </div>
        {show ? (
          <>
            <span>
              <div>
                <label htmlFor="">Length</label>
                <input
                  type="text"
                  placeholder="Length (in.)"
                  value={volWeight.len == 0 ? '' : volWeight.len}
                  onInput={(e) => handleVolWeight(e, 'len')}
                />
              </div>
              <div>
                <label htmlFor="">Breadth</label>
                <input
                  type="text"
                  placeholder="Breadth (in.)"
                  value={volWeight.breadth == 0 ? '' : volWeight.breadth}
                  onInput={(e) => handleVolWeight(e, 'breadth')}
                />
              </div>
              <div>
                <label htmlFor="">Height</label>
                <input
                  type="text"
                  placeholder="Height (in.)"
                  value={volWeight.height == 0 ? '' : volWeight.height}
                  onInput={(e) => handleVolWeight(e, 'height')}
                />
              </div>
              <div>
                <label htmlFor="">Pcs</label>
                <input
                  type="text"
                  placeholder="0"
                  value={volWeight.pcs == 0 ? '' : volWeight.pcs}
                  onInput={(e) => handleVolWeight(e, 'pcs')}
                />
              </div>
              <div>
                <label htmlFor="">Divisor</label>
                <input
                  type="text"
                  placeholder="0"
                  disabled
                  value={volWeight.divisor == 0 ? '' : volWeight.divisor}
                  onInput={(e) => handleVolWeight(e, 'divisor')}
                />
              </div>
              <div>
                <label htmlFor="">Dimensional Weight</label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={volWeight.dimWeight}
                />
              </div>
              <button className={style.buttonSave} onClick={add}>
                <FaRegSave /> Add
              </button>
              <button className={style.buttonRef} onClick={reset}>
                <IoRefresh /> Reset
              </button>
            </span>
            {volWeight.weights.length > 0 ? (
              <span style={{ width: '100%', padding: '0', overflow: 'scroll' }}>
                <TableComp>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Length</th>
                          <th>Breadth</th>
                          <th>Height</th>
                          <th>Piecies</th>
                          <th>Divisor</th>
                          <th>Dimensional Weight</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volWeight.weights.map((w) => (
                          <tr>
                            <td>{w.len}</td>
                            <td>{w.breadth}</td>
                            <td>{w.height}</td>
                            <td>{w.pcs}</td>
                            <td>{w.divisor}</td>
                            <td>{w.dimWeight}</td>
                            <td>
                              <FaTrashAlt
                                style={{ color: 'red' }}
                                onClick={(e) => deleteWeight(w.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TableComp>
              </span>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}

export function ForwardingForm() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={style.formContainer}>
        <p>
          <input
            type="checkbox"
            onChange={(e) =>
              e.target.checked ? setShow(true) : setShow(false)
            }
          />{' '}
          Forwarding Details
        </p>
        {show ? (
          <div>
            <label htmlFor="">Forwarder Name 1</label>
            <input type="text" placeholder="Forwarder Name 1" />
            <label htmlFor="">Forwarder No 2</label>
            <input type="text" placeholder="Forwarder No 1" />
            <label htmlFor="">Forwarding Date</label>
            <input type="date" placeholder="Forwarding Date" />
          </div>
        ) : (
          <i style={{ padding: '20px' }}></i>
        )}
      </div>
    </>
  );
}

export function AwbDetails({
  handleInput,
  handleChange,
  values,
  destinations,
}) {
  return (
    <>
      <div className={style.formContainer}>
        <p>
          AWB Details
          <span>
            <input type="checkbox" /> Fix
          </span>
        </p>
        <div>
          <label htmlFor="">Booking Branch</label>
          <input type="text" value={values.branchText} placeholder='Booking Branch' disabled />
          <label htmlFor="">Origin</label>
          <input
            type="text"
            list="dests"
            placeholder="Origin"
            name="originText"
            id="origin"
            value={values.originText}
            onInput={handleInput}
          />
          <datalist id="dests">
            {destinations.map((d) => (
              <option value={d?.destCode + ' : ' + d?.destName}>
                {d?.destCode + ' : ' + d?.destName}
              </option>
            ))}
          </datalist>
          <label htmlFor="">Mode</label>
          <select
            name="mode"
            id="mode"
            value={values.mode}
            onChange={handleInput}
          >
            <option value="">SELECT MODE</option>
            <option value="surface">SURFACE</option>
          </select>

          <label htmlFor="">Docket No.</label>
          <input
            type="text"
            placeholder="Docket No"
            name="docketNumber"
            id="docketNumber"
            value={values.docketNumber}
            onInput={handleInput}
            onKeyDown={handleChange}
            inputMode="search"
          />
          <label htmlFor="">Destination</label>
          <input
            type="text"
            list="dests"
            placeholder="Destination"
            name="destinationText"
            id="destination"
            value={values.destinationText}
            onInput={handleInput}
          />
          <label htmlFor="">Customer type</label>
          <select
            name="customerType"
            id="customerType"
            value={values.customerType}
            onChange={handleInput}
          >
            <option value="">--SELECT CLIENT TYPE--</option>
            <option value="contractual">CONTRACTUAL CLIENT</option>
            <option value="toPay">ToPay</option>
            <option value="cash">Cash</option>
          </select>

          <label htmlFor="">Booking Date</label>
          <input
            type="date"
            value={getDateForInput(values.bookingDate)}
            name="bookingDate"
            id="bookingDate"
            onInput={handleInput}
          />
          <label htmlFor="">isODA</label>
          <span>
            <input
              type="checkbox"
              name="isOda"
              id="isOda"
              checked={values.isOda}
              onInput={handleInput}
            />
            <input 
            type="text" 
            style={{
              height:"100%",
              padding:"4px 8px",
              marginLeft:"10px",
              width:"100%"
            }}
            name='odaAmount'
            id='odaAmount'
            placeholder='Oda Amount' 
            value={values.odaAmount}
            onInput={handleInput}
            hidden={!values.isOda} />
          </span>
        </div>
      </div>
    </>
  );
}

export function BillingDetails({ handleInput, values,clients }) {
  const { branches } = useContext(UserAuthContext);
  return (
    <>
      <div className={style.formContainer}>
        <p>Billing Details</p>
        <div>
          <label htmlFor="">Client Name</label>
          <input
            type="text"
            placeholder="Client Name"
            id="client"
            name="clientName"
            value={values.clientName}
            onInput={handleInput}
            list='clientList'
          />
          <datalist id='clientList'>
            {
              clients.map(c=><option value={c?.clientCode+" : "+c?.clientName}>{c?.clientCode} : {c?.clientName}</option>)
            }
          </datalist>
          <label htmlFor="">Invoice No</label>
          <input
            type="text"
            placeholder="Invoice No"
            name="invoiceNumber"
            id="invoiceNumber"
            value={values.invoiceNumber}
            onInput={handleInput}
          />
          <label htmlFor="">Invoice Value</label>
          <input
            type="text"
            placeholder="0.00"
            name="invoiceValue"
            id="invoiceValue"
            value={values.invoiceValue}
            onInput={handleInput}
          />

          <label htmlFor="">Billing At</label>
          <select id='billingAt' value={values.billingAt} onChange={handleInput}>
            {branches.map((b) => (
              <option value={b?._id}>
                {b?.branchCode} : {b?.branchName}
              </option>
            ))}
          </select>
          {/* <label htmlFor="">E-way Bill No.</label>
          <input
            type="text"
            placeholder="E-way Bill No"
            name="ewayBillNo"
            id="ewayBillNo"
            value={values.ewayBillNo}
            onInput={handleInput}
          /> */}
          <label htmlFor="">Item Content</label>
          <select
            name="itemContent"
            id="itemContent"
            value={values.itemContent}
            onChange={handleInput}
          >
            <option value="">SELECT TYPE</option>
            <option value="nondoc">NON DOCUMENT</option>
            <option value="doc">DOCUMENT</option>
          </select>

          <label htmlFor="">Booking Type</label>
          <select
            name="bookingType"
            id="bookingType"
            value={values.bookingType}
            onChange={handleInput}
          >
            <option value="credit">CREDIT</option>
            <option value="topay">TOPAY</option>
            <option value="cash">CASH</option>
          </select>
          <label htmlFor="">To Pay/Cash Amt</label>
          <input
            type="text"
            name="amountToPay"
            id="amountTuPay"
            placeholder="To Pay/Cash Amount"
            disabled={values.bookingType == 'credit'}
            value={values.amountToPay}
            onInput={handleInput}
          />
          <label htmlFor="">ODA Charges</label>
          <input
            type="text"
            placeholder="0.00"
            name="odaCharges"
            id="odaCharges"
            value={values.odaCharges}
          />

          <label htmlFor="">COD Type</label>
          <select
            name="codType"
            id="codType"
            value={values.codType}
            onInput={handleInput}
          >
            <option value="noncod">NON COD</option>
            <option value="cod">COD</option>
          </select>
          <label htmlFor="">COD Amount</label>
          <input
            type="text"
            placeholder="COD Amount"
            name="codAmount"
            id="codAmount"
            disabled={values.codType == 'noncod'}
            value={values.codAmount}
            onInput={handleInput}
          />
        </div>
      </div>
    </>
  );
}

export function ConsignorDetails({ handleInput, values }) {
  return (
    <>
      <div className={style.formContainer}>
        <p>
          Consignor Details{' '}
          <span>
            <input type="checkbox" /> Fix
          </span>
        </p>
        <div>
          <label htmlFor="">Consignor</label>
          <input
            type="text"
            placeholder="Consignor"
            name="consignor"
            id="consignor"
            value={values.consignor}
            onInput={handleInput}
          />
          <label htmlFor="">Consignor Contact</label>
          <input
            type="text"
            placeholder="Consignor Contact No"
            name="consignorContact"
            id="consignorContact"
            value={values.consignorContact}
            onInput={handleInput}
          />
          <label htmlFor="">Consignor Address</label>
          <input
            type="text"
            placeholder="Consignor Address"
            name="consignorAddress"
            id="consignorAddress"
            value={values.consignorAddress}
            onInput={handleInput}
          />

          <label htmlFor="">Consignee</label>
          <input
            type="text"
            placeholder="Consignee"
            name="consignee"
            id="consignee"
            value={values.consignee}
            onInput={handleInput}
          />
          <label htmlFor="">Consignee Contact</label>
          <input
            type="text"
            placeholder="Consignee Contact No"
            name="consigneeContact"
            id="consigneeContact"
            value={values.consigneeContact}
            onInput={handleInput}
          />
          <label htmlFor="">Consignee Address</label>
          <input
            type="text"
            placeholder="Consignee Address"
            name="consigneeAddress"
            id="consigneeAddress"
            value={values.consigneeAddress}
            onInput={handleInput}
          />

          <label htmlFor="">Consignor Email</label>
          <input
            type="text"
            placeholder="Consignor Email"
            name="consignorEmail"
            id="consignorEmail"
            value={values.consignorEmail}
            onInput={handleInput}
          />
          <label htmlFor="">Consignee Email</label>
          <input
            type="text"
            placeholder="Consignee Email"
            name="consigneeEmail"
            id="consigneeEmail"
            value={values.consigneeEmail}
            onInput={handleInput}
          />
        </div>
      </div>
    </>
  );
}

export function ConsigneeDetails() {
  return (
    <>
      <div className={style.formContainer}>
        <p>
          Consignee Details{' '}
          <span>
            <input type="checkbox" /> Fix
          </span>
        </p>
        <div>
          <label htmlFor="">Consignee</label>
          <input type="text" placeholder="Consignee" />
          <label htmlFor="">Address</label>
          <input type="text" placeholder="Consignee Address" />
          <label htmlFor="">Address 2</label>
          <input type="text" placeholder="Consignee Address 2" />

          <label htmlFor="">Pin</label>
          <input type="text" placeholder="Consignee Pin" />
          <label htmlFor="">Phone</label>
          <input type="text" placeholder="Consignee Phone" />
          <label htmlFor="">Store</label>
          <input type="text" placeholder="Store" />
        </div>
      </div>
    </>
  );
}

export function InsuranceDetails() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={style.formContainer}>
        <p>
          <input
            type="checkbox"
            onChange={(e) =>
              e.target.checked ? setShow(true) : setShow(false)
            }
          />{' '}
          Insurance Details
        </p>
        {show ? (
          <div>
            <label htmlFor="">Risk of Good At</label>
            <select>
              <option value="">OWNER</option>
              <option value="">CARRIER</option>
            </select>
            <label htmlFor="">Policy Date</label>
            <input type="date" />
            <label htmlFor="">Insurance Value</label>
            <input type="text" placeholder="0.00" />

            <label htmlFor="">Policy No</label>
            <input type="text" placeholder="Policy No" />
            <label htmlFor="">Insurance Comp.</label>
            <input type="text" placeholder="Insurance Company" />
          </div>
        ) : (
          <i style={{ padding: '20px' }}></i>
        )}
      </div>
    </>
  );
}

export function OverallWeight(props) {
  return (
    <>
      <div className={style.formContainer}>
        <p>Overall Weight Details</p>
        <div>
          <label htmlFor="">Total Dimensional Weight</label>
          <input
            type="text"
            placeholder="0.00"
            disabled
            value={props.totalDimWeight}
          />
          <label htmlFor="">Total Actual Weight</label>
          <input
            type="text"
            placeholder="0.00"
            disabled
            value={props.totalActualWeight}
          />
          <label htmlFor="">Total Charge Weight</label>
          <input
            type="text"
            placeholder="0.00"
            disabled
            value={props.totalChargeWeight}
          />
        </div>
        {/* <span>
          <div>
            <label htmlFor="">Description</label>
            <textarea
              cols="50"
              rows="3"
              placeholder="Description"
              style={{ padding: '10px' }}
            ></textarea>
          </div>
        </span> */}
      </div>
    </>
  );
}

export default function AwbUpdate() {
  const initialAwbDetails = {
    branch:'',
    branchText:'',
    docketNumber: '',
    origin: '',
    originText: '',
    mode: 'surface',
    bookingDate: getDateForInput(),
    destination: '',
    destinationText: '',
    customerType: 'contractual',
    isOda: false,
    odaAmount: '',
  };
  const initialBillingDetails = {
    branch: '',
    branchText: '',
    client:'',
    clientName: '',
    invoiceNumber: '',
    invoiceValue: '',
    billingAt: '',
    ewayBillNo: '',
    itemContent: 'nondoc',
    bookingType: 'credit',
    amountToPay: '',
    odaCharges: '',
    codType: 'noncod',
    codAmount: '',
  };
  const initialConsignorConsignee = {
    consignor: '',
    consignorContact: '',
    consignorAddress: '',
    consignorEmail: '',
    consignee: '',
    consigneeContact: '',
    consigneeAddress: '',
    consigneeEmail: '',
  };
  const initialVolWeight = {
    totalBoxes: '',
    actualWeight: '',
    len: 0,
    breadth: 0,
    height: 0,
    pcs: 0,
    divisor: 0,
    dimWeight: 0,
    weights: [],
  };
  const initialDimWeight = {
    totalDimWeight: 0,
    totalActualWeight: 0,
    totalChargeWeight: 0,
  };

  const { currentBranch } = useContext(UserAuthContext);
  const [err, loading, destinations] = useGetData('dest');
  const [err1,loading1, clients] = useGetData('client');
  const [volWeight, setVolWeight] = useState(initialVolWeight);
  const [dimWeight, setDimWeight] = useState(initialDimWeight);
  const [awbDetails, setAwbDetails] = useState(initialAwbDetails);
  const [billingDetails, setBillingDetails] = useState(initialBillingDetails);
  const [consignorConsignee, setConsignorConsignee] = useState(initialConsignorConsignee);
  const [loadingBooking, setLoading] = useState(false);
  const [booking, setBooking] = useState({});

  const {branches, setUser, user} = useContext(UserAuthContext)

  const handleTotalWeight = (val, f) => {
    setDimWeight((p) => {
      const obj = { ...p };
      if (f == 'totalDimWeight+') {
        obj.totalDimWeight = (
          parseFloat(obj.totalDimWeight) + parseFloat(val)
        ).toFixed(2);
        obj.totalChargeWeight =
          parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight)
            ? obj.totalDimWeight
            : obj.totalActualWeight;
        return obj;
      }
      if (f == 'totalDimWeight-') {
        obj.totalDimWeight = (
          parseFloat(obj.totalDimWeight) - parseFloat(val)
        ).toFixed(2);
        console.log(obj.totalDimWeight);
        if (isNaN(obj.totalDimWeight)) {
          obj.totalDimWeight = 0.0;
        }
        obj.totalChargeWeight =
          parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight)
            ? obj.totalDimWeight
            : obj.totalActualWeight;
        console.log(obj.totalChargeWeight);
        return obj;
      }
      obj.totalActualWeight = parseFloat(val).toFixed(2);
      obj.totalChargeWeight =
        parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight)
          ? obj.totalDimWeight
          : obj.totalActualWeight;
      return obj;
    });
  };

  const handleVolWeight = (e, field) => {
    setVolWeight((p) => {
      const obj = { ...p };
      if (field == 'totalBoxes') {
        obj[field] = e.target.value;
        return obj;
      }
      if (field == 'actualWeight') {
        handleTotalWeight(e.target.value);
        obj[field] = e.target.value;
        return obj;
      }
      obj[field] = e.target.value;
      obj.dimWeight = (
        (((parseFloat(obj.len) || 1) *
          (parseFloat(obj.breadth) || 1) *
          (parseFloat(obj.height) || 1)) /
          1728) *
        6 *
        (obj.pcs || 1)
      ).toFixed(2);
      return obj;
    });
  };
  const resetVolWeight = () => {
    setVolWeight((p) => {
      return {
        dimWeight: '',
        len: '',
        breadth: '',
        height: '',
        divisor: '',
        pcs: '',
        weights: [...p.weights],
        ...p,
      };
    });
  };
  const [wid, setWid] = useState(0);
  const handleAddVolWeight = () => {
    if (
      !parseFloat(volWeight.len) ||
      !parseFloat(volWeight.height) ||
      !parseFloat(volWeight.breadth) ||
      !parseFloat(volWeight.pcs)
    ) {
      message.warning('Enter a numeric value');
      return;
    }
    const newObj = {
      id: wid,
      len: volWeight.len,
      breadth: volWeight.breadth,
      height: volWeight.height,
      pcs: volWeight.pcs,
      divisor: volWeight.divisor,
      dimWeight: volWeight.dimWeight,
    };
    setWid((p) => p + 1);
    handleTotalWeight(newObj.dimWeight, 'totalDimWeight+');
    resetVolWeight();
    setVolWeight((p) => {
      return { ...p, weights: [...p.weights, newObj] };
    });
  };

  const deleteWeight = (id) => {
    const oldData = volWeight.weights.filter((w) => w.id == id);
    const newArr = volWeight.weights.filter((w) => w.id != id);
    console.log(newArr);
    setVolWeight((p) => {
      return { ...p, weights: [...newArr] };
    });
    handleTotalWeight(oldData[0].dimWeight, 'totalDimWeight-');
  };

  const fetchBooking = async (docketNumber) => {
    setLoading(true);
    try {
      const res = await fetch(
        serverUrl + 'booking?docketNumber=' + docketNumber,
        { credentials: 'include' },
      );
      const json = await res.json();
      if (res.status == 500) {
        message.error('Internal Server Error Occured');
        return;
      }
      if (res.status == 401) {
        message.error('Session Expired');
        return;
      }
      if (res.status != 200) {
        message.error(json.msg);
        return;
      }
      message.success('Booking Fetched Successfully');
      setBooking({...json.data})
      // setDataInFields()
    } catch (error) {
      message.error('Error Occured: ' + error);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setDataInFields()
  },[booking])

  const setDataInFields=()=>{
    setAwbDetails(()=>{
      const branch =  branches.filter(d=>d?._id==booking?.branch)[0]
      const destination =  destinations.filter(d=>d._id==booking?.shipment?.destination)[0]
      const origin =  destinations.filter(d=>d._id==booking?.shipment?.origin)[0]
      return {
        customerType:booking?.shipment?.customerType,
        branch:branch?._id,
        branchText:branch?branch?.branchCode+" : "+branch?.branchName:"",
        originText:origin?origin?.destCode+" : "+origin?.destName:"",
        destinationText:destination?destination?.destCode+" : "+destination?.destName:"",
        origin:origin?._id,
        destination:destination?._id,
        mode:booking?.shipment?.mode,
        bookingDate:booking?.bookingDate,
        isOda:booking?.shipment?.isOda,
        odaAmount:booking?.shipment?.odaAmount
      }
    })

    setBillingDetails(()=>{
      return {
        client:booking?.client,
        clientName:booking?.invoice?.clientName,
        invoiceValue:booking?.invoice?.invoiceValue||"",
        invoiceNumber:booking?.invoice?.invoiceNumber||"",
        itemContent:booking?.invoice?.itemContent,
        bookingType:booking?.invoice?.bookingType,
        codType:booking?.invoice?.codType,
        codAmount:booking?.invoice?.codAmount||"",
        amountToPay:booking?.invoice?.amountToPay||"",
        billingAt:booking?.invoice?.billingAt,
        odaCharges:booking?.invoice?.odaCharges||""
      }
    })

    setConsignorConsignee(()=>{
      return {
        ...booking.consignorConsignee
      }
    })

    setVolWeight(()=>{
      return {
        totalBoxes:booking?.shipment?.totalBoxes,
        actualWeight:booking?.shipment?.totalActualWeight,
      }
    })
    
    setDimWeight(()=>{
      return {
        totalChargeWeight:booking?.shipment?.totalChargeWeight,
        totalActualWeight:booking?.shipment?.totalActualWeight    
      }
    })
  }

  const handleDocketEnter = (e) => {
    if (e.key == 'Enter') {
      fetchBooking(e.target.value);
    }
  };

  const handleAwb = (e) => {
    setAwbDetails((p) => {
      const obj = { ...p };
      // debugger
      if (e.target.id == 'origin' || e.target.id == 'destination') {
        obj[e.target.name] = e.target.value;
        const dCode = e.target.value.split(' : ')[0];
        const dest = destinations.filter((d) => d.destCode == dCode);
        obj[e.target.id] = dest[0]?._id || '';
      } else if(e.target.type=='checkbox') {
        console.log(e.target.checked)
        console.log(e.target.name)
        console.log(e.target.type)
        obj[e.target.name] = !e.target.checked
      } else {
        obj[e.target.name] = e.target.value;
      }
      console.log(obj);
      return obj;
    });
  };

  const handleInvoice = (e) => {
    setBillingDetails((p) => {
      const obj = { ...p };
      if (e.target.id=="client") {
        const cCode = e.target.value.trim().split(" : ")[0]
        const client = clients.filter(c=>c.clientCode==cCode)[0]
        obj.client = client?._id||""
        obj.clientName = e.target.value
        return obj
      }
      if(e.target.id=="billingAt"){
        obj.billingAt = e.target.value
      }
      obj[e.target.name] = e.target.value;
      return obj;
    });
  };

  const handleConsignorConsignee = (e) => {
    setConsignorConsignee((p) => {
      const obj = { ...p };
      if (e.target.name != e.target.id) {
      }
      obj[e.target.name] = e.target.value;
      return obj;
    });
  };

  const updateBooking= async()=>{
    const updatedBooking = {
      ...booking,
      bookingDate:awbDetails.bookingDate,
      client:billingDetails.client,
      shipment:{
        ...booking.shipment,
        origin:awbDetails.origin,
        destination:awbDetails.destination,
        mode:awbDetails.mode,
        customerType:awbDetails.customerType,
        isOda:awbDetails.isOda,
        totalBoxes:volWeight.totalBoxes,
        actualWeight:volWeight.actualWeight,
        totalActualWeight:dimWeight.totalActualWeight,
        totalChargeWeight:dimWeight.totalChargeWeight,
        odaAmount:awbDetails.odaAmount
      },
      invoice:{
        ...booking.invoice,
        clientName:billingDetails.clientName,
        invoiceNumber:billingDetails.invoiceNumber,
        invoiceValue:billingDetails.invoiceValue,
        billingAt:billingDetails.billingAt,
        itemContent:billingDetails.itemContent,
        bookingType:billingDetails.bookingType,
        amountToPay:billingDetails.amountToPay,
        odaCharges:billingDetails.odaCharges,
        codType:billingDetails.codType,
        codAmount:billingDetails.codAmount,
      },
      consignorConsignee:{
        ...booking.consignorConsignee,
        ...consignorConsignee
      },

    }
    try {
      const res = await fetch(serverUrl+"booking?bid="+booking._id,{
        method:"PATCH",
        credentials:"include",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(updatedBooking)
      })
      const json = await res.json()
      if(res.status==500){
        message.error("Internal Server Error Occured")
        return
      }
      if(res.status==401){
        message.error("Session Expired")
        setUser(null)
        return
      }
      if(res.status!=200){
        message.error(json.msg)
      } else {
        message.success("Booking Updated")
      }
    } catch (error) {
      message.error("Error Occured: "+error)
      console.log(error)
    } 
  }

  const resetForm=()=>{
    setAwbDetails(initialAwbDetails)
    setBillingDetails(initialBillingDetails)
    setConsignorConsignee(initialConsignorConsignee)
    setDimWeight(initialDimWeight)
    setVolWeight(initialVolWeight)
  }
  return (
    <>
      {/* <span className={style.span}>
        <div>
          <input type="radio" name="formType" />
          <label htmlFor="">Domestic</label>
        </div>
        <div>
          <input type="radio" name="formType" />
          <label htmlFor="">Import</label>
        </div>
        <div>
          <input type="radio" name="formType" />
          <label htmlFor="">Export</label>
        </div>
      </span> */}
      <AwbDetails
        destinations={destinations}
        handleInput={handleAwb}
        values={awbDetails}
        handleChange={handleDocketEnter}
      />
      {/* <ForwardingForm/> */}
      <BillingDetails handleInput={handleInvoice} values={billingDetails} clients={clients} branches={branches} />
      <ConsignorDetails
        handleInput={handleConsignorConsignee}
        values={consignorConsignee}
      />
      {/* <InsuranceDetails /> */}
      <VolWeight
        volWeight={volWeight}
        handleVolWeight={handleVolWeight}
        add={handleAddVolWeight}
        reset={resetVolWeight}
        deleteWeight={deleteWeight}
      />
      <OverallWeight {...dimWeight} />
      <div className={style.actions}>
        <button className={style.buttonSave} onClick={updateBooking}>
          <span><FaCheck /></span> <span>Update</span>
        </button>
        <button className={style.buttonRef} onClick={resetForm}>
          <span><MdRefresh style={{fontWeight:"800", fontSize:"20px"}} /></span> <span>Reset</span>
        </button>
      </div>
    </>
  );
}
