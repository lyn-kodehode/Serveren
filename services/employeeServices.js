const db = require("../database");

function addEmployee({ first_name, last_name, job_title }) {
  const stmt = db.prepare(
    "INSERT INTO employees (first_name, last_name, job_title) VALUES (?, ?, ?)"
  );
  return stmt.run(first_name, last_name, job_title);
}

function getAllEmployees() {
  const stmt = db.prepare("SELECT * FROM employees");
  return stmt.all();
}

function getEmployeeById(id) {
  const stmt = db.prepare("SELECT * FROM employees WHERE id = ?");
  return stmt.get(id);
}

// function updateEmployee(id, { first_name, last_name, job_title }) {
function updateSingleEmployee(id, { first_name, last_name, job_title }) {
  const stmt = db.prepare(
    "UPDATE employees SET first_name = ?, last_name = ?, job_title = ? WHERE id = ?"
  );
  return stmt.run(first_name, last_name, job_title, id);
}

// function deleteEmployee(id){
function deleteSingleEmployee(id) {
  const stmt = db.prepare("DELETE FROM employees WHERE id = ?");
  return stmt.run(id);
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  //   updateEmployee,
  updateSingleEmployee,
  //   deleteEmployee,
  deleteSingleEmployee,
};
