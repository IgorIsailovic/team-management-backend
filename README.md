<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">

  <h1 align="center">Team management backend app</h3>

  <p align="center">
    The backend part of the team management project
    <br />
  </p>
  <p align="center">


</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#📝-about-the-project"> 📝 About The Project</a>
    </li> 
        <li><a href="#🛠️-built-with"> 🛠️ Built With</a></li>  
    <li> <a href="#✅-features"> ✅ Features</a></li> 
        <li><a href="#▶️-installation"> ▶️ Installation</a></li>
    <li><a href="#📧-contact"> 	📧 Contact</a></li>
  
  </ol>
</details>
</br>
</br>

## 📝 About The Project

Backend app of the team management project. The project represents a full stack app for managing Teams, Tasks and Users of an organization.

### RESTful API

Spring boot application that communicates with its frontend counterpart as well as the database.

### CRUD

App uses JPA to store data into PostgreSQL database.

### Database

PostgreSQL database in development is run as a docker image using a docker compose file wich is a part of this repository (compose.yml).
Demo app witch is hosted on Heroku is communicating with a PostgreSQL database hosted on AWS.

### Security and Authentication

App uses spring security with jwt token for authentication. Unauthorized Users can acces only two endpoints: /users/signin and /users/signup. For every other endpoint user has to be authenticated using the jwt token that was acquired during singin.

There are two types of users/user roles "User" and "Team Leader". Team leader has the authority to access all endpoints thus execute all CRUD operations. Useres with the User role have limited authority and can not access all endpoints.

## 🛠️ Built With

Backend part of the project is built with Java and Spring with a postgreSQL database.

[![java]][java-url]
[![spring]][spring-url]
[![postgresql]][postgresql-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## ✅ Features

### User CRUD:

- Sign in.

- Sign up.

- Get all Users

- Get one user by name

- Get one user by id

- Delete user

- Add user to a team

- Assign a task to a user

- Update user passowrd

- Get all users for the specific team

- Get all users for the specific task

### Team CRUD:

- Get all teams

- Get team by name

- Get team by id

- Add a team

- Update a team

- Delete a team

- Get all teams for the specific User

- Get all teams for the specific task

### Task CRUD:

- Get all task

- Get task by id

- Get all tasks for the specific user(id)

- Get all tasks for the specific user(name)

- Get all tasks for the specific team

- Change task status

- Add a task

- Update a task

- Delete a task

## ▶️ Installation

1. Clone the repo

```sh
git clone https://github.com/IgorIsailovic/team-management-backend.git
```

2. Initalize the database

Make sure navigate to the folder that contains compose.yml file.

From there run the commands below

- docker-compose

```sh
docker-compose up
```

```sh
docker-compose start
```

With that PostgreSQL db is started localy. DB admin username and password as well as other parameters are contained in the compose.yml file.

- aplication.properties

Make sure that that the database connection part of this file looks like this:

```yml
spring.jpa.hibernate.ddl-auto=create
spring.sql.init.mode=always
spring.sql.init.platform=postgres
spring.datasource.url=jdbc:postgresql://localhost:5432/test_db
spring.datasource.username=root
spring.datasource.password=root
```

Note that spring.jpa.hibernate.ddl-auto should only be set to create the first time the app is run. After that either set it to none or comment the line.

3. Rebuild the project
   ```sh
   mvn clean package
   ```
4. Start the app

   ```sh
   java -jar target/TeamManagement-0.0.1-SNAPSHOT.jar
   ```

5. Inital users
<div align="center">
<table class="tg">
<thead>
  <tr>
    <th class="tg-baqh" colspan="3">Demo users</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh">Role</td>
    <td class="tg-baqh">Team Leader</td>
    <td class="tg-baqh">Team Leader</td>
  </tr>
  <tr>
    <td class="tg-baqh">username</td>
    <td class="tg-baqh">Max</td>
    <td class="tg-baqh">Lynda</td>
  </tr>
  <tr>
    <td class="tg-baqh">password</td>
    <td class="tg-baqh">Max123!</td>
    <td class="tg-baqh">Lynda123!</td>
  </tr>
</tbody>
</table>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

## 📧 Contact

Your Name - iigorisailovic@gmail.com - https://www.linkedin.com/in/igor-isailovi%C4%87-9b00b7200/

Project Link: [https://github.com/IgorIsailovic/team-management-backend](https://github.com/IgorIsailovic/team-management-backend)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/igor-isailovi%C4%87-9b00b7200/
[java]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[spring]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[java-url]: https://www.java.com/en/
[spring-url]: https://spring.io/
[postgresql-url]: https://www.postgresql.org/
