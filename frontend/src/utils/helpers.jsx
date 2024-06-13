export function exportExcel(data) {
    
}

export function getFormttedDate(date) {
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.toLocaleString('default', { month: 'short' });
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
}

export function getDateForInput(date){
    const now = date?new Date(date):new Date()
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const newDate = now.getFullYear() + "-" + (month) + "-" + (day);
    return newDate
}

export function get30DaysBeforeDate(){
    const date = new Date(new Date().setDate(new Date().getDate() - 30))
    console.log("purani date",date)
    return date
}