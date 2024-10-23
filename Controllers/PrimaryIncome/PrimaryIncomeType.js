let currentPage = 0;
const rowsPerPage = 5;
var primaryIncomeTypeModal = document.getElementById("AddPrimaryIncomeType");     
var primaryIncomeTypeBtn = document.getElementById("addBtn");
var primaryIncomeTypeSpan = document.getElementsByClassName("close")[0];

primaryIncomeTypeBtn.onclick = () => primaryIncomeTypeModal.style.display = "block";
primaryIncomeTypeSpan.onclick = closePrimaryIncomeTypeModal;

window.onclick = (event) => {
    if (event.target === primaryIncomeTypeModal) {
        closePrimaryIncomeTypeModal();
    }
}

function savePrimaryIncomeType() {
    var name = document.getElementById("name").value;

    if (!name) {
        alert("Vui lòng nhập tên thu nhập");
        return;
    }

    addPrimaryIncomeType(name);
    updatePrimaryIncomeTypeTable(primaryIncomeTypes);
    closePrimaryIncomeTypeModal();
}
function updatePrimaryIncomeTypeTable(pitArray) {
    const totalRows = pitArray.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Tạo các phần tử cho các trang
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ''; // Xóa nội dung cũ

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i + 1;
        pageButton.onclick = () => {
            currentPage = i;
            renderTable(pitArray);
        };
        paginationContainer.appendChild(pageButton);
    }

    renderTable(pitArray);
}

function renderTable(pitArray) {
    const table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    const start = currentPage * rowsPerPage;
    const end = Math.min(start + rowsPerPage, pitArray.length);

    // Thêm các dòng cho trang hiện tại
    for (let i = start; i < end; i++) {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = i + 1; // Số thứ tự
        row.insertCell(1).innerHTML = pitArray[i].name;
        row.insertCell(2).innerHTML = `
            <button class="btn btn-edit" onclick="editPrimaryIncomeType(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deletePrimaryIncomeType(${i})">Xóa</button>
        `;
    }
}

function deletePrimaryIncomeType(index) {
    primaryIncomeTypes.splice(index, 1);
    updatePrimaryIncomeTypeTable(primaryIncomeTypes);
    localStorage.setItem('primaryIncomeTypes', JSON.stringify(primaryIncomeTypes));
}

function editPrimaryIncomeType(index) {
    primaryIncomeTypeModal.style.display = "block";
    var nameInput = document.getElementById("name");
    nameInput.value = primaryIncomeTypes[index].name;

    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật";
    document.querySelector("#AddPrimaryIncomeType h2").innerText = "Cập nhật";

    saveButton.onclick = () => {
        var newName = nameInput.value;

        if (!newName) {
            alert("Vui lòng nhập tên thu nhập");
            return;
        }

        primaryIncomeTypes[index].name = newName;
        localStorage.setItem('primaryIncomeTypes', JSON.stringify(primaryIncomeTypes));
        updatePrimaryIncomeTypeTable(primaryIncomeTypes);
        closePrimaryIncomeTypeModal();
        saveButton.innerHTML = "Lưu";
        saveButton.onclick = savePrimaryIncomeType;
        document.querySelector("#AddPrimaryIncomeType h2").innerText = "Thêm mới";
    };
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = this.value.toLowerCase();
        const results = primaryIncomeTypes.filter(item => item.name.toLowerCase().includes(searchTerm));
        updatePrimaryIncomeTypeTable(results);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updatePrimaryIncomeTypeTable(primaryIncomeTypes);
});

function closePrimaryIncomeTypeModal() {
    primaryIncomeTypeModal.style.display = "none";
}



