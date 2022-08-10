import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

import habitsRouter from "./routes/habits.js";
import calendarRouter from "./routes/calendar.js";
import userRouter from "./routes/user.js";
import alertRouter from "./routes/alert.js"

const port = process.env.PORT || 3001;
const app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
	res.send("Welcome to Status 418’s Rootine back end");
});

app.use("/user", userRouter);
app.use("/habits", habitsRouter);
app.use("/calendar", calendarRouter);
app.use("/alert", alertRouter)

if (process.env.NODE_ENV != "test") {
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}

export default app;
//Scheduled check every 10 min, invoke a func that checks all users in system. For each user loop through habits, check if any habits are incomplete.
    // if true, send request in 5 minute.

/* 
NEED TO MAKE 2 QUERIES: 
async function checkUserDaily (UID, date?) {
    localhost:3001/habits?userId=abc123 
        This is to get a list of all HABITS of the current USER
    localhost:3001/calendar/ >EACH ID< ?date= >TODAY<
        This is to get a list of "habitItems" for each of those above habits, for TODAY ONLY (i.e. the statuses)
    return resultOfQuery

}

async function checkForIncomplete (resultOfQuery) {
    let incompleteHabits = []
    for (let i=0;i<resultOfQuery.length;i++) {
        if (resultOfQuery[i].status === "incomplete") {
            incompleteHabits.push(resultOfQuery[i])
        }
    }
    if (incompleteHabits != []) {
       let response = await fetch(">SLACK API CALL URI &text=habit1,habit2,etc<", )
       let data = response.json()
       etc...
    }
}

setInterval(whole func, 1000 * 60 * 60 * 24);

// TODO: Serverless func
*/