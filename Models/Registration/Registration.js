// function validateForm() {
//     let userName = document.getElementById("userName");
//     let password = document.getElementById("password");
//     let confirmPassword = document.getElementById("confirmPassword")
//     let phoneNumber = document.getElementById("phoneNumber");
//     let email = document.getElementById("email");
//     let submitButton = document.getElementById("registerBtn");
//     if (userName === "" || email === "" || password === "" || confirmPassword === "" || phoneNumber === "") {
//         alert("Vui lòng điền đầy đủ thông tin.");
//         return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert("Địa chỉ email không hợp lệ.");
//         return false;
//     }

//     // Kiểm tra độ dài mật khẩu
//     if (password.length < 6) {
//         alert("Mật khẩu phải có ít nhất 6 ký tự.");
//         return false;
//     }

//     // So sánh mật khẩu
//     if (password !== confirmPassword) {
//         alert("Mật khẩu không trùng khớp.");
//         return false;
//     }

//     // Kiểm tra định dạng số điện thoại (ví dụ: số điện thoại Việt Nam)
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//         alert("Số điện thoại không hợp lệ.");
//         return false;
//     }



//     return true;
// }


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

    // Kiểm tra độ mạnh của mật khẩu (bạn có thể tùy chỉnh regex này)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordRegex.test(password)) {
        alert('Mật khẩu phải có ít nhất 6-12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        return;
    }

    // Kiểm tra định dạng email (bạn có thể sử dụng thư viện để kiểm tra chính xác hơn)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Địa chỉ email không hợp lệ.');
        return;
    }

    // Kiểm tra số điện thoại (bạn có thể tùy chỉnh regex theo định dạng số điện thoại mong muốn)
    const phoneNumberRegex = /^\d{10}$/; // Ví dụ: kiểm tra số điện thoại 10 chữ số
    if (!phoneNumberRegex.test(phoneNumber)) {
        alert('Số điện thoại không hợp lệ.');
        return;
    }

    localStorage.setItem('userName', userName);

    localStorage.setItem('email', email);

    // Nếu tất cả các điều kiện đều đúng, thực hiện đăng ký (ở đây chúng ta chỉ hiển thị thông báo)
    alert('Đăng ký thành công!');

    // Gửi dữ liệu lên server để xử lý đăng ký (nếu cần)
    // Ví dụ: sử dụng fetch hoặc XMLHttpRequest
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            password,
            email,
            phoneNumber
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Đã xảy ra lỗi khi đăng ký.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Đăng ký thành công:', data);
        })
        .catch(error => {
            console.error('Lỗi khi đăng ký:', error);
        });

});