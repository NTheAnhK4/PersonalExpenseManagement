
let fixedExpensesTypes = JSON.parse(localStorage.getItem('fixedExpenses')) || [
    { id: 1, name: "Tiền ăn" },
    { id: 2, name: "Tiền xăng xe" },
    { id: 3, name: "Tiền học" },
    { id: 4, name: "Tiền mua quần áo" },
    { id: 5, name: "Tiền đi chơi" },
];

let fixedExpenses = JSON.parse(localStorage.getItem('fixedExpenses')) || [];
let nextFixedExpensesId = 1;
function addFixedExpenses(newName, newFixedExpensesType, newMainIncome, newDescription, newPaymentDate, newPaymentTime) {
    var newIncomeType = {
        id: nextFixedExpensesId++,  // Gán Id hiện tại và sau đó tăng nextId
        name: newName, // Gán tên loại thu nhập
        fixedExpensesType: newFixedExpensesType,
        mainIncome: newMainIncome,
        description: newDescription,
        paymentDate: newPaymentDate,
        paymentTime: newPaymentTime,
    };
    fixedExpenses.push(newIncomeType); // Thêm đối tượng vào mảng
    localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses));
}
var fixedExpensesModal = document.getElementById("AddFixedExpenses");
var fixedExpensesBtn = document.getElementById("addBtn");


var fixedExpensesSpan = document.getElementsByClassName("close")[0];


fixedExpensesBtn.onclick = function () {

    fixedExpensesModal.style.display = "block";
}
fixedExpensesSpan.onclick = function () {
    fixedExpensesModal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == fixedExpensesModal) {
        fixedExpensesModal.style.display = "none";
    }
}
function saveFixedExpenses() {
    var name = document.getElementById("name").value;
    var amount = document.getElementById("amount").value;
    var date = document.getElementById("date").value;
    var incomeType = document.getElementById("incomeType").value;
    var description = document.getElementById("description").value;
    var time = document.getElementById("time").value;

    // Kiểm tra nếu tên thu nhập trống thì không làm gì
    if (!name) {
        alert("Vui lòng nhập tên thu nhập");
        return;
    }
    if (!amount) {
        alert("Vui lòng nhập số tiền");
        return;
    }
    var numericAmount = Number(amount);


    if (isNaN(numericAmount) || !Number.isFinite(numericAmount)) {
        alert("số tiền không hợp lệ");
        return;
    }
    if (!date) {
        alert("Vui lòng chọn ngày");
        return;
    }
    if (!incomeType) {
        alert("Vui lòng chọn loại thu nhập");
        return;
    }
    if (!description) {
        alert("Vui lòng nhập mô tả");
        return;
    }
    if (!time) {
        alert("Vui lòng nhập thời gian");
        return;
    }
    addFixedExpenses(name, incomeType, amount, description, date, time);
    updateFixedExpensesTable();
    fixedExpensesModal.style.display = "none";

}
function updateFixedExpensesTable() {

    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 3) {
        table.deleteRow(3);
    }

    // Thêm từng phần tử của mảng fixedExpensesTypes vào bảng
    for (var i = 0; i < fixedExpenses.length; i++) {
        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = fixedExpenses[i].name;
        cell3.innerHTML = fixedExpenses[i].fixedExpensesType;
        cell4.innerHTML = fixedExpenses[i].mainIncome;
        cell5.innerHTML = fixedExpenses[i].description;
        cell6.innerHTML = fixedExpenses[i].paymentDate;
        cell7.innerHTML = fixedExpenses[i].paymentTime;

        cell8.innerHTML = `
            <button class="btn btn-edit" onclick="editFixedExpenses(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deleteFixedExpenses(${i})">Xóa</button>
        `;
    }
}
function deleteFixedExpenses(index) {
    fixedExpenses.splice(index, 1); // Xóa phần tử khỏi mảng
    updateFixedExpensesTable(); // Cập nhật lại bảng sau khi xóa
    localStorage.setItem('FixedExpenses', JSON.stringify(fixedExpenses));
}
function editFixedExpenses(index) {
    fixedExpensesModal.style.display = "block";

    // Gán giá trị hiện tại của thu nhập vào ô nhập liệu để sửa
    document.getElementById("name").value = fixedExpenses[index].name;
    document.getElementById("amount").value = fixedExpenses[index].mainIncome;
    document.getElementById("date").value = fixedExpenses[index].paymentDate;
    document.getElementById("incomeType").value = fixedExpenses[index].fixedExpensesType;
    document.getElementById("description").value = fixedExpenses[index].description;
    document.getElementById("time").value = fixedExpenses[index].paymentTime;
    // Thay đổi nút lưu thành nút "Cập nhật"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật"; // Đổi chữ "Lưu" thành "Cập nhật"
    var title = document.querySelector("#AddFixedExpenses h2");
    title.innerText = "Cập nhật";
    saveButton.onclick = null;
    // Xử lý sự kiện khi nhấn nút "Cập nhật"
    saveButton.onclick = function () {
        var name = document.getElementById("name").value;
        var amount = document.getElementById("amount").value;
        var date = document.getElementById("date").value;
        var incomeType = document.getElementById("incomeType").value;
        var description = document.getElementById("description").value;
        var time = document.getElementById("time").value;

        // Kiểm tra nếu tên thu nhập trống thì không làm gì
        if (!name) {
            alert("Vui lòng nhập tên thu nhập");
            return;
        }
        if (!amount) {
            alert("Vui lòng nhập số tiền");
            return;
        }
        var numericAmount = Number(amount);


        if (isNaN(numericAmount) || !Number.isFinite(numericAmount)) {
            alert("số tiền không hợp lệ");
            return;
        }
        if (!date) {
            alert("Vui lòng chọn ngày");
            return;
        }
        if (!incomeType) {
            alert("Vui lòng chọn loại thu nhập");
            return;
        }
        if (!description) {
            alert("Vui lòng nhập mô tả");
            return;
        }
        if (!time) {
            alert("Vui lòng nhập thời gian");
            return;
        }
        fixedExpenses[index].name = name;
        fixedExpenses[index].fixedExpensesType = incomeType;
        fixedExpenses[index].mainIncome = amount;
        fixedExpenses[index].description = description;
        fixedExpenses[index].paymentDate = date;
        fixedExpenses[index].paymentTime = time;
        localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses));
        updateFixedExpensesTable();

        // Đóng modal sau khi cập nhật
        fixedExpensesModal.style.display = "none";

        // Đặt lại nút thành "Lưu" cho các lần thêm mới tiếp theo
        saveButton.innerHTML = "Lưu";
        saveButton.onclick = saveFixedExpenses; // Khôi phục hành vi thêm mới ban đầu
        title.innerHTML = "Thêm mới";
    };
}
function closeFixedExpensesModal() {
    fixedExpensesModal.style.display = "none";
}
function populateIncomeTypes() {

    const incomeTypeSelect = document.getElementById("incomeType");

    fixedExpensesTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.id; // Giá trị của option
        option.textContent = type.name; // Văn bản hiển thị
        incomeTypeSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fixedExpensesModal = document.getElementById("AddFixedExpenses");
    fixedExpensesModal.addEventListener("click", closeFixedExpensesModal());
});
document.addEventListener("DOMContentLoaded", populateIncomeTypes);

document.addEventListener("DOMContentLoaded", updateFixedExpensesTable);

