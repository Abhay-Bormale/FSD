function login(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === "admin@gmail.com" && password === "123456"){
        alert("Login Successful!");
        window.location.href = "shop.html";
    } else {
        alert("Invalid credentials!");
    }
}
