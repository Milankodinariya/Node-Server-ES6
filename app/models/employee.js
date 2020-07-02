const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

let EmployeeSchema   = new Schema({
        employeeId: String,
        employeeName: String,
        dateOfJoin:  String,
        designation: Number,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
