let primaryIncomeTypes = [];

let nextId = 1; // Biến nextId sẽ giữ giá trị tiếp theo của id

function addType(newName) {
    var newIncomeType = {
        id: nextId++,  // Gán Id hiện tại và sau đó tăng nextId
        name: newName, // Gán tên loại thu nhập
    };
    primaryIncomeTypes.push(newIncomeType); // Thêm đối tượng vào mảng
}

var modal = document.getElementById("AddPrimaryIncomeType");     
        var btn = document.getElementById("addBtn");

       
        var span = document.getElementsByClassName("close")[0];

        
        btn.onclick = function() {
            modal.style.display = "block";
        }

        
        span.onclick = function() {
            modal.style.display = "none";
        }

       
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        
        function saveIncome() {
            var name = document.getElementById("name").value;
        
            // Kiểm tra nếu tên thu nhập trống thì không làm gì
            if (!name) {
                alert("Vui lòng nhập tên thu nhập");
                return;
            }
            addType(name);
            updateIncomeTable();
            modal.style.display = "none";
            
        }
        function updateIncomeTable() {
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
                    <button class="btn btn-edit" onclick="editIncome(${i})">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteIncome(${i})">Xóa</button>
                `;
            }
        }
        // Hàm xóa hàng
        function deleteIncome(index) {
            primaryIncomeTypes.splice(index, 1); // Xóa phần tử khỏi mảng
            updateIncomeTable(); // Cập nhật lại bảng sau khi xóa
        }
        function editIncome(index) {
            modal.style.display = "block";

            // Gán giá trị hiện tại của thu nhập vào ô nhập liệu để sửa
            document.getElementById("name").value = primaryIncomeTypes[index].name;

            // Thay đổi nút lưu thành nút "Cập nhật"
            var saveButton = document.querySelector(".save-btn");
            saveButton.innerHTML = "Cập nhật"; // Đổi chữ "Lưu" thành "Cập nhật"

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
                updateIncomeTable(); // Cập nhật lại bảng sau khi sửa

                // Đóng modal sau khi cập nhật
                modal.style.display = "none";

                // Đặt lại nút thành "Lưu" cho các lần thêm mới tiếp theo
                saveButton.innerHTML = "Lưu";
                saveButton.onclick = saveIncome; // Khôi phục hành vi thêm mới ban đầu
            };
        }

       


        function closeModal() {
            modal.style.display = "none";
        }