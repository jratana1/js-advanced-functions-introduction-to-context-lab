// Your code here
let createEmployeeRecord = function(array){
    return {firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, dateStamp){
    let obj = {type: "TimeIn",
                hour: parseInt(dateStamp.split(" ")[1]),
                date: dateStamp.split(" ")[0]
    }

    record.timeInEvents.push(obj)

    return record
}

function createTimeOutEvent(record, dateStamp){
    let obj = {type: "TimeOut",
                hour: parseInt(dateStamp.split(" ")[1]),
                date: dateStamp.split(" ")[0]
    }

    record.timeOutEvents.push(obj)

    return record
}
function hoursWorkedOnDate(record, dateStamp){
    let work = record.timeOutEvents.find(function(e){ return e.date === dateStamp})

    if (work){
        return (work.hour - record.timeInEvents.find(function(e){return e.date === dateStamp}).hour)/100
    }
    else{
    return 0
    }
}

function wagesEarnedOnDate(record, dateStamp){
    return hoursWorkedOnDate(record, dateStamp)*record.payPerHour
}

function allWagesFor(record){
    return record.timeInEvents.map(function(e){return wagesEarnedOnDate(record,e.date)}).reduce(function(last, current){return last +current})
}

function calculatePayroll(array){
    return array.map(allWagesFor).reduce(function(last, current){return last +current})
}

function findEmployeeByFirstName(array, name){
    return array.find(function(e){return e.firstName === name})
}