require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const CronJob = require("cron").CronJob;
const apiRoute = require("./routes/index.js");
const birthdayHelper = require("./helper/birthdayHelper");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// minute 0 at random second to prevent database shock, server will do cron to check for datas and send mails
const randomSecond = Math.floor(Math.random() * 59) % 59;
const job = new CronJob(`${randomSecond} 0 * * * *`, () => {
  birthdayHelper.getCurrentHourBirthday();
});
job.start();

app.use("/api/", apiRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
