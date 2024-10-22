var primaryIncomeTypeModal = document.getElementById("AddPrimaryIncomeType");     
var primaryIncomeTypeBtn = document.getElementById("addBtn");


var primaryIncomeTypeSpan = document.getElementsByClassName("close")[0];


primaryIncomeTypeBtn.onclick = function() {
    primaryIncomeTypeModal.style.display = "block";
}


primaryIncomeTypeSpan.onclick = function() {
    primaryIncomeTypeModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == primaryIncomeTypeModal) {
        primaryIncomeTypeModal.style.display = "none";
    }
}
function savePrimaryIncomeType() {
    var name = document.getElementById("name").value;

    // Kiểm tra nếu tên thu nhập trống thì không làm gì
    if (!name) {
        alert("Vui lòng nhập tên thu nhập");
        return;
    }
    addPrimaryIncomeType(name);
    updatePrimaryIncomeTypeTable();
    primaryIncomeTypeModal.style.display = "none";
    
}
function updatePrimaryIncomeTypeTable() {
    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 3) {
        table.deleteRow(3);
    }

    // Thêm từng phần tử của mảng primaryIncomeTypes vào bảng
    for (var i = 0; i < primaryIncomeTypes.length; i++) {
        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = primaryIncomeTypes[i].name;
        cell3.innerHTML = `
            <button class="btn btn-edit" onclick="editPrimaryIncomeType(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deletePrimaryIncomeType(${i})">Xóa</button>
        `;
    }
}
// Hàm xóa hàng
function deletePrimaryIncomeType(index) {
    primaryIncomeTypes.splice(index, 1); // Xóa phần tử khỏi mảng
    updatePrimaryIncomeTypeTable() // Cập nhật lại bảng sau khi xóa
    localStorage.setItem('primaryIncomeTypes', JSON.stringify(primaryIncomeTypes));

}
function editPrimaryIncomeType(index) {
    primaryIncomeTypeModal.style.display = "block";

    // Gán giá trị hiện tại của thu nhập vào ô nhập liệu để sửa
    document.getElementById("name").value = primaryIncomeTypes[index].name;

    // Thay đổi nút lưu thành nút "Cập nhật"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật"; // Đổi chữ "Lưu" thành "Cập nhật"
    var title = document.querySelector("#AddPrimaryIncomeType h2");
    title.innerText = "Cập nhật";

    // Xử lý sự kiện khi nhấn nút "Cập nhật"
    saveButton.onclick = function () {
        var newName = document.getElementById("name").value;

        // Kiểm tra nếu tên thu nhập trống thì không làm gì
        if (!newName) {
            alert("Vui lòng nhập tên thu nhập");
            return;
        }

        // Cập nhật tên thu nhập
        primaryIncomeTypes[index].name = newName;
        localStorage.setItem('primaryIncomeTypes', JSON.stringify(primaryIncomeTypes));
        updatePrimaryIncomeTypeTable() // Cập nhật lại bảng sau khi sửa

        // Đóng modal sau khi cập nhật
        primaryIncomeTypeModal.style.display = "none";

        // Đặt lại nút thành "Lưu" cho các lần thêm mới tiếp theo
        saveButton.innerHTML = "Lưu";
        saveButton.onclick = savePrimaryIncomeType; // Khôi phục hành vi thêm mới ban đầu
        title.innerHTML = "Thêm mới";
    };
    
}




function closePrimaryIncomeTypeModal() {
    primaryIncomeTypeModal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", updatePrimaryIncomeTypeTable);