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

App uses JPA to store data in PostgreSQL database.

### Database

Database is an integrated H2 db.

### Security and Authentication

App uses spring security with jwt token for authentication. Unauthorized Users can access only two endpoints: /users/signin and /users/signup. For every other endpoint user has to be authenticated using the jwt token that was acquired during signin.

There are two types of users/user roles "User" and "Team Leader". Team leader has the authority to access all endpoints and thus execute all CRUD operations. Users with the User role have limited authority and can not access all endpoints.

## 🛠️ Built With

The backend part of the project is built with Java and Spring with a PostgreSQL database.

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

- Update user password

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

2. Initialize the database

Database is initialized when the app is started.


3. Rebuild the project
   ```sh
   mvn clean package
   ```
4. Start the app

   ```sh
   java -jar target/TeamManagement-0.0.1-SNAPSHOT.jar
   ```

5. Initial users
<div align="center">
<table class="tg">
<thead>
  <tr>
    <th class="tg-baqh" colspan="6">Demo users</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-baqh">Role</td>
    <td class="tg-baqh">Team Leader</td>
    <td class="tg-baqh">Team Leader</td>
    <td class="tg-baqh">User</td>
    <td class="tg-baqh">User</td>
    <td class="tg-baqh">User</td>
  </tr>
  <tr>
    <td class="tg-baqh">username</td>
    <td class="tg-baqh">max</td>
    <td class="tg-baqh">lynda</td>
    <td class="tg-baqh">jim</td>
    <td class="tg-baqh">marta</td>
    <td class="tg-baqh">melinda</td>
  </tr>
  <tr>
    <td class="tg-baqh">password</td>
    <td class="tg-baqh">Max123!</td>
    <td class="tg-baqh">Lynda123!</td>
    <td class="tg-baqh">Jim123!</td>
    <td class="tg-baqh">Marta123!</td>
    <td class="tg-baqh">Melinda123!</td>
  </tr>
</tbody>
</table>
</div>


<p align="right">(<a href="#top">back to top</a>)</p>

## 📧 Contact

Your Name - iigorisailovic@gmail.com - https://www.linkedin.com/in/igorisailovic/

Project Link: [https://github.com/IgorIsailovic/team-management-backend](https://github.com/IgorIsailovic/team-management-backend)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/igorisailovic/
[java]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[spring]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[java-url]: https://www.java.com/en/
[spring-url]: https://spring.io/
[postgresql-url]: https://www.postgresql.org/
