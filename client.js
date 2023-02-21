const loginWdsBtn = document.getElementById("login-wds");
const loginNikBtn = document.getElementById("login-nik");
const loginAdaBtn = document.getElementById("login-ada");
const adminBtn = document.getElementById("admin");
const responseDiv = document.getElementById("response");

loginWdsBtn.addEventListener("click", () => {
    login("WDS")
})
loginNikBtn.addEventListener("click", () => {
    login("Nik")
})
loginAdaBtn.addEventListener("click", () => {
    login("Adarsh")
})

adminBtn.addEventListener("click", () => {
    fetch("http://localhost:8000/adminData", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.text())
    .then(data => (responseDiv.textContent = data))
})

function login(username){
    fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    })
    .then(res => res.text())
    .then(data => (responseDiv.textContent = data))
}