const model = require("../models/index");

const moment = require("moment");

// Timezone format follows moment timezone https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
// Birth Date format: TZ,ex: 2011-08-12T20:17:46.384Z, 2001-08-12T00:00:00Z, will be sent following the browser time and converted to GMT+0

const createUser = async (req, res) => {
  try {
    const createUser = await model.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      timezone: req.body.timezone,
      birthDate: req.body.birthDate,
      triggerDate: moment(req.body.birthDate).add(9, "hours"),
    });
    res.json({ status: "Success", statusCode: 200, data: createUser });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req, res) => {
  try {
    console.log(
      moment.utc(req.body.birthDate).set({ h: 00, m: 00 }).tz(req.body.timezone)
    );
    const updateUser = await model.User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        timezone: req.body.timezone,
        birthDate: req.body.birthDate,
        triggerDate: moment(req.body.birthDate).add(9, "hours"),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ status: "Success", statusCode: 200, data: updateUser });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await model.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ status: "Success", statusCode: 200, data: deleteUser });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser, updateUser, deleteUser };
