var primaryIncomeModal = document.getElementById("AddPrimaryIncome");     
var primaryIncomeBtn = document.getElementById("addBtn");


var primaryIncomeSpan = document.getElementsByClassName("close")[0];


primaryIncomeBtn.onclick = function() {
    
    primaryIncomeModal.style.display = "block";
}
primaryIncomeSpan.onclick = function() {
    primaryIncomeModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == primaryIncomeModal) {
        primaryIncomeModal.style.display = "none";
    }
}
function savePrimaryIncome() {
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
    addPrimaryIncome(name,incomeType,amount,description,date,time);
    updatePrimaryIncomeTable();
    primaryIncomeModal.style.display = "none";
    
}
function updatePrimaryIncomeTable() {
   
    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 3) {
        table.deleteRow(3);
    }

    // Thêm từng phần tử của mảng primaryIncomeTypes vào bảng
    for (var i = 0; i < primaryIncome.length; i++) {
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
        cell2.innerHTML = primaryIncome[i].name;
        cell3.innerHTML = primaryIncome[i].primaryIncomeType;
        cell4.innerHTML = primaryIncome[i].mainIncome;
        cell5.innerHTML = primaryIncome[i].description;
        cell6.innerHTML = primaryIncome[i].paymentDate;
        cell7.innerHTML = primaryIncome[i].paymentTime;
        
        cell8.innerHTML = `
            <button class="btn btn-edit" onclick="editPrimaryIncome(${i})">Sửa</button>
            <button class="btn btn-delete" onclick="deletePrimaryIncome(${i})">Xóa</button>
        `;
    }
}
function deletePrimaryIncome(index) {
    primaryIncome.splice(index, 1); // Xóa phần tử khỏi mảng
    updatePrimaryIncomeTable(); // Cập nhật lại bảng sau khi xóa
    localStorage.setItem('primaryIncome', JSON.stringify(primaryIncome));
}
function editPrimaryIncome(index) {
    primaryIncomeModal.style.display = "block";

    // Gán giá trị hiện tại của thu nhập vào ô nhập liệu để sửa
    document.getElementById("name").value = primaryIncome[index].name;
    document.getElementById("amount").value = primaryIncome[index].mainIncome;
    document.getElementById("date").value = primaryIncome[index].paymentDate;
    document.getElementById("incomeType").value = primaryIncome[index].primaryIncomeType;
    document.getElementById("description").value = primaryIncome[index].description;
    document.getElementById("time").value = primaryIncome[index].paymentTime;
    // Thay đổi nút lưu thành nút "Cập nhật"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật"; // Đổi chữ "Lưu" thành "Cập nhật"
    var title = document.querySelector("#AddPrimaryIncome h2");
    title.innerText = "Cập nhật";

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
        primaryIncome[index].name = name;
        primaryIncome[index].primaryIncomeType = incomeType;
        primaryIncome[index].mainIncome = amount;
        primaryIncome[index].description = description;
        primaryIncome[index].paymentDate = date;
        primaryIncome[index].paymentTime = time;
        localStorage.setItem('primaryIncome', JSON.stringify(primaryIncome));
        updatePrimaryIncomeTable();

        // Đóng modal sau khi cập nhật
        primaryIncomeModal.style.display = "none";

        // Đặt lại nút thành "Lưu" cho các lần thêm mới tiếp theo
        saveButton.innerHTML = "Lưu";
        saveButton.onclick = savePrimaryIncome; // Khôi phục hành vi thêm mới ban đầu
        title.innerHTML = "Thêm mới";
    };
}
function closePrimaryIncomeModal() {
    primaryIncomeModal.style.display = "none";
}
function populateIncomeTypes() {
    
    const incomeTypeSelect = document.getElementById("incomeType");

    primaryIncomeTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.id; // Giá trị của option
        option.textContent = type.name; // Văn bản hiển thị
        incomeTypeSelect.appendChild(option);
    });
}
   

document.addEventListener("DOMContentLoaded", populateIncomeTypes);

document.addEventListener("DOMContentLoaded", updatePrimaryIncomeTable);

