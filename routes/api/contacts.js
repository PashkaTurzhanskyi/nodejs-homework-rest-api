const express = require("express");
const controllers = require("../../controllers/controllers");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.controllerListContacts);

router.get("/:id", controllers.controllerGetContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  controllers.controllerAddContact
);

router.delete("/:id", controllers.controllerRemoveContact);

router.put(
  "/:id",
  validateBody(schemas.contactAddSchema),
  controllers.controllerUpdateContact
);

module.exports = router;
