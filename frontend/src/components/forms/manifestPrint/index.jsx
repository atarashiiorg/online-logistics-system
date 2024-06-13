import { BsCheck, BsFiletypeXls } from 'react-icons/bs';
import style from './style.module.css';
import { CgCheck, CgExport } from 'react-icons/cg';
import { FaCheck, FaPrint } from 'react-icons/fa6';
import { IoRefresh } from 'react-icons/io5';
import { TableComp } from '../../minComp';
import { useGetData } from '../../../apiHandlers/getApis';
import { serverUrl } from '../../../constants';
import { useDownloader } from '../../../apiHandlers/getApis';
import Loading from '../../../pages/loading';
import { useContext, useEffect, useState } from 'react';
import UserAuthContext from '../../../contexts/authContext';
import { message } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { get30DaysBeforeDate, getDateForInput } from '../../../utils/helpers';
import { ExportToExcel } from '../../../utils/exportExcel';

export function TableTotalFound(props) {
  return (
    <>
      <div className={style.formContainer}>
        <p>Total Records Found: {}</p>
        <div>{props.children}</div>
      </div>
    </>
  );
}

const TableRow = (m) => {
  const { setUser } = useContext(UserAuthContext);
  return (
    <tr>
      <td>
        <FaPrint
          style={{ color: 'blueviolet' }}
          onClick={async (e) => {
            m.setIsDownloading(true);
            try {
              const response = await useDownloader('manifest?mid=' + m._id);
              if (response?.status == 401) {
                message.error('Session Expired');
                setUser(null);
                sessionStorage.clear();
                console.log(response.msg);
                return;
              }
              if (response.status != 200) {
                message.error(response.msg);
                console.log(response.msg);
              } else {
                message.success('Downloaded');
              }
            } catch (err) {
              console.log(err);
              message.error('Error occured: ', err.toString());
            } finally {
              m.setIsDownloading(false);
            }
          }}
        />
      </td>
      <td>{m.manifestNumber}</td>
      <td>{new Date(m.manifestDate).toDateString()}</td>
      <td>
        {m?.fromBCode?.branchCode} : {m?.fromBCode?.branchName}
      </td>
      <td>
        {m?.toBCode?.branchCode} : {m?.toBCode?.branchName}
      </td>
      <td>{m?.dockets?.length}</td>
      <td>{m?.isReceived ? 'YES' : 'NO'}</td>
    </tr>
  );
};

export default function ManifestPrint() {
  const { currBranch, branches } = useContext(UserAuthContext);
  const initFilter = {
    fromDate: getDateForInput(get30DaysBeforeDate()),
    toDate: getDateForInput(),
    toBCode: '',
    toBCodeTxt: '',
    manifestNumber: null,
  };
  const [filters, setFilters] = useState(initFilter);
  const [search, setSearch] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manifests, setManifests] = useState([]);

  const [excelData, setExcelData] = useState([])

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(serverUrl + 'manifest?' + query, {
        credentials: 'include',
      });
      const json = await res.json();
      console.log(json);
      if (res.status == 500) {
        message.error('Internal Server Error: ' + json.err);
      } else if (res.status != 200) {
        message.error('Error Occured: ' + json.msg);
      } else {
        if (json.data.length > 0) message.success('Manifests Loaded');
        else message.warning('Manifests Not Found');
        setManifests((p) => [...json.data]);
        const data = json.data.map((m,i)=>{
            return {
                sno:i+1,
                manifestNumber:m?.manifestNumber,
                manifestDate:m?.manifestDate,
                fromBranch:m?.fromBCode?.branchCode+" : "+m?.fromBCode?.branchName,
                toBranch:m?.toBCode?.branchCode+" : "+m?.toBCode?.branchName,
                totalDocket:m?.dockets?.length,
                received:m?.isReceived?"YES":"NO"
            }
        })
        setExcelData(p=>[...data])
      }
    } catch (error) {
      message.error('Error Occured : ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let query = '';
    if (currBranch) {
      query += `fBCode=${currBranch?._id}&`;
    }
    if (filters.fromDate) {
      query += `fromDate=${filters?.fromDate}&`;
    }
    if (filters.toDate) {
      query += `toDate=${filters?.toDate}&`;
    }
    if (filters.toBCode) {
      query += `toBCode=${filters?.toBCode}&`;
    }
    if (filters.manifestNumber) {
      query += `manifestNumber=${filters?.manifestNumber}`;
    }
    // query = query.substring(0, query.length - 1);
    fetchData(query);
    console.log(excelData)
  }, [currBranch, search]);

  const handleFilter = (e) => {
    setFilters((p) => {
      const obj = { ...p };
      if (e.target.type == 'date') {
        obj[e.target.name] = e.target.value;
      } else if (e.target.id != e.target.name) {
        obj[e.target.id] = e.target.value;
        const bCode = e.target.value.split(' : ')[0] || '';
        const idx = branches.findIndex((b) => b?.branchCode == bCode);
        obj[e.target.name] = branches[idx]?._id || '';
      } else {
        obj[e.target.name] = e.target.value;
      }
      return obj;
    });
  };

  const resetForm = () => {
    setFilters(initFilter);
  };
  return (
    <>
      {loading ? <Loading /> : null}
      {isDownloading ? <Loading /> : null}
      <div className={style.formContainer}>
        <p>Manifest Print</p>
        <div>
          <label htmlFor="">Manifest Date From</label>
          <input
            type="date"
            name="fromDate"
            value={getDateForInput(filters.fromDate)}
            onInput={handleFilter}
          />
          <label htmlFor="">To</label>
          <input
            type="date"
            name="toDate"
            value={getDateForInput(filters.toDate)}
            onInput={handleFilter}
          />

          <label htmlFor="">To Branch</label>
          <input
            type="text"
            placeholder="To Branch"
            list="branches"
            name="toBCode"
            id="toBCodeTxt"
            value={filters.toBCodeTxt}
            onInput={handleFilter}
          />
          <label htmlFor="">Manifest No</label>
          <input
            type="text"
            placeholder="Manifest No"
            id="manifestNumber"
            name="manifestNumber"
            value={filters.manifestNumber || ''}
            onInput={handleFilter}
          />

          <datalist id="branches">
            {branches.map((b) => (
              <option value={b?.branchCode + ' : ' + b?.branchName}>
                {b?.branchCode} : {b?.branchName}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div className={style.actions}>
        <button
          className={style.buttonChk}
          onClick={(e) => setSearch((p) => !p)}
        >
          <FaCheck /> Search
        </button>
       <ExportToExcel apiData={excelData} fileName={"Manifests"} />
        <button className={style.buttonRef} onClick={resetForm}>
          <IoRefresh /> Reset
        </button>
      </div>

      <TableComp>
        <p>Manifests:</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Print</th>
                <th>Manifest No.</th>
                <th>Manifest Date</th>
                <th>From BCode</th>
                <th>To BCode</th>
                <th>Total Docket</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {manifests.length > 0 ? (
                manifests.map((m) => (
                  <TableRow {...m} setIsDownloading={setIsDownloading} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center' }}>
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
