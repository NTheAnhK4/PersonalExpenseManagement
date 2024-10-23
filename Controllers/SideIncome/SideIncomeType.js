const addBtn = document.getElementById('addBtn');
const SideIncomeModal = document.getElementById('SideIncomeModal');
const closeBtns = document.querySelectorAll('.close');
const saveBtn = document.querySelector('.save-btn');
const nameSideIncome = document.querySelector('.nameSideIncome');
const incomeTable = document.getElementById('incomeTable');

let idSideIncome = 0;
let isEditing = false; // Trạng thái để theo dõi nếu đang ở chế độ chỉnh sửa
let editingIndex = -1; // Chỉ số của mục đang được chỉnh sửa

// Mở modal
addBtn.onclick = () => {
    SideIncomeModal.style.display = 'block';
    resetForm(); // Reset form khi mở modal
}

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
}

// Lấy danh sách thu nhập từ localStorage
let listSideIncome = JSON.parse(localStorage.getItem('listSideIncome')) || [];

// Lưu hoặc cập nhật thông tin
saveBtn.onclick = () => {
    if (nameSideIncome.value === '') {
        alert('Vui lòng nhập thông tin');
        return;
    }

    const temp = {
        id: ++idSideIncome,
        name: nameSideIncome.value
    };

    if (isEditing) {
        // Cập nhật mục đang được chỉnh sửa
        listSideIncome[editingIndex] = temp;
        isEditing = false; // Reset trạng thái sau khi cập nhật
        editingIndex = -1; // Reset chỉ số đang chỉnh sửa
    } else {
        // Thêm mới mục
        listSideIncome.push(temp);
    }

    localStorage.setItem('listSideIncome', JSON.stringify(listSideIncome));
    nameSideIncome.value = ''; // Reset trường nhập
    SideIncomeModal.style.display = 'none'; // Đóng modal
    renderListSideIncome(listSideIncome);
}

// Thêm vào bảng
const renderListSideIncome = (listSideIncome) => {
    const rowCount = incomeTable.rows.length;

    // Xóa tất cả các dòng trừ dòng tiêu đề (dòng đầu tiên)
    for (let i = rowCount - 1; i > 2; i--) {
        incomeTable.deleteRow(i);
    }

    if (listSideIncome.length > 0) {
        listSideIncome.forEach((item, i) => {
            const newRow = incomeTable.insertRow();
            newRow.insertCell(0).innerHTML = i + 1;
            newRow.insertCell(1).innerHTML = item.name;
            newRow.insertCell(2).innerHTML = `
                <button class="btn btn-edit" onclick="editSideIncomeType(${i})">Sửa</button>
                <button class="btn btn-delete" onclick="deleteSideIncomeType(${i})">Xóa</button>
            `;
        });
    }
}

// Xóa mục
const deleteSideIncomeType = (index) => {
    listSideIncome.splice(index, 1);
    localStorage.setItem('listSideIncome', JSON.stringify(listSideIncome));
    renderListSideIncome(listSideIncome);
}

// Sửa mục
const editSideIncomeType = (index) => {
    SideIncomeModal.style.display = 'block';
    nameSideIncome.value = listSideIncome[index].name; // Điền thông tin vào form
    isEditing = true; // Chế độ chỉnh sửa
    editingIndex = index; // Lưu chỉ số để cập nhật sau này
}

// Reset form
const resetForm = () => {
    nameSideIncome.value = ''; // Đặt lại giá trị nhập
    isEditing = false; // Reset chế độ chỉnh sửa
    editingIndex = -1; // Reset chỉ số
}

// Tìm kiếm
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchTerm = this.value.toLowerCase();
        const results = listSideIncome.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderListSideIncome(results);
    }
});

// Hiển thị danh sách thu nhập khi tải trang
renderListSideIncome(listSideIncome);
