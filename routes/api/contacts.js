const express = require("express");
const controllers = require("../../controllers/controllers");
const { validateBody, isValidId, isEmptyBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.controllerListContacts);

router.get("/:id", isValidId, controllers.controllerGetContactById);

router.post(
  "/",
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  controllers.controllerAddContact
);

router.delete("/:id", isValidId, controllers.controllerRemoveContact);

router.put(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(schemas.contactAddSchema),
  controllers.controllerUpdateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
