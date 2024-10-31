document.getElementById('userInfoForm').onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const index = currentUser.userId - 1;
    updateUser(index, name,password,email,phone);
    document.getElementById('message').textContent = 'Thông tin đã được cập nhật!';
    SetUserLogout();
    window.location.href = '../../Views/HomePage/HomePage.html';
};

