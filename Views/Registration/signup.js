// validation form register and register user local storage
function register(event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const registerData = {
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber,
    };
    fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("thong bao thanh cong!");

        })
        .catch((error) => console.log(error.message));


}

const formRegister = document.getElementById("form-container");
if (formRegister) {
    formRegister.addEventListener("submit", register);
}

// validation form register and register user local storage

