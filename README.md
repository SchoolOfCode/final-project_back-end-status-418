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
