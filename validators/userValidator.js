const Joi = require("joi");

const validate = require("../utils/validate");
const { BadRequest } = require("../utils/errors");

function userauthValidator(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(10)
      .trim()
      .required()
      .error(
        new BadRequest(
          "username must contain min of 3 characters and max of 10 characters"
        )
      ),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{6,99}$/
      )
      .required()
      .error(
        new BadRequest(
          "password must contain at least one uppercase character, one lowercase character, one number and one special character"
        )
      ),
  });

  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

function editUserValidator(req, res, next) {
  const schema = Joi.object({
    description: Joi.string()
      .min(1)
      .max(140)
      .trim()
      .error(
        new BadRequest(
          "description cannot be empty or more than 140 characters"
        )
      ),
  });

  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

function followUserValidator(req, res, next) {
  const schema = Joi.object({
    id: Joi.string()
      .alphanum()
      .required()
      .error(new BadRequest("id is a required field")),
  });

  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  userauthValidator,
  editUserValidator,
  followUserValidator,
};
