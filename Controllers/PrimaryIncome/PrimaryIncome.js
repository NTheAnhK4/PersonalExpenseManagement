var primaryIncomeModal = document.getElementById("AddPrimaryIncome");     
var primaryIncomeBtn = document.getElementById("addBtn");
var primaryIncomeSpan = document.getElementsByClassName("close")[0];

primaryIncomeBtn.onclick = function() {
    primaryIncomeModal.style.display = "block";
};

primaryIncomeSpan.onclick = function() {
    closePrimaryIncomeModal();
};

window.onclick = function(event) {
    if (event.target == primaryIncomeModal) {
        closePrimaryIncomeModal();
    }
};

function closePrimaryIncomeModal() {
    primaryIncomeModal.style.display = "none";
}

function getFormValues() {
    return {
        name: document.getElementById("name").value,
        amount: Number(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        incomeType: document.getElementById("incomeType").value,
        description: document.getElementById("description").value,
        time: document.getElementById("time").value,
    };
}

function validateForm(values) {
    if (!values.name) return "Vui lòng nhập tên thu nhập";
    if (!values.amount || isNaN(values.amount) || !Number.isFinite(values.amount)) return "Số tiền không hợp lệ";
    if (!values.date) return "Vui lòng chọn ngày";
    if (!values.incomeType) return "Vui lòng chọn loại thu nhập";
    if (!values.description) return "Vui lòng nhập mô tả";
    if (!values.time) return "Vui lòng nhập thời gian";
    return null;
}

function savePrimaryIncome() {
    var values = getFormValues();
    var error = validateForm(values);
    if (error) {
        alert(error);
        return;
    }

    addPrimaryIncome(values.name, values.incomeType, values.amount, values.description, values.date, values.time);
    updatePrimaryIncomeTable(primaryIncome);
    closePrimaryIncomeModal();
}

function updatePrimaryIncomeTable(piArray) {
    var table = document.getElementById("incomeTable");

    // Xóa các dòng cũ trừ tiêu đề
    while (table.rows.length > 3) {
        table.deleteRow(3);
    }

    // Thêm từng phần tử của mảng primaryIncomeTypes vào bảng
    piArray.forEach((item, index) => {
        var row = table.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.primaryIncomeType}</td>
            <td>${item.mainIncome}</td>
            <td>${item.description}</td>
            <td>${item.paymentDate}</td>
            <td>${item.paymentTime}</td>
            <td>
                <button class="btn btn-edit" onclick="editPrimaryIncome(${index})">Sửa</button>
                <button class="btn btn-delete" onclick="deletePrimaryIncome(${index})">Xóa</button>
            </td>
        `;
    });
}

function deletePrimaryIncome(index) {
    primaryIncome.splice(index, 1); // Xóa phần tử khỏi mảng
    updatePrimaryIncomeTable(primaryIncome); // Cập nhật lại bảng sau khi xóa
    localStorage.setItem('primaryIncome', JSON.stringify(primaryIncome));
}

function editPrimaryIncome(index) {
    primaryIncomeModal.style.display = "block";
    var item = primaryIncome[index];

    document.getElementById("name").value = item.name;
    document.getElementById("amount").value = item.mainIncome;
    document.getElementById("date").value = item.paymentDate;
    document.getElementById("incomeType").value = item.incomeType;
    document.getElementById("description").value = item.description;
    document.getElementById("time").value = item.paymentTime;

    // Thay đổi nút lưu thành nút "Cập nhật"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Cập nhật"; 
    var title = document.querySelector("#AddPrimaryIncome h2");
    title.innerText = "Cập nhật";

    saveButton.onclick = function () {
        saveEditedIncome(index);
    };
}

function saveEditedIncome(index) {
    var values = getFormValues();
    var error = validateForm(values);
    if (error) {
        alert(error);
        return;
    }

    primaryIncome[index] = { ...primaryIncome[index], ...values }; // Cập nhật thông tin
    localStorage.setItem('primaryIncome', JSON.stringify(primaryIncome));
    updatePrimaryIncomeTable(primaryIncome);
    closePrimaryIncomeModal();

    // Đặt lại nút thành "Lưu"
    var saveButton = document.querySelector(".save-btn");
    saveButton.innerHTML = "Lưu";
    saveButton.onclick = savePrimaryIncome;
    var title = document.querySelector("#AddPrimaryIncome h2");
    title.innerHTML = "Thêm mới";
}

function populateIncomeTypes() {
    const incomeTypeSelect = document.getElementById("incomeType");
    primaryIncomeTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.id; 
        option.textContent = type.name; 
        incomeTypeSelect.appendChild(option);
    });
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = this.value;
        const results = searchPrimaryIncomeByName(searchTerm);  
        updatePrimaryIncomeTable(results);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    populateIncomeTypes();
    updatePrimaryIncomeTable(primaryIncome);
});
