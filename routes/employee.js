const express    = require('express');
const router = express.Router();
const Employee     = require('../app/models/employee');

router.post('/',  async (req, res, next) => {
  try {
    const employee = await new Employee({
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      dateOfJoin: req.body.dateOfJoin,
      designation: req.body.designation,
    });
    employee.save(function (err) {
      console.log('--err--' ,err)
      if (err)
        return  res.send(err);
      return res.status(200).json(employee);
    });
  } catch (e) {
    next(e);
  }
})

router.get('/',  async (req, res, next) => {
  try {
    const employee = await Employee.find(function(err, employee) {
      if (err)
      return  res.send(err);

    });
    return res.status(200).json(employee)
  } catch (e) {
    next(e);
  }
})

router.put('/:id',  async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id, function(err, employee) {

      if (err)
        return res.send(err);

      employee.employeeName = req.body.employeeName;
      employee.dateOfJoin = req.body.dateOfJoin;
      employee.designation = req.body.designation;

      employee.save(function(err) {
        if (err)
          return  res.send(err);
      });

    });
    return res.status(200).json(employee)
  } catch (e) {
    next(e);
  }
})

/*router.put('/:id', async (req, res, next) => {
  const { employee } = req.body;

  try {
    const { id } = req.params;
    const employee = await models.Employee.findOne({ where: { id } });

    await employee.update({
      employeeName: employee.employeeName,
      dateOfJoin: employee.dateOfJoin,
      designation: employee.designation
    });
    res.status(200).json(employee);
  } catch (e) {
    next(e);
  }
});*/

router.delete('/:id',  async (req, res, next) => {
  try {
    const employee = await Employee.remove({
      _id: req.params.id
    }, function(err, employee) {
      if (err)
        return res.send(err);
    });
    return res.status(200).json(employee)
  } catch (e) {
    next(e);
  }
})

module.exports = router;
