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
    let costAsString = totalMonthlyCost.toFixed(2);

    // Adds commas every three numbers starting from decimal
    let costWithSymbols = costAsString.split(/(?=(?:\d{3})+\.)/).join(",");
    $('#monthlyCost').append(`$${costWithSymbols}`);
}

function addEmployee () {
    // Salary defaults to '0.00' if no value, non-number, or negative entered
    let salary = $('#salary').val().replace('$', '').replace(/,/g, '');
    if (!Number(salary) || salary.indexOf('-') > -1){
        salary = '0.00';
    }

    // Rounds salary and returns as string
    salary = Number(salary).toFixed(2);

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