document.addEventListener("DOMContentLoaded", loadTable);

function Submit() {
    var dataEntered = retrieveData();
    if (dataEntered) {
        addDataToLocalStorage(dataEntered);
        insert(dataEntered);
        document.getElementById("password-form").reset();
    }
}

// Create operation: Retrieving data from form 
function retrieveData() {
    var application = document.getElementById("application").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (application && email && pass) {
        return { application, email, pass };
    } else {
        alert("All fields are required.");
        return null;
    }
}

// Read data from local storage and add it to the table
function loadTable() {
    var storedData = JSON.parse(localStorage.getItem("passwords")) || [];
    storedData.forEach(data => insert(data));
}

// Insert new data into the table
function insert(data) {
    var table = document.getElementById("password-list");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = data.application;
    cell2.innerHTML = data.email;
    cell3.innerHTML = data.pass;
    cell4.innerHTML = `<a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                       <a href="#" class="btn btn-danger btn-sm delete">Delete</a>`;

    cell4.querySelector(".edit").addEventListener("click", function () {
        editEntry(row, data);
    });

    cell4.querySelector(".delete").addEventListener("click", function () {
        deleteEntry(row, data.application);
    });
}

// Add data to local storage
function addDataToLocalStorage(data) {
    var storedData = JSON.parse(localStorage.getItem("passwords")) || [];
    storedData.push(data);
    localStorage.setItem("passwords", JSON.stringify(storedData));
}

// Edit entry
function editEntry(row, oldData) {
    var newApplication = prompt("Enter new application name:", oldData.application);
    var newEmail = prompt("Enter new email:", oldData.email);
    var newPass = prompt("Enter new password:", oldData.pass);

    if (newApplication && newEmail && newPass) {
        var storedData = JSON.parse(localStorage.getItem("passwords")) || [];
        var index = storedData.findIndex(data => data.application === oldData.application);

        if (index !== -1) {
            storedData[index] = { application: newApplication, email: newEmail, pass: newPass };
            localStorage.setItem("passwords", JSON.stringify(storedData));

            row.cells[0].innerHTML = newApplication;
            row.cells[1].innerHTML = newEmail;
            row.cells[2].innerHTML = newPass;
        }
    } else {
        alert("All fields are required.");
    }
}

// Delete entry
function deleteEntry(row, application) {
    var storedData = JSON.parse(localStorage.getItem("passwords")) || [];
    storedData = storedData.filter(data => data.application !== application);
    localStorage.setItem("passwords", JSON.stringify(storedData));
    row.remove();
}