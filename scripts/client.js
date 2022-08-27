// TODO:
// Array of employee objects
// Employee array displayed on loop
// Table
// Add up employee salaries, make total turn red if > $20,000
// Listener that checks for delete button presses from parent list
// Then delete that employee from the array

// Stretch goal is to remove a deleted employee's salary from the total
// Wahoo! You know how to do this already! 

let employees = [];
let totalMonthlyCost = 0;
$(readyNow);

function readyNow() {
    displayEmployees();
    displayCost();

    $('#submit').on('click', addEmployee);
    $('#employeeTable').on('click', '#delete', deleteEmployee);
}

function displayEmployees() {
    $('#employeeTable').empty();
    for (let employee of employees) {
        $('#employeeTable').append(`
        <tr id="employeeData">
            <td>${employee.first}</td>
            <td>${employee.last}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td id="employeeSalary">${employee.salary}</td>
            <td><button id="delete">Delete</button></td>
        </tr>
        `);
    }
}

function displayCost(change) {
    if (change) {
        totalMonthlyCost += change;
    }
    (totalMonthlyCost > 20000) ? $('#monthlyCost').css('color', 'red') : $('#monthlyCost').css('color', 'black')
    $('#monthlyCost').empty();
    $('#monthlyCost').append(`${totalMonthlyCost}`);
}

function addEmployee () {
    let employee = {
        first: $('#firstName').val(),
        last: $('#lastName').val(),
        id: $('#id').val(),
        title: $('#title').val(),
        salary: $('#salary').val()
    }
    employees.push(employee);
    displayCost(Number(employee.salary));
    displayEmployees();
}