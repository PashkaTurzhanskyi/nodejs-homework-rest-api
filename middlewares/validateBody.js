const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.values(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        next(HttpError(400, error.message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
