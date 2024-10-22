let fixedExpensesTypes = JSON.parse(localStorage.getItem('fixedExpensesTypes')) || [
    { id: 1, name: "Lương" },
    { id: 2, name: "Thưởng" },
    { id: 3, name: "Đầu tư" },
    { id: 4, name: "Kinh doanh" },
    { id: 5, name: "Cho thuê" },
];


let nextfixedExpensesTypesId = 6; // Biến nextId sẽ giữ giá trị tiếp theo của id

function addFixedExpensesType(newName) {
    var newIncomeType = {
        id: nextFixedExpensesTypesId++,  // Gán Id hiện tại và sau đó tăng nextId
        name: newName, // Gán tên loại thu nhập
    };
    fixedExpensesTypes.push(newIncomeType); // Thêm đối tượng vào mảng
    localStorage.setItem('fixedExpensesTypes', JSON.stringify(fixedExpensesTypes));
}

var fixedExpensesTypeModal = document.getElementById("AddFixedExpensesType");
var fixedExpensesTypeBtn = document.getElementById("addBtn");


var fixedExpensesTypeSpan = document.getElementsByClassName("close")[0];


fixedExpensesTypeBtn.onclick = function () {
    fixedExpensesTypeModal.style.display = "block";
}


fixedExpensesTypeSpan.onclick = function () {
    fixedExpensesTypeModal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == fixedExpensesTypeModal) {
        fixedExpensesTypeModal.style.display = "none";
    }
}


function saveFixedExpensesType() {
    var name = document.getElementById("name").value;

    // Kiểm tra nếu tên thu nhập trống thì không làm gì
    if (!name) {
        alert("Vui lòng nhập tên thu nhập");
        return;
    }
    addFixedExpensesType(name);
    updateFixedExpensesTypeTable();
    fixedExpensesTypeModal.style.display = "none";

}
function updateFixedExpensesTypeTable() {
    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 3) {
        table.deleteRow(3);
    }

    // Thêm từng phần tử của mảng fixedExpensesTypes vào bảng
    for (var i = 0; i < fixedExpensesTypes.length; i++) {
        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = fixedExpensesTypes[i].name;
        cell3.innerHTML = `
            <button class="btn btn-edit" onclick="editFixedExpensesType(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deleteFixedExpensesType(${i})">Xóa</button>
        `;
    }
}
// Hàm xóa hàng
function deleteFixedExpensesType(index) {
    fixedExpensesTypes.splice(index, 1); // Xóa phần tử khỏi mảng
    updateFixedExpensesTypeTable() // Cập nhật lại bảng sau khi xóa
    localStorage.setItem('fixedExpensesTypes', JSON.stringify(fixedExpensesTypes));

}
function editFixedExpensesType(index) {
    fixedExpensesTypeModal.style.display = "block";

    // Gán giá trị hiện tại của thu nhập vào ô nhập liệu để sửa
    document.getElementById("name").value = fixedExpensesTypes[index].name;

    // Thay đổi nút lưu thành nút "Cập nhật"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật"; // Đổi chữ "Lưu" thành "Cập nhật"
    var title = document.querySelector("#AddFixedExpensesType h2");
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
        fixedExpensesTypes[index].name = newName;
        localStorage.setItem('fixedExpensesTypes', JSON.stringify(fixedExpensesTypes));
        updateFixedExpensesTypeTable() // Cập nhật lại bảng sau khi sửa

        // Đóng modal sau khi cập nhật
        fixedExpensesTypeModal.style.display = "none";

        // Đặt lại nút thành "Lưu" cho các lần thêm mới tiếp theo
        saveButton.innerHTML = "Lưu";
        saveButton.onclick = saveFixedExpensesType; // Khôi phục hành vi thêm mới ban đầu
        title.innerHTML = "Thêm mới";
    };

}




function closeFixedExpensesTypeModal() {
    primaryIncomeTypeModal.style.display = "none";
}

