import express from "express";
import cors from "cors";
<<<<<<< HEAD

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
	res.send("Welcome to Status 418’s Rootine back end");
});

// app.use("/users", usersRouter);
// app.use("/habits", habitsRouter);
// app.use("/calendar", calendarRouter);

if (process.env.NODE_ENV != "test") {
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
}

export default app;
=======
import helmet from "helmet";
import logger from "morgan";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello from root route");
});

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
>>>>>>> 973ad3969135ba2bcd595c69aefd7e91d30c65d4
