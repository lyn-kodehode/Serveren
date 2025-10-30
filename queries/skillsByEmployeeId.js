const db = require("../database");

function getSkillsByEmployeeId(employeeId) {
  return db
    .prepare(
      `
            SELECT skills.name AS skill
            FROM empployee_skills
            INNER JOIN skills ON empployee_skills.skill_id = skills.id
            WHERE empployee_skills.employee_id = ?
        `
    )
    .all(employeeId);
}

module.exports = getSkillsByEmployeeId;
