const Joi = require("joi");
const { BadRequest } = require("../utils/errors");

const validate = require("../utils/validate");

function tweetValidator(req, res, next) {
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

module.exports = {
  tweetValidator,
};
