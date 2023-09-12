//createEmployeeRecord
    //Argument(s)
        //A 4-element Array of 3 Strings and 1 Number 
        //corresponding to a first name, family name, title, and pay rate per hour
    //Returns
        //JavaScript Object with keys:
            //firstName
            //familyName
            //title
            //payPerHour
            //timeInEvents
            //timeOutEvents
    //Behavior
        //Loads Array elements into corresponding Object properties. 
        //Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(stringNumberArray){
    return {
        firstName: stringNumberArray[0],
        familyName: stringNumberArray[1],
        title: stringNumberArray[2],
        payPerHour: stringNumberArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//createEmployeeRecords
    //Argument(s)
        //Array of Arrays
    //Returns
        //Array of Objects
    //Behavior
        //Converts each nested Array into an employee record using createEmployeeRecord, accumulates it to new Array
function createEmployeeRecords(arrayOfArray){
   let info = arrayOfArray.map(charactherInfo => createEmployeeRecord(charactherInfo))
   return info
}

//createTimeInEvent
    //Argument(s)
        //A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
    //Returns
        //The record that was just updated
    //Behavior
        //Add an Object with keys:
            //type: Set to "TimeIn"
            //hour: Derived from the argument
            //date: Derived from the argument
function createTimeInEvent(dateStamp){
    let additionalObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    this.timeInEvents.push(additionalObject)
    return this
}

//createTimeOutEvent
    //Argument(s)
        //A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
    //Returns
        //The record that was just updated
    //Behavior
        //Add an Object with keys:
            //type: Set to "TimeOut"
            //hour: Derived from the argument
            //date: Derived from the argument
function createTimeOutEvent(dateStamp){
    let newObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    this.timeOutEvents.push(newObj)
    return this
}

//hoursWorkedOnDate
    //Argument(s)
        //A date of the form "YYYY-MM-DD"
    //Returns
        //Hours worked, an Integer
    //Behavior
        //Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(soughtDate){
    let timeIn = this.timeInEvents.find(e => e.date === soughtDate)
    let timeOut = this.timeOutEvents.find(e => e.date === soughtDate)

    return (timeOut.hour - timeIn.hour)/100
}

//wagesEarnedOnDate
    //Argument(s)
        //A date of the form "YYYY-MM-DD"
    //Returns
        //Pay owed
    //Behavior
        //Using hoursWorkedOnDate, multiply hours by record's payRate to determine amount owed. 
        //Amount should be returned as a number.
function wagesEarnedOnDate(soughtDate){
    let wages = this.payPerHour * hoursWorkedOnDate.call(this, soughtDate)
    return parseInt(wages)
}

//allWagesFor
    //Argument(s)
        //None
    //Returns
        //Sum of pay owed to one employee for all dates, as a number
    //Behavior
        //Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow....
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date)
        
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
        
    return payable
}
// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

//findEmployeeByFirstName
    //Argument(s)
        //srcArray: Array of employee records
        //firstName: String representing a first name held in an employee record
    //Returns
        //Matching record or undefined
    //Behavior
        //Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(srcArray, firstName){
    let test = srcArray.find(char => char.firstName === firstName)
    return test
}

//calculatePayroll
    //Argument(s)
        //Array of employee records
    //Returns
        //Sum of pay owed for all employees for all dates, as a number
    //Behavior
        //Using allWagesFor for each employees, accumulate value of all dates worked by employee in record used as context. 
        //Amount should be returned as a number.
function calculatePayroll(employeeRecord){
    let totalPay = 0;
      
    employeeRecord.forEach((employee) => {
      employee.timeInEvents.forEach((timeInEvent) => {
        let pay = wagesEarnedOnDate.call(employee, timeInEvent.date);
        totalPay += pay;
      });
    });
  
    return totalPay;
}