let users = []; // Mảng lưu trữ danh sách người dùng
let nextUserId = 1; // Biến lưu ID tiếp theo cho người dùng mới


function addUser(userName, password, email, phoneNumber, accountStatus) {
    const newUser = {
        userId: nextUserId++, // Tăng ID tự động
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        accountStatus: accountStatus,
        registrationDate: new Date().toISOString(), // Ngày đăng ký hiện tại
        lastLogin: null 
    };
    users.push(newUser); // Thêm người dùng vào danh sách
    console.log(`User added: ${userName}`);
}


function displayUsers() {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Xóa danh sách hiện tại
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerText = `ID: ${user.userId}, Name: ${user.userName}, Email: ${user.email}, Phone: ${user.phoneNumber}, Status: ${user.accountStatus}, Registered: ${user.registrationDate}`;
        userListDiv.appendChild(userItem);
    });
}


function getUserById(userId) {
    return users.find(user => user.userId === userId);
}


function updateUser(userId, updatedData) {
    const user = getUserById(userId);
    if (user) {
        Object.assign(user, updatedData); // Cập nhật thông tin người dùng
        console.log(`User updated: ${userId}`);
    } else {
        console.log("User not found!");
    }
}

function deleteUser(userId) {
    users = users.filter(user => user.userId !== userId); // Xóa người dùng theo ID
    console.log(`User deleted: ${userId}`);
}