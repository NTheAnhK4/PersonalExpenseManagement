const usernameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const logInBtn = document.getElementById('logInBtn');

if (logInBtn) {
    logInBtn.onclick = () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kiểm tra thông tin đăng nhập
        const user = users.find(user => user.userName === username && user.password === password);

        if (user) {
            alert('Đăng nhập thành công');
            SetUserLogin(user); // Hàm này bạn có thể định nghĩa để lưu trạng thái đăng nhập
            window.location.href = '../../Views/HomePage/HomePage.html';
        } else {
            alert('Thông tin đăng nhập không đúng');
        }
    };
}
