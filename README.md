# Rootine backend API

Our SOC final project, Rootine, is a habit-tracking app that we’re developing in React. This is the back-end API that links the Rootine front end to the database, which stores information about the `users` of the app, their `habits`, and the habit tracking component(`calendar`).

<br>

# Data Structure

User Table in the database is an table with the following columns:

```sql
        user_id TEXT NOT NULL,
        username TEXT,
        PRIMARY KEY(user_id)
```

-   The user table is connected to the habits table through the user_id.

<br>

Habits Table in the database is an table with the following columns:

```sql
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        description TEXT,
        userId TEXT NOT NULL,
        everyday BOOLEAN,
        frequency_reps SMALLINT,
        frequency_interval FREQ_OPTIONS,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

-   The habit table is connected to the calendar table through the habit_id.

Calendar Table in the database is an table with the following columns:

```sql
      habit_id INT NOT NULL,
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status STATUS_OPTIONS,
      PRIMARY KEY (habit_id, date)
```

## How to use the API - REST API Routes

<br>
<details>
<summary>User Routes:</summary>

1. To GET all users: https://status418-project.herokuapp.com/user

2. To GET users by user_id: https://status418-project.herokuapp.com/user_id

3. To POST a new user: https://status418-project.herokuapp.com/user

4. To PATCH an exisiting user by user_id: https://status418-project.herokuapp.com/user_id

5. To DELETE an existing user by user_id: https://status418-project.herokuapp.com/user_id
 </details>
 <br>
 <details>
 <summary>Habits Routes:</summary>

6. To GET all habits: https://status418-project.herokuapp.com/habits

7. To GET all habits by habit id: https://status418-project.herokuapp.com/habits/id

8. To GET all habits by user_id: https://status418-project.herokuapp.com/habits?user_id=

9. To POST a new habit: https://status418-project.herokuapp.com/habits

10. To PUT an exisiting habit by habit id: https://status418-project.herokuapp.com/habits/id

11. To PATCH an existing habit name and description by habit id: https://status418-project.herokuapp.com/habits/id

12. To DELETE an exisiting habit by habit id: https://status418-project.herokuapp.com/habits/id
</details>
<br>
<details>
<summary>Calendar Routes:</summary>

13. To GET specific habitItem by habit_id and date: https://status418-project.herokuapp.com/calendar/id?date=

14. To POST a new calendar entry: https://status418-project.herokuapp.com/calendar

15. To PATCH an existing habitItem's status: https://status418-project.herokuapp.com/calendar/id?date=

16. To DELETE all habitItems by habit_id: https://status418-project.herokuapp.com/calendar/id
</details>
<br>

## How to reset the db

### User:

dbResetUser is a script included in the package.json
To reset the database write into your terminal:

```bash
npm dbResetUser
```

This script includes the path of the delete, create and populate user files.

<br>

### Habits:

dbResetHabits is a script included in the package.json
To reset the database write into your terminal:

```bash
npm dbResetHabits
```

This script includes the path of the delete, create and populate habits files.

<br>

### Calendar:

dbResetCalendar is a script included in the package.json
To reset the database write into your terminal:

```bash
npm dbResetCalendar
```

This script includes the path of the delete, create and populate calendar files.

<br>

## Environment Variables:

To run this project, you will need to add the following environment variables to your .env file:

`PG_URL`

`PORT`

You can use Heroku credentials in the .env file to link to the external database.

## Tests

What are they testing for, i.e. what can you be sure will be OK if the tests pass

<br>

<details>
<summary>Routes/user.test.js:</summary>
 
1. To test if the get request will return all users successfully. The test will check if the response.body includes the correct properties and primitive data type in the user object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

2. To test if the get request will return a specific user by the user_id. The test will check if the response.body includes the correct properties and primitive data type in the user object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

3. To test if the post request will create a new user from Auth0. The test will check if the response.body includes the correct properties and primitive data type in the user object. The test will also check if the response.body format is JSON. A successful post request test will return a 202 status code.

4. To test if the patch request will update the username of a specific user by the user_id. The test will also check if the response.body format is JSON. A successful patch request test will return a 202 status code.

5. To test if the delete request will delete a specific user by the user_id. A successful delete request test will return a 200 status code or 500 status code if unsuccessful.
 </details>
 <br>
 <details>
 <summary>Routes/habits.test.js:</summary>

6. To test if the get request returns all the habits successfully. The test will check if the response.body includes the correct properties and primitive data type in the habit object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

7. To test if the get request will return a specific habit by habit id. The test will check if the response.body includes the correct properties and primitive data type in the habits object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

8. To test if the get request will return all habits by user_id. The test will check if the response.body includes the correct properties and primitive data type in the habits object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

9. To test if the post request will create a new habit. The test will check if the response.body includes the correct properties and primitive data type in the habit object. The test will also check if the response.body format is JSON. A successful post request test will return a 201 status code.

10. To test if the put request will make a full update on an exisiting habit by habit id.The test will check if the response.body includes the correct properties and primitive data type in the habit object. The test will also check if the response.body format is JSON. A successful put request test will return a 200 status code.

11. To test if the patch request will update an exisiting habit name by habit id. The test will also check if the response.body format is JSON. A successful patch request test will return a 202 status code.

12. To test if the patch request will update an exisiting habit description by the habit id. The test will also check if the response.body format is JSON. A successful patch request test will return a 202 status code.

13. To test if the delete request will delete a specific habit by habit id. A successful delete request test will return a 200 status code.
</details>
<br>
<details>
<summary>Routes/calendar.test.js:</summary>

14. To test if the get request returns all habit items by habit id successfully. The test will also check if the response.body format is JSON. It will also check if the response.body includes the correct properties and primitive data type in the calendar object. A successful get request test will return a 200 status code.

15. To test if the get request returns all habit items by habit id and date. The test will check if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check if the response.body format is JSON. A successful get request test will return a 200 status code.

16. To test if the post request will add a new calendar entry. The test will check if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check if the response.body format is JSON. A successful post request test will return a 201 status code.

17. To test if the patch request updates the status from incomplete to either complete, miss or fail by id and date query. The test will check if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check if the response.body format is JSON. A successful patch request test will return a 202 status code.

18. To test if the delete request deletes all calendar enteries for a habit by habit id.The test will check if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check if the response.body format is JSON. A successful delete request test will return a 200 status code.
</details>
<br>

## Languages, Tools & Websites used:
<br>
<a href="https://miro.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/miro-2.svg" alt="miro" width="40" height="40"/> </a>
<a href="https://www.trello.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/trello/trello-icon.svg" alt="trello" width="40" height="40"/> </a>
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> 
<a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/gilbarbara/logos/11f54bac1b6dfad2cbd1c6da9f2245ec8b5ea22b/logos/postman-icon.svg" alt="postman" width="40" height="40"/> </a>
<a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>

<br> 

## Authors

-   [Bushra Fatima](https://github.com/BushraFatimaBF)
-   [Hannah McFarlane](https://github.com/hcmcfarlane)
-   [Idman Abshir](https://github.com/idman01)
-   [Mordecai Oladimeji](https://github.com/MordecaiO)
-   [Robert Angelitud](https://github.com/m4tchka)
-   [Samantha Wu](https://github.com/syywu)
