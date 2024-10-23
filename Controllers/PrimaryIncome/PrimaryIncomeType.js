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
    primaryIncomeTypeModal.style.display = "none";
    
}
function updatePrimaryIncomeTypeTable(pitArray){
    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Thêm từng phần tử của mảng primaryIncomeTypes vào bảng
    for (var i = 0; i < pitArray.length; i++) {
        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = pitArray[i].name;
        cell3.innerHTML = `
            <button class="btn btn-edit" onclick="editPrimaryIncomeType(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deletePrimaryIncomeType(${i})">Xóa</button>
        `;
    });
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

document.addEventListener("DOMContentLoaded", () => {
    updatePrimaryIncomeTypeTable(primaryIncomeTypes);
});
