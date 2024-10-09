// userStorage.js

let users = []; // Mảng lưu trữ danh sách người dùng
let nextUserId = 1; // Biến lưu ID tiếp theo cho người dùng mới

// Hàm thêm người dùng
function addUser(userName, password, email, phoneNumber, accountStatus) {
    const newUser = {
        userId: nextUserId++, // Tăng ID tự động
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        accountStatus: accountStatus,
        registrationDate: new Date().toISOString(), // Ngày đăng ký hiện tại
        lastLogin: null // Chưa có lần đăng nhập nào
    };
    users.push(newUser); // Thêm người dùng vào danh sách
}

// Hàm hiển thị danh sách người dùng
function displayUsers() {
    users.forEach(user => {
        console.log(`ID: ${user.userId}, Name: ${user.userName}, Email: ${user.email}, Phone: ${user.phoneNumber}, Status: ${user.accountStatus}, Registered: ${user.registrationDate}`);
    });
}

// Hàm tìm kiếm người dùng theo ID
function getUserById(userId) {
    return users.find(user => user.userId === userId);
}

// Hàm sửa thông tin người dùng
function updateUser(userId, updatedData) {
    const user = getUserById(userId);
    if (user) {
        Object.assign(user, updatedData); // Cập nhật thông tin người dùng
    } else {
        console.log("User not found!");
    }
}

// Hàm xóa người dùng
function deleteUser(userId) {
    users = users.filter(user => user.userId !== userId); // Xóa người dùng theo ID
}

// Xuất các hàm và danh sách người dùng để có thể sử dụng từ các file khác
export { addUser, displayUsers, getUserById, updateUser, deleteUser, users };
