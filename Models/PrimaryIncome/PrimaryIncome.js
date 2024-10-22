
let primaryIncomeTypes = JSON.parse(localStorage.getItem('primaryIncomeTypes')) || [
    {id: 1, name: "Lương"},
    {id: 2, name: "Thưởng"},
    {id: 3, name: "Đầu tư"},
    {id: 4, name: "Kinh doanh"},
    {id: 5, name: "Cho thuê"},
];

let primaryIncome = JSON.parse(localStorage.getItem('primaryIncome')) ||[];
let nextPrimaryIncomeId = 1;
function addPrimaryIncome(newName, newPrimaryIncomeType,newMainIncome,newDescription,newPaymentDate,newPaymentTime) {
    var newIncomeType = {
        id: nextPrimaryIncomeId++,  // Gán Id hiện tại và sau đó tăng nextId
        name: newName, // Gán tên loại thu nhập
        primaryIncomeType: newPrimaryIncomeType,
        mainIncome: newMainIncome,
        description: newDescription,
        paymentDate: newPaymentDate,
        paymentTime: newPaymentTime,
    };
    primaryIncome.push(newIncomeType); // Thêm đối tượng vào mảng
    localStorage.setItem('primaryIncome', JSON.stringify(primaryIncome));
}
function searchPrimaryIncomeByName(searchTerm) {
    
    // Chuyển từ khóa tìm kiếm sang chữ thường để so sánh không phân biệt hoa thường
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Sử dụng filter để tìm kiếm các phần tử có tên chứa từ khóa tìm kiếm
    return primaryIncome.filter(item =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
}
function seachPrimaryIncomeByDescription(searchTerm){
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Sử dụng filter để tìm kiếm các phần tử có tên chứa từ khóa tìm kiếm
    return primaryIncome.filter(item =>
        item.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
}
