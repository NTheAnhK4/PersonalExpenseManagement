let users = JSON.parse(localStorage.getItem('users')) || [{
    userId: 1,
    username:'john',
    password:"123",
    email: 'john@gmail.com',
    phoneNumber: '0912345678',
    accountStatus: "Active",
    registrationDate: new Date().toISOString(), // Ngày đăng ký hiện tại
    lastLogin: null 

}]; // Mảng lưu trữ danh sách người dùng
let nextUserId = 2; // Biến lưu ID tiếp theo cho người dùng mới


function addUser(userName, password, email, phoneNumber) {
    const newUser = {
        userId: nextUserId++, // Tăng ID tự động
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        accountStatus: "Active",
        registrationDate: new Date().toISOString(), // Ngày đăng ký hiện tại
        lastLogin: null 
    };
    users.push(newUser); // Thêm người dùng vào danh sách
    localStorage.setItem('users', JSON.stringify(users));
}




function getUserById(userId) {
    return users.find(user => user.userId === userId);
}


function deleteUser(userId) {
    users = users.filter(user => user.userId !== userId); // Xóa người dùng theo ID
    localStorage.setItem('users', JSON.stringify(users));
}



