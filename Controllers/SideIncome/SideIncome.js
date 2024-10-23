
const sideIncomeTypes = JSON.parse(localStorage.getItem('listSideIncome'))
sideIncomeTypes.forEach(item => {
    const option = document.createElement('option');
    option.value = item.name;  // Giá trị của option
    option.text =  item.name;    // Nội dung hiển thị của option
    incomeType.appendChild(option);  // Thêm option vào select
});


const addBtn = document.getElementById('addBtn');
const SideIncomeModal = document.getElementById('SideIncomeModal');
const closeBtns = document.querySelectorAll('.close');
const saveBtn = document.querySelector('.save-btn');
const incomeTable = document.getElementById('incomeTable');
const titleModal = document.getElementById('titleModal');

let ListSideIncomeDetai = JSON.parse(localStorage.getItem('ListSideIncomeDetai')) || [];
let isEditing = false;
let editingIndex = -1;

// Hiển thị modal khi nhấn nút "Thêm mới"
addBtn.onclick = () => {
    resetForm(); // Reset lại form
    titleModal.innerHTML = 'Thêm mới';
    SideIncomeModal.style.display = 'block';
    isEditing = false; // Đặt trạng thái thành "thêm mới"
};

// Đóng modal
closeBtns.forEach((closeBtn) => {
    closeBtn.onclick = () => {
        SideIncomeModal.style.display = 'none';
    }
});

// Đóng modal khi nhấn vào nền
SideIncomeModal.onclick = (e) => {
    if (e.target === e.currentTarget) {
        SideIncomeModal.style.display = 'none';
    }
};

// Lấy giá trị từ form
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

// Kiểm tra dữ liệu
function validateForm(values) {
    if (!values.name) return "Vui lòng nhập tên thu nhập";
    if (!values.amount || isNaN(values.amount) || !Number.isFinite(values.amount)) return "Số tiền không hợp lệ";
    if (!values.date) return "Vui lòng chọn ngày";
    if (!values.incomeType) return "Vui lòng chọn loại thu nhập";
    if (!values.description) return "Vui lòng nhập mô tả";
    if (!values.time) return "Vui lòng nhập thời gian";
    return null;
}

// Lưu hoặc cập nhật dữ liệu
saveBtn.onclick = () => {
    let value = getFormValues();
    let error = validateForm(value);

    if (error) {
        alert(error);
        return;
    }

    if (isEditing) {
        // Cập nhật thông tin khoản thu nhập
        ListSideIncomeDetai[editingIndex] = value;
        isEditing = false; // Reset trạng thái sau khi cập nhật
        editingIndex = -1;
    } else {
        // Thêm mới khoản thu nhập
        ListSideIncomeDetai.push(value);
    }

    localStorage.setItem('ListSideIncomeDetai', JSON.stringify(ListSideIncomeDetai));
    renderListSideIncome(ListSideIncomeDetai);
    SideIncomeModal.style.display = 'none';
    resetForm();
};

// Thêm dữ liệu vào bảng
const renderListSideIncome = (ListSideIncomeDetai) => {
    const rowCount = incomeTable.rows.length;

    // Xóa tất cả các dòng trừ dòng tiêu đề (dòng đầu tiên)
    for (let i = rowCount - 1; i > 2; i--) {
        incomeTable.deleteRow(i);
    }

    if (ListSideIncomeDetai.length > 0) {
        ListSideIncomeDetai.forEach((item, index) => {
            var row = incomeTable.insertRow();

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.incomeType}</td>
                <td>${item.amount}</td>
                <td>${item.description}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>
                    <button class="btn btn-edit" onclick="editSideIncome(${index})">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteSideIncome(${index})">Xóa</button>
                </td>
            `;
        });
    }
};

// Xóa khoản thu nhập
const deleteSideIncome = (index) => {
    ListSideIncomeDetai.splice(index, 1);
    localStorage.setItem('ListSideIncomeDetai', JSON.stringify(ListSideIncomeDetai));
    renderListSideIncome(ListSideIncomeDetai);
};

// Sửa khoản thu nhập
const editSideIncome = (index) => {
    isEditing = true;
    editingIndex = index;
    SideIncomeModal.style.display = 'block';
    titleModal.innerHTML = 'Cập nhật';
    let item = ListSideIncomeDetai[index];

    document.getElementById("name").value = item.name;
    document.getElementById("amount").value = item.amount;
    document.getElementById("date").value = item.date;
    document.getElementById("incomeType").value = item.incomeType;
    document.getElementById("description").value = item.description;
    document.getElementById("time").value = item.time;
};

// Reset form
const resetForm = () => {
    document.getElementById("name").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("date").value = '';
    document.getElementById("incomeType").value = '';
    document.getElementById("description").value = '';
    document.getElementById("time").value = '';
};

renderListSideIncome(ListSideIncomeDetai);

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = this.value.toLowerCase();
        const results = ListSideIncomeDetai.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderListSideIncome(results);
    }
});

