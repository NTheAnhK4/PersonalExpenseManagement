// Biến toàn cục
var currentPage = 1;
var rowsPerPage = 5;
var primaryIncomeModal = document.getElementById("AddPrimaryIncome");
var primaryIncomeBtn = document.getElementById("addBtn");
var primaryIncomeSpan = document.getElementsByClassName("close")[0];

// Hiển thị và ẩn modal
primaryIncomeBtn.onclick = showModal;
primaryIncomeSpan.onclick = hideModal;

window.onclick = function (event) {
    if (event.target == primaryIncomeModal) {
        hideModal();
    }
};

// Hiển thị modal
function showModal() {
    primaryIncomeModal.style.display = "block";
}

// Ẩn modal
function hideModal() {
    primaryIncomeModal.style.display = "none";
}

// Lưu thông tin thu nhập chính
function savePrimaryIncome() {
    var name = getInputValue("name");
    var amount = getInputValue("amount");
    var date = getInputValue("date");
    var incomeType = getSelectedOption("incomeType");
    var description = getInputValue("description");
    var time = getInputValue("time");

    if (!isValidPrimaryIncome(name, amount, date, incomeType, description, time)) return;

    addPrimaryIncome(name, incomeType, amount, description, date, time);
    updatePrimaryIncomeTable(primaryIncome);
    hideModal();
}

// Kiểm tra tính hợp lệ của thu nhập
function isValidPrimaryIncome(name, amount, date, incomeType, description, time) {
    if (!name || !amount || !date || !incomeType || !description || !time) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return false;
    }
    
    if (isNaN(Number(amount)) || !Number.isFinite(Number(amount))) {
        alert("Số tiền không hợp lệ.");
        return false;
    }

    return true;
}

function updatePrimaryIncomeTable(piArray) {
    var tableBody = document.querySelector("#incomeTable tbody");

    // Xóa các dòng cũ trừ tiêu đề
    clearTableRows(tableBody);

    // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = Math.min(startIndex + rowsPerPage, piArray.length);

    // Thêm dữ liệu vào bảng, giới hạn theo trang
    for (var i = startIndex; i < endIndex; i++) {
        var income = piArray[i];
        var row = tableBody.insertRow();

        addCell(row, i + 1); // Số thứ tự
        addCell(row, income.name);
        addCell(row, income.primaryIncomeType);
        addCell(row, income.mainIncome);
        addCell(row, income.description);
        addCell(row, income.paymentDate);
        addCell(row, income.paymentTime);

        addCell(row, `
            <button class="btn btn-edit" onclick="editPrimaryIncome(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deletePrimaryIncome(${i})">Xóa</button>
        `);
    }

    // Cập nhật trạng thái của nút điều hướng
    updatePaginationControls(piArray.length);
}

function clearTableRows(tableBody) {
    while (tableBody.rows.length > 2) {
        tableBody.deleteRow(2);
    }
}

function addCell(row, content) {
    var cell = row.insertCell();
    cell.innerHTML = content;
}

// Điều hướng đến trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePrimaryIncomeTable(primaryIncome);
    }
}

// Điều hướng đến trang sau
function nextPage() {
    
    if (currentPage * rowsPerPage < primaryIncome.length) {
        currentPage++;
       
        updatePrimaryIncomeTable(primaryIncome);
    }
}

// Cập nhật trạng thái nút điều hướng (ẩn/hiện nếu cần)
function updatePaginationControls(totalRows) {
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage * rowsPerPage >= totalRows;
}

// Xóa thu nhập chính
function deletePrimaryIncome(index) {
    primaryIncome.splice(index, 1);
    updatePrimaryIncomeTable(primaryIncome);
    saveToLocalStorage('primaryIncome', primaryIncome);
}

// Sửa thu nhập chính
function editPrimaryIncome(index) {
    showModal();
    fillEditForm(index);

    var saveButton = document.querySelector(".save-btn");
    var title = document.querySelector("#AddPrimaryIncome h2");

    saveButton.innerHTML = "Cập nhật";
    title.innerText = "Cập nhật";

    saveButton.onclick = function () {
        if (savePrimaryIncomeChanges(index)) {
            hideModal();
            resetSaveButton(saveButton, title);
        }
    };
}

// Điền dữ liệu vào form sửa
function fillEditForm(index) {
    setInputValue("name", primaryIncome[index].name);
    setInputValue("amount", primaryIncome[index].mainIncome);
    setInputValue("date", primaryIncome[index].paymentDate);
    setInputValue("incomeType", primaryIncome[index].primaryIncomeType);
    setInputValue("description", primaryIncome[index].description);
    setInputValue("time", primaryIncome[index].paymentTime);
}

// Lưu thay đổi của thu nhập chính
function savePrimaryIncomeChanges(index) {
    var name = getInputValue("name");
    var amount = getInputValue("amount");
    var date = getInputValue("date");
    var incomeType = getSelectedOption("incomeType");
    var description = getInputValue("description");
    var time = getInputValue("time");

    if (!isValidPrimaryIncome(name, amount, date, incomeType, description, time)) return false;

    Object.assign(primaryIncome[index], { name, mainIncome: amount, paymentDate: date, primaryIncomeType: incomeType, description, paymentTime: time });
    saveToLocalStorage('primaryIncome', primaryIncome);
    updatePrimaryIncomeTable(primaryIncome);
    return true;
}

// Đặt lại nút lưu thành "Lưu"
function resetSaveButton(button, title) {
    button.innerHTML = "Lưu";
    button.onclick = savePrimaryIncome;
    title.innerHTML = "Thêm mới";
}

// Lấy giá trị từ input
function getInputValue(id) {
    return document.getElementById(id).value;
}

// Đặt giá trị cho input
function setInputValue(id, value) {
    document.getElementById(id).value = value;
}

// Lấy giá trị từ select
function getSelectedOption(id) {
    var select = document.getElementById(id);
    return select.options[select.selectedIndex].text;
}

// Lưu vào localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Hiển thị các loại thu nhập vào select box
function populateIncomeTypes() {
    const incomeTypeSelect = document.getElementById("incomeType");

    primaryIncomeTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.id;
        option.textContent = type.name;
        incomeTypeSelect.appendChild(option);
    });
}

// Tìm kiếm thu nhập theo tên
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchTerm = this.value;
        const results = searchPrimaryIncomeByName(searchTerm);
        updatePrimaryIncomeTable(results);
    }
});

// Khởi tạo sau khi DOM được tải
document.addEventListener("DOMContentLoaded", () => {
    populateIncomeTypes();
    updatePrimaryIncomeTable(primaryIncome);
});
