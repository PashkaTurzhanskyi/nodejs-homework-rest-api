const express = require("express");
const controllers = require("../../controllers/controllers");

const router = express.Router();

router.get("/", controllers.controllerListContacts);

router.get("/:id", controllers.controllerGetContactById);

router.post("/", controllers.controllerAddContact);

router.delete("/:id", controllers.controllerRemoveContact);

router.put("/:id", controllers.controllerUpdateContact);

module.exports = router;
