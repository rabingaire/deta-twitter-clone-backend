const Joi = require("joi");

const validate = require("../utils/validate");
const { BadRequest } = require("../utils/errors");

function tweetCreateValidator(req, res, next) {
  const schema = Joi.object({
    body: Joi.string()
      .max(140)
      .required()
      .error(
        new BadRequest(
          "tweet body is required and can only be of max 140 characters"
        )
      ),
  });

  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      next(err);
    });
}

function tweetActionValidator(req, res, next) {
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
  tweetCreateValidator,
  tweetActionValidator,
};
