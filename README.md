<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
      <a href="#dependencies">Dependencies</a>
    </li>
    <li>
      <a href="#database-prep">Database Prep</a>
    </li>
    <li>
      <a href="#development">Development</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>

  </ol>
</details>

## About The Project

<strong>Task Mates App</strong> is a web-based platform designed to streamline task management and coordination among cohabitants. It simplifies the process of assigning, tracking, and completing tasks within a shared living space, promoting harmony and efficiency among users.

`https://github.com/rorogab/TaskMates`

## Features

- User-Friendly Interface: An intuitive and user-friendly interface that makes task sharing and management a breeze.

- Task Assignment: Assign tasks to specific users; add task descriptions for clarity; mark tasks as done.

## Feature features

- Real-Time Updates: Receive real-time notifications and updates when tasks are completed or modified.

- Task History: Maintain a history of completed tasks for reference and accountability.

- Responsive Design: Accessible on various devices, including smartphones, tablets, and desktops.

- Groups / Chat: Be able to create groups and have a virtual "home". Chat with roommates and recieve notifications.

- Bills: Manage bills and other flat expenses, everything shared with everyone from your "home".

## Tech Stack

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
- [![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
- [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
- [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
- [![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)]()
- [![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
- [![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)]()

## Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

## Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called task_mates: `CREATE DATABASE task_mates;`
- Add the `.env`, to containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=task_mates
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create the tables `tasks`, `users`and `bills` in your database.

  <img width="566" alt="Captura de pantalla DB" src="https://github.com/rorogab/TaskMates/assets/92514975/d4ea2408-3044-489e-b569-6e183cd309bb">

## Development

- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port localhost 5173.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
