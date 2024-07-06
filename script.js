document.addEventListener("DOMContentLoaded", function() {
    // Ensure the user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Load passwords on page load
    loadPasswords();

    // Add event listener to the form
    document.getElementById('password-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addPassword();
    });
});

// Retrieve passwords from local storage and display them
function loadPasswords() {
    const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];
    const tableBody = document.getElementById('password-list');
    tableBody.innerHTML = '';

    passwordList.forEach((password, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${password.application}</td>
            <td>${password.email}</td>
            <td>${password.password}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit" onclick="editPassword(${index})">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete" onclick="deletePassword(${index})">Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add a new password
function addPassword() {
    const application = document.getElementById('application').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if (application && email && password) {
        const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];
        passwordList.push({ application, email, password });
        localStorage.setItem('passwordList', JSON.stringify(passwordList));
        loadPasswords();
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

// Clear form fields
function clearForm() {
    document.getElementById('application').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pass').value = '';
}

// Edit password
function editPassword(index) {
    const passwordList = JSON.parse(localStorage.getItem('passwordList'));
    const password = passwordList[index];
    document.getElementById('application').value = password.application;
    document.getElementById('email').value = password.email;
    document.getElementById('pass').value = password.password;
    deletePassword(index);
}

// Delete password
function deletePassword(index) {
    const passwordList = JSON.parse(localStorage.getItem('passwordList'));
    passwordList.splice(index, 1);
    localStorage.setItem('passwordList', JSON.stringify(passwordList));
    loadPasswords();
}

// Logout function
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'login.html';
}
