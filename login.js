function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-msg').textContent = 'Invalid username or password';
    }
}
