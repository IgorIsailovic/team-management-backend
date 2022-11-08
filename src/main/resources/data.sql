
INSERT INTO security_user(email,first_name, last_name, password, username) VALUES ('max.smith@gmail.com', 'Max', 'Smith','$2a$06$QNYchUqpVaQAFg.ugnPSnOALb4NHLQx2y2u1Ewng9yWvCTOK16FGe','max');
INSERT INTO security_user(email,first_name, last_name, password, username) VALUES ('lynda.vasquez@gmail.com', 'Lynda', 'Vasquez','$2a$06$ZSBNNgWQjfV2ydjhsHz5Oe.OkN4JPtUfmEvb4Qb/ABr6BCf80WUK.','lynda');
INSERT INTO security_user(email,first_name, last_name, password, username) VALUES ('jim.maxwell@gmail.com', 'Jim', 'Maxwell','$2a$06$tL5MB7/y4HIXz9zs/KNFweIlu43CYmFZC8Clc0MydIy3zkFhValPm','jim');
INSERT INTO security_user(email,first_name, last_name, password, username) VALUES ('marta.petrovich@gmail.com', 'Marta', 'Petrovich','$2a$06$Qn8MQqBDbCl6Dk7CwrLbv.xLyeaNOCjahyGQcIAh0bWfQk/cJ1rXC','marta');
INSERT INTO security_user(email,first_name, last_name, password, username) VALUES ('melinda.chavez@gmail.com', 'Melinda', 'Chavez','$2a$06$fFiA0yM9YMKHkU4q8EKoG.6ubOCuKiBV2zYrsMYE0bf6PF9oRptUu','melinda');

INSERT INTO security_role(description, role_name) VALUES ('Team Lead', 'Team Lead');
INSERT INTO security_role(description, role_name) VALUES ('User', 'User');

INSERT INTO user_role(user_id, role_id) VALUES (1,1);
INSERT INTO user_role(user_id, role_id) VALUES (2,1);
INSERT INTO user_role(user_id, role_id) VALUES (3,2);
INSERT INTO user_role(user_id, role_id) VALUES (4,2);
INSERT INTO user_role(user_id, role_id) VALUES (5,2);

INSERT INTO team(name) VALUES('Development');
INSERT INTO team(name) VALUES('IT Operations');
INSERT INTO team(name) VALUES('DevOps');
INSERT INTO team(name) VALUES('QA/Testing');
INSERT INTO team(name) VALUES('Security');

INSERT INTO team_user(team_id, user_id) VALUES(1,1);
INSERT INTO team_user(team_id, user_id) VALUES(2,1);
INSERT INTO team_user(team_id, user_id) VALUES(3,1);
INSERT INTO team_user(team_id, user_id) VALUES(4,2);
INSERT INTO team_user(team_id, user_id) VALUES(5,2);
INSERT INTO team_user(team_id, user_id) VALUES(2,2);
INSERT INTO team_user(team_id, user_id) VALUES(4,3);
INSERT INTO team_user(team_id, user_id) VALUES(5,3);
INSERT INTO team_user(team_id, user_id) VALUES(1,4);
INSERT INTO team_user(team_id, user_id) VALUES(2,5);

INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 1', 'Task demo description',2, 0, 1, 1, 1);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 2', 'Task demo description',1, 2, 0, 2, 2);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 3', 'Task demo description',55, 2, 2, 2, 2);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 4', 'Task demo description',7, 1, 1, 3, 2);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 5', 'Task demo description',1, 1, 1, 3, 1);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 6', 'Task demo description',2, 2, 2, 4, 2);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 7', 'Task demo description',2, 1, 2, 1, 2);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 8', 'Task demo description',1, 2, 1, 2, 1);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 9', 'Task demo description',1, 0, 1, 5, 1);
INSERT INTO task (name, description, est_dur, priority, status, team, reporter) VALUES('Task demo 10', 'Task demo description',2, 0, 2, 5, 2);

INSERT INTO task_user (task_id, user_id) VALUES(1, 1);
INSERT INTO task_user (task_id, user_id) VALUES(1, 2);
INSERT INTO task_user (task_id, user_id) VALUES(1, 3);
INSERT INTO task_user (task_id, user_id) VALUES(2, 2);
INSERT INTO task_user (task_id, user_id) VALUES(2, 3);
INSERT INTO task_user (task_id, user_id) VALUES(3, 1);
INSERT INTO task_user (task_id, user_id) VALUES(3, 3);
INSERT INTO task_user (task_id, user_id) VALUES(3, 4);
INSERT INTO task_user (task_id, user_id) VALUES(3, 5);
INSERT INTO task_user (task_id, user_id) VALUES(4, 4);
INSERT INTO task_user (task_id, user_id) VALUES(5, 5);
INSERT INTO task_user (task_id, user_id) VALUES(6, 4);
INSERT INTO task_user (task_id, user_id) VALUES(7, 1);
INSERT INTO task_user (task_id, user_id) VALUES(7, 3);
INSERT INTO task_user (task_id, user_id) VALUES(7, 5);
INSERT INTO task_user (task_id, user_id) VALUES(8, 1);
INSERT INTO task_user (task_id, user_id) VALUES(8, 2);
INSERT INTO task_user (task_id, user_id) VALUES(9, 1);
INSERT INTO task_user (task_id, user_id) VALUES(9, 2);
INSERT INTO task_user (task_id, user_id) VALUES(9, 3);
INSERT INTO task_user (task_id, user_id) VALUES(9, 4);
INSERT INTO task_user (task_id, user_id) VALUES(9, 5);
INSERT INTO task_user (task_id, user_id) VALUES(10, 3);
INSERT INTO task_user (task_id, user_id) VALUES(10, 4);
