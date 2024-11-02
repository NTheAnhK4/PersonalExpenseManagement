
const username = document.getElementById('userName')
        const password = document.getElementById('password')
        const logInBtn =document.getElementById('logInBtn')
    
        if(logInBtn){
            
            logInBtn.onclick=()=>{
                let isValidUser = false;
                users.forEach((user,index)=>{
                    if (user.password === password.value && user.username === username.value) {
                        isValidUser = true;
                        alert('Đăng nhập thành công');
                        SetUserLogin(user);
                        window.location.href = '../../Views/HomePage/HomePage.html';
                    }
                })
                if (!isValidUser) {
                    alert('Thông tin đăng nhập không đúng');
                }
            }
        }
       