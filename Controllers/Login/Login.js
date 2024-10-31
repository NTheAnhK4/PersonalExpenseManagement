
const username = document.getElementById('userName')
        const password = document.getElementById('password')
        const logInBtn =document.getElementById('logInBtn')
    
        if(logInBtn){
            logInBtn.onclick=()=>{
                users.forEach((user,index)=>{
                    if(user.password!==password.value||user.username!==username.value){
                        alert('Thông tin đăng nhập không đúng')
                    }
                    else{
                        alert('Đăng nhập thành công')
                        SetUserLogin(user);
                        //username: john
                        //password:123
                        window.location.href = '../../Views/HomePage/HomePage.html'
                    }
                })
            }
        }
       