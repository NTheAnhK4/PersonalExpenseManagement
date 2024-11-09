const logInLink = document.getElementById('logInLink');
const registerLink = document.getElementById('registerLink');
const currentForm =  document.getElementById('homepage');
document.addEventListener('DOMContentLoaded', () => {
    if(IsLogin()) showLoggedInState(currentUser.userName);
});
function showLoggedInState(userName) {  
    logInLink.textContent = userName;
    logInLink.href = '../../Views/UserStatus/UserStatus.html'; 
    registerLink.textContent = 'Đăng xuất';
    registerLink.href = '../../Views/HomePage/HomePage.html';
    
    registerLink.onclick = () => {
        localStorage.removeItem('loggedInUser');
        SetUserLogout();
        alert('Đã đăng xuất');
        location.reload(); 
    };
}