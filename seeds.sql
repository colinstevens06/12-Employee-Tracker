
INSERT INTO departments (dept_name)
VALUES ("Marketing"), ("Graphic Design"), ("Web Development");

INSERT INTO roles (title, salary)
VALUES ("Marketing Manager", 60000)





CREATE TABLE departments (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(120) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  roles_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  salary INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (dept_id) 
     REFERENCES departments(dept_id)
);

CREATE TABLE employee (
   employee_id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(120) NOT NULL,
   last_name VARCHAR(120) NOT NULL,
   PRIMARY KEY (employee_id),
   FOREIGN KEY (roles_id)
      REFERENCES roles(roles_id)
)