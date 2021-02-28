// Your code here
function createEmployeeRecord(array){
    let employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(array){
    let employees = []
    for( let i = 0; i < array.length; i++){
        employees.push(createEmployeeRecord(array[i]))
    }
    return employees
}

function createTimeInEvent(employee, dtString){
    employee.timeInEvents.push({
        type: "TimeIn",
        date: dtString.split(" ")[0],
        hour: parseInt(dtString.split(" ")[1],10)})

    return employee
}

function createTimeOutEvent(employee, dtString){
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: dtString.split(" ")[0],
        hour: parseInt(dtString.split(" ")[1],10)})

    return employee
}

function hoursWorkedOnDate(employee, d){
    let inEvent = employee.timeInEvents.find((e) => {
        return e.date === d
    })

    let outEvent = employee.timeOutEvents.find((e) => {
        return e.date === d
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour*hours
}

function allWagesFor(employee){
    let datesIn = employee.timeInEvents.map((e) => {
        return e.date
    })

    let payable = datesIn.reduce((bank, d) => {
        return bank + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce(function(bank, employee){
        return bank + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(employees, firstName){
    return employees.find((employee) => {
        return employee.firstName === firstName
    })
}