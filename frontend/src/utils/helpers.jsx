export function exportExcel(data){  
    console.log("this function will export data from "+data)
}

export function getFormttedDate(date){
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString('default', { month: 'short' });
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
}