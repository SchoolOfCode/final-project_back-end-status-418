import express from "express";
import cors from "cors";
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
