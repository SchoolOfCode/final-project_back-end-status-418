# Rootine backend API

Our SOC final project, Rootine, is a habit-tracking app that we’re developing in React. This is the back-end API that links the Rootine front end to the database, which stores information about the `users` of the app, their `habits`, and the habit tracking component(`calendar`).

# Data Structure

User Table in the database is an object with the following properties:

        user_id TEXT NOT NULL,
        username TEXT,
        PRIMARY KEY(user_id)

- The user table is connected to the habits table through the user_id.

  Habits Table in the database is an object with the following properties:

        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        description TEXT,
        userId TEXT NOT NULL,
        everyday BOOLEAN,
        frequency_reps SMALLINT,
        frequency_interval FREQ_OPTIONS,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

- The habit table is connected to the calendar table through the habit_id.

Calendar Table in the database is an object with the following properties:

      habit_id INT NOT NULL,
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status STATUS_OPTIONS,
      PRIMARY KEY (habit_id, date)

## How to use the API, e.g. the paths to retrieve all, or perform keyword searches, etc.

User Routes:

1. To GET all users: https://status418-project.herokuapp.com/user

2. To GET users by user_id: https://status418-project.herokuapp.com/user_id

3. To POST a new user: https://status418-project.herokuapp.com/user

4. To PATCH an exisiting user by user_id: https://status418-project.herokuapp.com/user_id

5. To DELETE an existing user by user_id: https://status418-project.herokuapp.com/user_id

Habits Routes:

1. To GET all habits: https://status418-project.herokuapp.com/habits

2. To GET all habits by habit id: https://status418-project.herokuapp.com/habits/id

3. To GET all habits by user_id: https://status418-project.herokuapp.com/habits?user_id=

4. To POST a new habit: https://status418-project.herokuapp.com/habits

5. To PUT an exisiting habit by habit id: https://status418-project.herokuapp.com/habits/id

6. To PATCH an exisiting habit name and description by habit id: https://status418-project.herokuapp.com/habits/id

7. To DELETE an exisiting habit by habit id: https://status418-project.herokuapp.com/habits/id

User Routes:

1. To GET all users: https://status418-project.herokuapp.com/user

2. To GET specific users using the user_id: https://status418-project.herokuapp.com/user/id

3. To POST a new user from Auth0: https://status418-project.herokuapp.com/user

4. To PATCH the username: https://status418-project.herokuapp.com/user/id

5. To DELETE user by user_id: https://status418-project.herokuapp.com/user/id

## How to reset the db

User:
dbResetUser is a script included in the package.json
To reset database write into your terminal `npm dbResetUser`. This script includes the path of the delete, create and populate user files.

Habits:
dbResetHabits is a script included in the package.json
To reset database write into your terminal `npm dbResetHabits`. This script includes the path of the delete, create and populate habits files.

Calendar:
dbResetCalendar is a script included in the package.json
To reset database write into your terminal `npm dbResetCalendar`. This script includes the path of the delete, create and populate calendar files.

## Env variables: what to name your envs to link up an external db

You can use Heroku credentials in the .env file to link to external database.

## Tests - what are they testing for, i.e. what can you be sure will be OK if the tests pass

Routes/user.test.js:

1. To test if the get request, to recieve all the users in the database, is successful. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

2. To test if the get request will send back a specific user object using the user_id. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

3. To test if the post request will create a new user from Auth0. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 202 status code or 500 status code if unsuccessful.

4. To test if the patch request will update the username of a specific user using its user_id. The test will also check to see if the request body format is JSON.A successful get request test will return a 202 status code or 500 status code if unsuccessful.

5. To test if the delete request will delete a specific user using its id. A successful delete request test will return a 200 status code or 500 status code if unsuccessful.

Routes/user.test.js:

1. To test if the get request, to recieve all the users in the database, is successful. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

2. To test if the get request will send back a specific user object using the user_id. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

3. To test if the post request will create a new user from Auth0. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 202 status code or 500 status code if unsuccessful.

4. To test if the patch request will update the username of a specific user using its user_id. The test will also check to see if the request body format is JSON.A successful get request test will return a 202 status code or 500 status code if unsuccessful.

5. To test if the delete request will delete a specific user using its id. A successful delete request test will return a 200 status code or 500 status code if unsuccessful.

Routes/user.test.js:

1. To test if the get request retrieves all users successful. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

2. To test if the get request will send back a specific user by the user_id. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

3. To test if the post request will create a new user from Auth0. The test will check to see if the response.body includes the correct properties and primitive data type in the user object. The test will also check to see if the request body format is JSON. A successful get request test will return a 202 status code.

4. To test if the patch request will update the username of a specific user by the user_id. The test will also check to see if the request body format is JSON. A successful patch request test will return a 202 status code.

5. To test if the delete request will delete a specific user by the user_id. A successful delete request test will return a 200 status code or 500 status code if unsuccessful.

Routes/habits.test.js:

1. To test if the get request retrieves all the habits successful. The test will check to see if the response.body includes the correct properties and primitive data type in the habit object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

2. To test if the get request will send back a specific habit using the habit id. The test will check to see if the response.body includes the correct properties and primitive data type in the habits object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

3. To test if the get request will send back a specific habit by the user id. The test will check to see if the response.body includes the correct properties and primitive data type in the habits object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

4. To test if the post request will create a new habit. The test will check to see if the response.body includes the correct properties and primitive data type in the habit object. The test will also check to see if the request body format is JSON. A successful post request test will return a 201 status code.

5. To test if the put request will make a full update on an exisiting habit by the habit id.The test will check to see if the response.body includes the correct properties and primitive data type in the habit object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

6. To test if the patch request will update an exisiting habit name by the habit id. The test will also check to see if the request body format is JSON. A successful patch request test will return a 202 status code.

7. To test if the patch request will update an exisiting habit description by the habit id. The test will also check to see if the request body format is JSON. A successful patch request test will return a 202 status code.

8. To test if the delete request will delete a specific habit by habit id. A successful delete request test will return a 200 status code.

Routes/calendar.test.js:

1. To test if the get request retrieves all habit items by habit id successfully. The test will also check to see if the request body format is JSON. It will also check to see if the response.body includes the correct properties and primitive data type in the calendar object. A successful get request test will return a 200 status code.

2. To test if the get request retrieves all habit items by habit id and date. The test will check to see if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check to see if the request body format is JSON. A successful get request test will return a 200 status code.

3. To test if the post request will add a new calendar entry. The test will check to see if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check to see if the request body format is JSON. A successful post request test will return a 201 status code.

4. To test if the patch request updates the status from incomplete to either complete, miss or fail by id an date query. The test will check to see if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check to see if the request body format is JSON. A successful patch request test will return a 202 status code.

5. To test if the delete request deletes all calendar enteries for a habit by habit id.The test will check to see if the response.body includes the correct properties and primitive data type in the calendar object. The test will also check to see if the request body format is JSON. A successful delete request test will return a 200 status code.

## Authors

- [Idman Abshir](https://github.com/idman01)
