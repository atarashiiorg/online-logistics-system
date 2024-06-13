import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ExportBtn } from '../components/minComp';
import { message } from 'antd';

export const ExportToExcel = ({apiData, fileName}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    if(apiData.length<=0){
      message.error("No data found. Can not Export to Excel.")
      return
    }
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <ExportBtn onClick={(e) => exportToCSV(apiData, fileName)}/> 
  );
};