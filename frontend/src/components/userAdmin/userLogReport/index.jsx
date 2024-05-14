import { FaCheck, FaSearch } from 'react-icons/fa';
import style from './style.module.css';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { BsFiletypeXls } from 'react-icons/bs';
import { TableTotalFound } from '../../forms/manifestPrint';

export default function UserLogReport() {
  return (
    <>
      <div className={style.formContainer}>
        <p>User Log Report</p>
        <div>
          <label htmlFor="">Search Text</label>
          <input type="text" placeholder="Search Text" />
          <label htmlFor="">User</label>
          <input type="text" placeholder="User" />

          <label htmlFor="">Log Type</label>
          <select>
            <option value="null">--Select Log Type--</option>
          </select>
          <label htmlFor="">Log From Date</label>
          <input type="date" />
          <label htmlFor="">Log To Date</label>
          <input type="date" />

          <label htmlFor="">Awb No</label>
          <input type="text" placeholder="Awb No" />
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.buttonChk}>
          <FaSearch /> Search
        </button>
        <button className={style.buttonExp}>
          <BsFiletypeXls /> Export
        </button>
        <button className={style.buttonRef}>
          <FaArrowRotateLeft /> Reset
        </button>
      </div>

      <TableTotalFound />
    </>
  );
}
