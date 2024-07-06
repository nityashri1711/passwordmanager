function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        registeredUsers.push({ username, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        document.getElementById('register-msg').textContent = 'Registration successful. Please login.';
    } else {
        document.getElementById('register-msg').textContent = 'Please fill in all fields.';
    }
}
