let primaryIncomeTypes = JSON.parse(localStorage.getItem('primaryIncomeTypes')) || [
    {id: 1, name: "Lương"},
    {id: 2, name: "Thưởng"},
    {id: 3, name: "Đầu tư"},
    {id: 4, name: "Kinh doanh"},
    {id: 5, name: "Cho thuê"},
];


let nextPrimaryIncomeTypesId = 6; // Biến nextId sẽ giữ giá trị tiếp theo của id

function addPrimaryIncomeType(newName) {
    var newIncomeType = {
        id: nextPrimaryIncomeTypesId++,  // Gán Id hiện tại và sau đó tăng nextId
        name: newName, // Gán tên loại thu nhập
    };
    primaryIncomeTypes.push(newIncomeType); // Thêm đối tượng vào mảng
    localStorage.setItem('primaryIncomeTypes', JSON.stringify(primaryIncomeTypes));
}




