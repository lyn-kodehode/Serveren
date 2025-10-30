const db = require("../database");

function getEmployeesWithSkills() {
  return db
    .prepare(
      `
            SELECT employees.first_name, employees.last_name, skills.name AS skill
            FROM employees
            INNER JOIN empployee_skills ON employees.id = empployee_skills.employee_id
            INNER JOIN skills ON empployee_skills.skill_id = skills.id
        `
    )
    .all();
}

module.exports = getEmployeesWithSkills;
