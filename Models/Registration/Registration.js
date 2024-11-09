const registerBtn = document.getElementById('registerBtn');
const userNameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phoneNumber');

registerBtn.addEventListener('click', () => {
    // Lấy giá trị từ các input
    const userName = userNameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneNumberInput.value;

    // Kiểm tra các điều kiện
    if (userName === '') {
        alert('Vui lòng nhập tên đăng nhập.');
        return;
    }

    if (password === '') {
        alert('Vui lòng nhập mật khẩu.');
        return;
    }

    if (confirmPassword !== password) {
        alert('Mật khẩu không khớp.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordRegex.test(password)) {
        alert('Mật khẩu phải có ít nhất 6-12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Địa chỉ email không hợp lệ.');
        return;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
        alert('Số điện thoại không hợp lệ.');
        return;
    }

    // Tạo đối tượng người dùng mới
    const newUser = {
        userName,
        password,
        email,
        phoneNumber
    };

    // Lấy danh sách người dùng từ localStorage hoặc khởi tạo danh sách mới
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser); // Thêm người dùng vào danh sách
    localStorage.setItem('users', JSON.stringify(users)); // Lưu danh sách người dùng vào localStorage

    // Thông báo đăng ký thành công
    alert('Đăng ký thành công!');
});
