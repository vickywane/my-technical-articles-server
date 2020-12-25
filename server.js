import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import DialogflowWine from "./route/dialogflow-wine/dialogfow-wine-routes";

import TwilioMovieReminder from "./route/twilio-movie/twilio-movie-reminder-routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🥰 mongodb connected 🥰"))
  .catch(() =>
    console.log(
      "========== 😢 We are unable to connect to the mongo db 😢 =========="
    )
  );

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/twilio-movie-reminder/", TwilioMovieReminder);
app.use("/api/dialogflow-wine", DialogflowWine);

app.all("/", (req, res) => {
  res.status(200).send({
    response:
      "My articles server. Add a specific route to your request to hit an endpoint ",
  });
});

app.listen(PORT, () => console.log(`🔥  server running on port ${PORT}`));
