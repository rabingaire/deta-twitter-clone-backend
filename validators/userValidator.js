const Joi = require("joi");
const { BadRequest } = require("../utils/errors");

const validate = require("../utils/validate");

function userauthValidator(req, res, next) {
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

  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

function editUserValidator(req, res, next) {
  const schema = Joi.object({
    description: Joi.string()
      .max(140)
      .error(new BadRequest("description can only be of max 140 characters")),
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
      .min(3)
      .max(30)
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
