import { GiCheckMark, GiCycle, GiTick } from 'react-icons/gi';
import style from './style.module.css';
import { BsRecycle, BsSearch } from 'react-icons/bs';
import {
  IoCheckmark,
  IoRefresh,
  IoRefreshCircle,
  IoRefreshCircleOutline,
  IoRefreshSharp,
} from 'react-icons/io5';
import { IoIosRefresh } from 'react-icons/io';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { Docket, Mandatory, TableComp } from '../../minComp/index';
import UserAuthContext from '../../../contexts/authContext';
import {
  useFetchDocketForManifest,
  useGetData,
} from '../../../apiHandlers/getApis';
import { usePostData } from '../../../apiHandlers/postApis';
import { message } from 'antd';
import Loading from '../../../pages/loading';
import { getDateForInput } from '../../../utils/helpers';

export function ManifestForm({
  manifest,
  manifestHandler,
  handleUpdate,
  update,
  currBranch,
  branches,
  vendors,
}) {
  const { user } = useContext(UserAuthContext);
  return (
    <>
      <div className={style.formContainer}>
        <p>
          Manifest Direct{' '}
          <span>
            <input type="checkbox" onChange={handleUpdate} /> Update
          </span>
        </p>
        <div>
          <label htmlFor="">
            To BCode <Mandatory />
          </label>
          <input
            list="list1"
            type="text"
            value={manifest.toBCodeText}
            placeholder="To BCode"
            onInput={(e) => manifestHandler(e, 'toBCode')}
          />
          <datalist id="list1">
            {branches.map((b) => (
              <option key={b._id} value={b.branchCode + ' : ' + b.branchName}>
                {b.branchCode} : {b.branchName}
              </option>
            ))}
          </datalist>
          <label htmlFor="">System Manifest No.</label>
          <input
            type="text"
            disabled={!update}
            placeholder="SYSTEM GENERATED"
            value={manifest.manifestNumber}
            onInput={(e) => manifestHandler(e, 'manifestNumber')}
          />

          <label htmlFor="">
            Manifest Date <Mandatory />
          </label>
          <input
            type="date"
            value={getDateForInput(manifest.manifestDate)}
            onInput={(e) => manifestHandler(e, 'date')}
            disabled={user.role != 'adm'}
          />
          {/* <div>
                        <input type="date" />
                        <input type="time" />
                    </div> */}
          <label htmlFor="">
            Mode <Mandatory />
          </label>
          <select
            value={manifest.mode}
            onChange={(e) => manifestHandler(e, 'mode')}
          >
            <option value="">--Select Service Type--</option>
            <option value="surface">SURFACE</option>
          </select>

          <label htmlFor="">
            From BCode <Mandatory />
          </label>
          <input
            type="text"
            disabled
            value={
              currBranch
                ? currBranch?.branchCode + ':' + currBranch?.branchName
                : 'Please select Current Branch'
            }
          />
          <label htmlFor="">
            Vendor Name <Mandatory />
          </label>
          <input
            type="text"
            list="vendors"
            placeholder="Vendor Name"
            value={manifest.vName}
            onInput={(e) => manifestHandler(e, 'vendor')}
          />
          <datalist id="vendors">
            {vendors.map((v) => (
              <option key={v._id} value={v.vendorCode + ' : ' + v.ownerName}>
                {v.ownerName}
              </option>
            ))}
          </datalist>
        </div>
      </div>
    </>
  );
}

export function AwbForm({
  docket,
  reset,
  setDocket,
  addDocket,
  deleteDocket,
  docketList,
}) {
  const docketListStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    maxHeight: '150px',
    overflow: 'auto',
    marginInline: 'auto',
    marginBottom: '20px',
    border: '1px solid',
  };

  const [currDocket, setCurrDocket] = useState('');
  const { currBranch } = useContext(UserAuthContext);

  const setVal = async (e) => {
    if (e.keyCode == 13) {
      if (!currBranch) {
        message.warning('Please select From BCode');
        return;
      }

      if (currDocket.length < 3) {
        message.warning('Enter a valid docket Number');
        return;
      }

      const data = await useFetchDocketForManifest(currDocket, currBranch?._id);
      if (data.res) {
        setDocket(data.data);
      } else {
        message.error(data?.err);
      }
      return;
    } else if (e.keyCode == 8 || e.keyCode == 46) {
      reset();
      return;
    }
  };

  return (
    <>
      <div className={style.formContainer}>
        <p>AWB Details</p>
        <div className={style.secondContainer}>
          <div>
            <label htmlFor="">Docket No</label>
            <input
              type="text"
              placeholder="Docket No"
              inputMode="search"
              value={currDocket}
              onKeyUp={setVal}
              onInput={(e) => setCurrDocket(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Item Content</label>
            <input
              type="text"
              placeholder="Item Content"
              value={docket.itemContent}
              name=""
              id=""
            />
          </div>
          <div>
            <label htmlFor="">Consignor</label>
            <input
              type="text"
              value={docket.consignor}
              placeholder="Consignor"
            />
          </div>
          <div>
            <label htmlFor="">Consignee</label>
            <input
              type="text"
              value={docket.consignee}
              placeholder="Consignee"
            />
          </div>
          <div>
            <label htmlFor="">Destination</label>
            <input
              type="text"
              value={docket.destination}
              placeholder="Destination"
            />
          </div>
          <div>
            <label htmlFor="">Pcs</label>
            <input type="text" value={docket.pieces} placeholder="Pcs" />
          </div>
          <div>
            <label htmlFor="">Actual Weight</label>
            <input type="text" value={docket.weight} placeholder="0.00" />
          </div>
          <span>
            <button className={style.buttonChk} onClick={(e) => addDocket()}>
              <FaCheck />
            </button>
            <button className={style.buttonRef} onClick={(e) => reset()}>
              <GiCycle />
            </button>
          </span>
        </div>
      </div>

      {docketList.length > 0 ? (
        <TableComp style={{ display: 'flex' }}>
          <div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Docket Number</th>
                  <th>Item Content</th>
                  <th>Consignor</th>
                  <th>Consignee</th>
                  <th>Destination</th>
                  <th>Pcs</th>
                  <th>Weight</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {docketList.map((d) => {
                  return (
                    <tr>
                      <td>{d.docketNumber}</td>
                      <td>{d?.itemContent}</td>
                      <td>{d.consignor}</td>
                      <td>{d.consignee}</td>
                      <td>{d.destination}</td>
                      <td>{d.pieces}</td>
                      <td>{d.weight}</td>
                      <td>
                        <FaTrashAlt
                          style={{ color: 'red' }}
                          onClick={(e) => deleteDocket(d.docketNumber)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TableComp>
      ) : null}
    </>
  );
}

export function SearchManifest() {
  return (
    <>
      <div className={style.searchBar}>
        <select>
          <option value="awbno">Awb No</option>
          <option value="manifestno">Manifest No</option>
          <option value="manulamanifestno">Manual Manifest No</option>
        </select>
        <select>
          <option value="contains">Contains</option>
          <option value="startwith">Start With</option>
        </select>
        <input type="text" placeholder="Search" />
        <button>
          <BsSearch />
        </button>
      </div>
    </>
  );
}

export default function ManifestDirect() {
  const [update, setUpdate] = useState(false);
  const { currBranch, branches } = useContext(UserAuthContext);
  const [err, loading, vendors] = useGetData('vendor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialManifest = {
    toBCode: '',
    toBCodeText: '',
    manifestNumber: '',
    manifestDate: getDateForInput(),
    mode: '',
    fromBCode: currBranch?._id,
    vendor: '',
    vName: '',
    dockets: [],
  };

  const initialDocket = {
    _id: '',
    docketNumber: '',
    date: '',
    origin: '',
    consignor: '',
    destination: '',
    consignee: '',
    itemContent: '',
    pieces: 0,
    weight: 0,
    toPay: 0,
    cod: 0,
  };

  const [docket, setDocket] = useState(initialDocket);
  const [manifest, setManifest] = useState(initialManifest);

  const manifestHandler = (e, f) => {
    setManifest((p) => {
      const obj = { ...p };
      if (f == 'vendor') {
        const vCode = e.target.value.split(' : ')[0];
        const idx = vendors.findIndex((v) => v.vendorCode == vCode);
        obj.vendor = vendors[idx]?._id;
        obj.vName = e.target.value;
        return obj;
      }
      if (f == 'date') {
        obj.manifestDate = e.target.value;
        return obj;
      }
      if (f == 'toBCode') {
        const bCode = e.target.value.split(' : ')[0];
        const idx = branches.findIndex((b) => {
          return b.branchCode == bCode;
        });
        obj.toBCode = branches[idx]?._id;
        obj.toBCodeText = e.target.value;
        return obj;
      }
      obj[f] = e.target.value;
      return obj;
    });
  }; //for updating manifest form fields values

  const addDocket = () => {
    if (!docket._id) {
      message.warning('Enter a valid docket number');
      return;
    }
    //validation
    try {
      const idx = manifest.dockets?.findIndex(
        (d) => d?.docketNumber == docket?.docketNumber,
      );
      if (idx > -1) {
        message.warning('Docket already added.');
        return;
      }
    } catch (error) {
      message.error('Somthing went wrong');
    }

    setManifest((p) => {
      const dockets = [...p.dockets];
      dockets.push({ ...docket, booking: docket._id });
      return { ...p, dockets };
    });
    setDocket(initialDocket);
  }; // for adding a docket entry into the manifest

  const deleteDocket = (id) => {
    setManifest((p) => {
      const dockets = [...p.dockets];
      const newData = dockets.filter((d) => d.docketNumber != id);
      return { ...p, dockets: newData };
    });
  }; // for deleting a docket entry from manifest

  const handleUpdate = (e) => {
    e.target.checked ? setUpdate(true) : setUpdate(false);
  }; // for indicating that manifest is being update

  const manifestProps = {
    manifest,
    manifestHandler,
    handleUpdate,
    update,
    currBranch,
    branches,
    vendors,
  }; //props for manifest form

  const awbProps = {
    docket,
    setDocket,
    addDocket,
    deleteDocket,
    reset: () => {
      setDocket(initialDocket);
    },
    docketList: manifest.dockets,
  }; //props for awbform

  const resetForm = () => {
    setManifest((p) => initialManifest);
    setDocket(initialDocket);
  };

  const handleSave = async () => {
    if (!currBranch) {
      message.warning('Please select current branch');
      return;
    }
    if (manifest.toBCode == '') {
      message.warning('Please select ToBCode.');
      return;
    }
    if (manifest.fromBCode == '') {
      message.warning('Please select FromBCode.');
      return;
    }
    if (manifest.manifestDate == '') {
      message.warning('Please select manifest date');
      return;
    }
    if (manifest.vendor == '') {
      message.warning('Please select vendor');
      return;
    }
    if (manifest.mode == '') {
      message.warning('Please select mode');
      return;
    }
    if (manifest.toBCode == currBranch?._id) {
      message.warning('FromBCode and ToBCode can not be same');
      return;
    }
    setIsSubmitting(true);
    const res = await usePostData(
      { ...manifest, fromBCode: currBranch?._id },
      'manifest',
    );
    if (res.res) {
      resetForm();
    }
    setIsSubmitting(false);
  }; // api call for saving manifest data on the server

  useEffect(() => {
    setManifest((p) => {
      return { ...p, dockets: [] };
    });
    setDocket(initialDocket);
  }, [currBranch]);

  return (
    <>
      {loading || isSubmitting ? <Loading /> : null}
      <ManifestForm {...manifestProps} />
      <AwbForm {...awbProps} />
      <div className={style.actions}>
        <button onClick={resetForm}>
          <IoIosRefresh /> Reset
        </button>
        <button onClick={handleSave}>
          <IoCheckmark /> Save
        </button>
      </div>
      {/* <SearchManifest /> */}
    </>
  );
}
