INSERT INTO department (name)
VALUES 
    ('Management'),
    ('Development'),
    ('Maintenance'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 600000, 1),
    ('Engineer', 250000, 2),
    ('Intern', 30000, 3),
    ('Consultant', 400000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Bob', 'The-Intern', 3, 1),
    ('Paul', 'Rudd', 4, 1),
    ('Jason', 'Segel', 4, 1),
    ('Megan', 'Henning', 2, 1),
    ('Tori', 'Mason', 2, 1),
    ('Rachel', 'Solov', 2, 1),
    ('Brad', 'Pitt', 1, NULL),
    ('Leonardo', 'DiCaprio', 4, 1);