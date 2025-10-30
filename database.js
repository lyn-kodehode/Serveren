const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "database", "companyEmployees.sqlite");
const db = new Database(dbPath, { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS employees 
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    job_title TEXT NOT NULL
  )`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS projects
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    project_name TEXT NOT NULL,
    deadline TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
  )
  `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS skills
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )
  `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS empployee_skills
  (
    employee_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    PRIMARY KEY (employee_id, skill_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
  )
  `
).run();

db.prepare(
  `
    CREATE INDEX IF NOT EXISTS idx_projects_employee_id
    ON projects (employee_id)
  `
).run();

db.prepare(
  `
    CREATE INDEX IF NOT EXISTS idx_empployee_skills_employee_id
    ON empployee_skills (employee_id)
  `
).run();

db.prepare(
  `
     CREATE INDEX IF NOT EXISTS idx_projects_project_name
    ON projects (project_name)
  `
).run();

console.log("Table created");

db.prepare(
  `
    CREATE INDEX IF NOT EXISTS idx_skills_name
    ON skills (name)
  `
).run();

module.exports = db;

// in sqlite

/* 

1	meme creation
2	procrastination
3	overthinking
4	somersault

I

*/

/* 
INSERT INTO employee_skills (employee_id, skill_id) VALUES (42, 1);
INSERT INTO employee_skills (employee_id, skill_id) VALUES (10,4);
INSERT INTO employee_skills (employee_id, skill_id) VALUES (42, 4);
*/
