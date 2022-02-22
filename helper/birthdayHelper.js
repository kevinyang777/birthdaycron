const model = require("../models/index");
const moment = require("moment-timezone");
const sequelize = require("sequelize");
const axios = require("axios");

const sendMail = (data) => {
  axios.post(process.env.HOOKBIN_URL, { data }).catch(function (error) {
    console.log(error);
  });
};
// This can be made to batching if message go through millions by making a new table to dump jobs and multiple instance to process batching with 1min to process 100 mail for example
const getCurrentHourBirthday = async () => {
  const t = await model.sequelize.transaction();
  try {
    let startDate;
    let endDate = moment.utc(new Date());
    const lastDateJob = await model.Setting.findAll({ transaction: t });
    if (lastDateJob.length !== 1) {
      startDate = moment.utc(new Date());
      await model.Setting.create(
        { lastTriggerDate: startDate },
        { transaction: t }
      );
    } else {
      startDate = lastDateJob[0].lastTriggerDate;
      await model.Setting.update(
        { lastTriggerDate: endDate },
        {
          where: {
            id: lastDateJob[0].id,
          },
        },
        { transaction: t }
      );
    }
    const where = {
      triggerDate: {
        [sequelize.Op.between]: [startDate, endDate],
      },
    };
    const findUsers = await model.User.findAll({ where }, { transaction: t });
    await t.commit();
    findUsers.map((each) => {
      const fullName = each.firstName + " " + each.lastName;
      const msg = `Hey, ${fullName} it's your birthday`;
      sendMail(msg);
    });
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
};

module.exports = {
  getCurrentHourBirthday,
};
