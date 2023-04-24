exports.formatDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear(); // lấy năm
    const month = String(date.getMonth() + 1).padStart(2, '0'); // lấy tháng và chèn số 0 vào đầu nếu tháng có 1 chữ số
    const day = String(date.getDate()).padStart(2, '0'); // lấy ngày và chèn số 0 vào đầu nếu ngày có 1 chữ số
    const formattedDate = `${year}-${month}-${day}`; // ghép các giá trị lại với nhau
    return formattedDate;
}