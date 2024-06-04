import { FaTrashAlt } from 'react-icons/fa';

export const Mandatory = () => {
  return <span style={{ color: 'red' }}>*</span>;
};

const docketStyle = {
  width: '95%',
  boxShadow: '0px 0px 4px grey',
  display: 'grid',
  padding: '5px',
  textAlign: 'left',
  gridTemplateColumns: 'repeat(4,1fr) 80px 80px 25px',
};

export const Docket = (props) => {
  return (
    <div style={docketStyle}>
      <p>{props?.docketNumber}</p>
      <p>{props?.itemContent}</p>
      <p>{props?.consignor}</p>
      <p>{props?.consignee}</p>
      <p>{props?.destination}</p>
      <p>{props?.pieces}</p>
      <p>{props?.weight}</p>
      <FaTrashAlt
        style={{ color: 'red' }}
        onClick={(e) => props?.deleteDocket(props?.docketNumber)}
      />
    </div>
  );
};

import tableStyle from './tableStyle.module.css';
import React from 'react';
import Loading from '../../pages/loading';
import { BsFiletypeXlsx } from 'react-icons/bs';
export const TableComp = (props) => {
  return <div className={tableStyle.tableContainer}>{props.children}</div>;
};

export function LazyComp(props) {
  return (
    <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
  );
}

export function ExportBtn({ onClick }) {
  return (
    <button
      style={{
        padding: '5px 8px',
        border: 'none',
        borderRadius: 0,
        color: 'white',
        margin: '0px 5px',
        backgroundColor: 'grey',
      }}
      onClick={onClick}
    >
      <BsFiletypeXlsx /> Export
    </button>
  );
}
