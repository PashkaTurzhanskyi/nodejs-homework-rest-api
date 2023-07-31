const express = require("express");
const controllers = require("../../controllers/controllers");
const {
  validateBody,
  isValidId,
  isEmptyBody,
  authenticate,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authenticate, controllers.controllerListContacts);

router.get(
  "/:id",
  authenticate,
  isValidId,
  controllers.controllerGetContactById
);

router.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  controllers.controllerAddContact
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  controllers.controllerRemoveContact
);

router.put(
  "/:id",
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(schemas.contactAddSchema),
  controllers.controllerUpdateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
