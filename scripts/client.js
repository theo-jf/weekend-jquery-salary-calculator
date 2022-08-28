// TODO:
// Array of employee objects
// Employee array displayed on loop
// Table
// Add up employee salaries, make total turn red if > $20,000
// Listener that checks for delete button presses from parent list
// Then delete that employee from the array

// Stretch goal is to remove a deleted employee's salary from the total
// Wahoo! You know how to do this already! 


//BUG!!!! if you delete and then re-add employee of same value;
// Add three or more monies of same value
// Delete one of them
// Add it again
// No append, but cost increases
// Happens with any value

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
            <td class="tableData">${employee.first}</td>
            <td class="tableData">${employee.last}</td>
            <td class="tableData">${employee.id}</td>
            <td class="tableData">${employee.title}</td>
            <td id="employeeSalary" class="tableData">$${employee.salary.split(/(?=(?:\d{3})+\.)/).join(",")}</td>
            <td class="tableData delete"><button id="delete">Delete</button></td>
        </tr>
        `);
    }
}

function displayCost(change) {
    // Alters monthly cost if cost entered
    if (change) {
        totalMonthlyCost += change;
    }
    (totalMonthlyCost > 20000) ? $('#monthlyCost').css('color', 'red') : $('#monthlyCost').css('color', 'black')
    $('#monthlyCost').empty();
    let costAsString = totalMonthlyCost.toString();
    if (costAsString.indexOf('.') === -1) {
        costAsString += '.00'; // Re-adds '.00's lost to math on line 51
    }
    let costWithSymbols = costAsString.split(/(?=(?:\d{3})+\.)/).join(",");
    $('#monthlyCost').append(`$${costWithSymbols}`);
}

function addEmployee () {
    // Salary defaults to '0.00' if no value or non-number entered
    let salary = $('#salary').val().replace('$', '').replace(/,/g, '');
    if (!Number(salary) || salary.indexOf('-') > -1){
        salary = '0.00';
    }
    // Adds '.00' to the end of salary string if no decimals entered or if decimals value to zero
    if ((salary).split('.')[1] == 0 || (salary).split('.')[1] === undefined) {
        salary *= 1; // Removes any decimal places
        salary += '.00'; // Converts back to string
    } else if ((salary).split('.')[1] === '' && Number(salary)) {
        salary += '00'; // Adds '00' if entered salary ends with only a decimal
    }

    // Rounds salary and returns as string
    salary = Number(salary).toFixed(2);
    // console.log(salary);
    // console.log(typeof(salary));

    let employee = {
        first: $('#firstName').val(),
        last: $('#lastName').val(),
        id: $('#id').val(),
        title: $('#title').val(),
        salary: salary
    }

    employees.push(employee);
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#title').val('');
    $('#salary').val('');
    displayCost(parseFloat(employee.salary));
    displayEmployees();
}

function deleteEmployee() {
    let employeeToRemoveData = $(this).closest('#employeeData');
    let employeeToRemove = {
        first: employeeToRemoveData.find('td:eq(0)').text(),
        last: employeeToRemoveData.find('td:eq(1)').text(),
        id: employeeToRemoveData.find('td:eq(2)').text(),
        title: employeeToRemoveData.find('td:eq(3)').text(),
        salary: employeeToRemoveData.find('td:eq(4)').text().replace('$', '').replace(/,/g, '')
    }

    for (let employee of employees) {
        if (JSON.stringify(employee) === JSON.stringify(employeeToRemove)) {
            console.log(employee);
            let placement = employees.indexOf(employee);
            if (placement > -1) {
                employees.splice(placement, 1);
            }
            break;
        }
    }
    displayCost(-Number(employeeToRemove.salary));
    $(this).closest('#employeeData').remove();
}