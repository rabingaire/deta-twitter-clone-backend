const Joi = require("joi");
const { BadRequest } = require("../utils/errors");

const validate = require("../utils/validate");

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new BadRequest("username is a required field")),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{6,99}$/
    )
    .required()
    .error(
      new BadRequest(
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
    ),
});

function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  userValidator,
};
