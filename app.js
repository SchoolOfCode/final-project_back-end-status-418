import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

const PORT = 3001;
const app = express();

app.use(logger("dev"));
app.use(helmet());
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
