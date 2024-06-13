import { FaCheck, FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa';
import style from './style.module.css';
import { BsFiletypeXls } from 'react-icons/bs';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { useGetData } from '../../../apiHandlers/getApis';
import { usePostData } from '../../../apiHandlers/postApis';
import { TableComp } from '../../minComp';
import { usePatchData } from '../../../apiHandlers/patchApis';
import UserAuthContext from '../../../contexts/authContext';
import { getFormttedDate } from '../../../utils/helpers';
import { Popconfirm } from 'antd';
import Loading from '../../../pages/loading';
import { useDeleteData } from '../../../apiHandlers/deleteApis';
import { message } from 'antd';

const TableRow = (props) => {
  const btnStyle = {
    fontSize: '20px',
    color: 'blueviolet',
  };
  if (props.editKey == props.data?._id) {
    btnStyle.color = 'green';
  }
  return (
    <tr>
      <td>
        <FaEdit style={btnStyle} onClick={(e) => props.edit(props.data)} />
      </td>
      <td>
        <Popconfirm
          title="Sure to delete"
          onConfirm={() => props.remove(props.data._id)}
        >
          <FaTrashAlt style={{ color: 'red', fontSize: '20px' }} />
        </Popconfirm>
      </td>
      <td>{props?.data?.destCode}</td>
      <td>{props?.data?.destName}</td>
      <td>{props?.data?.state?.stateName}</td>
      <td>{props?.data?.country}</td>
      <td>{props?.data?.zone?.zoneName}</td>
      <td>{props?.data?.destBranch?.branchName}</td>
      <td>{props?.data?.isActive ? 'YES' : 'NO'}</td>
      <td>{props?.data?.createdBy?.name}</td>
      <td>{getFormttedDate(props?.data?.createdAt)}</td>
      <td>{getFormttedDate(props?.data?.updatedAt)}</td>
    </tr>
  );
};

export default function DestinationMaster() {
  const initialDestination = {
    destCode: '',
    destName: '',
    destBranch: '',
    country: '',
    state: '',
    zone: '',
    isActive: false,
  };

  const { branches, user } = useContext(UserAuthContext);
  const [destination, setDestination] = useState(initialDestination);
  const [err, loading, dests, setDests] = useGetData('dest');
  const [err1, loading1, zones] = useGetData('zone');
  const [err2, loading2, states] = useGetData('state');
  const [editKey, setEditKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDest = (e, f) => {
    setDestination((p) => {
      const obj = { ...p };
      if (f == 'isActive') {
        obj.isActive = e.target.checked;
        return obj;
      } else {
        obj[f] = e.target.value;
        return obj;
      }
    });
  };

  const resetForm = () => {
    setDestination(initialDestination);
    setEditKey('');
  };

  const edit = (data) => {
    console.log(data);
    setDestination((p) => {
      return {
        destCode: data.destCode,
        country: data.country,
        state: data.state._id,
        zone: data.zone._id,
        destName: data.destName,
        destBranch: data.destBranch._id,
        isActive: data.isActive,
      };
    });
    setEditKey(data._id);
  };

  const remove = async (destId) => {
    try {
      setIsSubmitting(true);
      const res = await useDeleteData('dest?destId=' + destId);
      if (!res.res) {
        message.error(res?.err || res?.msg);
        setIsSubmitting(false);
        return;
      }
      setDests((p) => {
        const newDest = p.filter((d) => d._id != destId);
        return [...newDest];
      });
      message.success(res.msg);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  const saveDest = async () => {
    setIsSubmitting(true);
    const res = await usePostData(destination, 'dest');
    if (!res.res) {
      setIsSubmitting(false);
      return;
    }
    setDests((p) => {
      const preArr = p.sort((a, b) => a - b);
      return [...preArr, res.data];
    });
    resetForm();
    setIsSubmitting(false);
  };

  const handleEdit = async () => {
    const res = await usePatchData(destination, 'dest?did=' + editKey);
    if (!res.res) return;
    const idx = dests.findIndex((d) => d._id == editKey);
    dests[idx] = { ...res.data };
    setDests((p) => [...dests]);
    setEditKey('');
    resetForm();
  };

  const [searchResults, setSearchResults] = useState([]);
  const searchDest = (e) => {
    console.log(e.target.value)
    const timer = setTimeout(() => {
      const arr = dests.filter((d) => {
        return d.destName.toLowerCase().includes(e.target.value.toLowerCase())
    });
      setSearchResults((p) => [...arr]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  const exportDest = () => {};

  return (
    <>
      {loading || loading1 || loading2 || isSubmitting ? <Loading /> : null}
      <div className={style.formContainer}>
        <p>Destination Master</p>
        <div>
          <label htmlFor="">Country Name</label>
          <select
            value={destination.country}
            onChange={(e) => handleDest(e, 'country')}
          >
            <option value="">--Please Select Country Name--</option>
            <option value="INDIA">INDIA</option>
          </select>
          <label htmlFor="">Destination Code</label>
          <input
            type="text"
            value={destination.destCode}
            onInput={(e) => handleDest(e, 'destCode')}
            placeholder="Destination Code"
          />

          <label htmlFor="">State Name</label>
          <select
            value={destination.state || destination.state._id}
            onChange={(e) => handleDest(e, 'state')}
          >
            <option value="">--Please Select State Name</option>
            {states.map((s) => (
              <option value={s._id} key={s._id}>
                {s.stateName}
              </option>
            ))}
          </select>
          <label htmlFor="">Destination Name</label>
          <input
            type="text"
            value={destination.destName}
            onInput={(e) => handleDest(e, 'destName')}
            placeholder="Destination Name"
          />

          <label htmlFor="">Zone Name</label>
          <select
            value={destination.zone || destination.zone._id}
            onChange={(e) => handleDest(e, 'zone')}
          >
            <option value="">--Please Select Zone Name--</option>
            {zones.map((z) => (
              <option value={z._id} key={z._id}>
                {z.zoneName}
              </option>
            ))}
          </select>
          <label htmlFor="">Destination Branch</label>
          <select
            value={destination.destBranch || destination.destBranch._idz}
            onInput={(e) => handleDest(e, 'destBranch')}
          >
            <option value="">--Please Select Branch Name--</option>
            {branches.map((b) => (
              <option value={b._id} key={b._id}>
                {b.branchCode} : {b.branchName}
              </option>
            ))}
          </select>

          <label htmlFor="">Active</label>
          <p>
            <input
              checked={destination.isActive}
              onChange={(e) => handleDest(e, 'isActive')}
              type="checkbox"
            />
          </p>
        </div>
      </div>

      <div className={style.actions}>
        <button
          className={style.buttonChk}
          onClick={editKey == '' ? saveDest : handleEdit}
        >
          <FaCheck /> {editKey == '' ? 'Save' : 'Update'}
        </button>
        <button className={style.buttonExp}>
          <BsFiletypeXls /> Export
        </button>
        <button className={style.buttonRef} onClick={resetForm}>
          <FaArrowRotateLeft /> Reset
        </button>
      </div>

      <TableComp>
        <p>
          Destinations:
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <label
              style={{
                fontSize: '16px',
              }}
              htmlFor=""
            >
              Search
            </label>
            <input
              type="text"
              onInput={searchDest}
              style={{
                padding: '2px 8px',
              }}
              placeholder='Destination Name'
            />
          </span>
        </p>
        <div>
          <table style={{ minWidth: '100%' }}>
            <thead>
              <tr>
                <th>Edit</th>
                <th>Delete</th>
                <th>Destination Code</th>
                <th>Destination Name</th>
                <th>State Name</th>
                <th>Country Name</th>
                <th>Zone</th>
                <th>Destination Branch</th>
                <th>Active</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Modified Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length>0 ? (
                searchResults.map((d) => (
                  <TableRow
                    data={d}
                    edit={edit}
                    remove={remove}
                    editKey={editKey}
                    key={d._id}
                  />
                ))
              ) :  dests.length > 0 ? (
                dests.map((d) => (
                  <TableRow
                    data={d}
                    edit={edit}
                    remove={remove}
                    editKey={editKey}
                    key={d._id}
                  />
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan={11}>
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TableComp>
    </>
  );
}
