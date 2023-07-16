const contactsService = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const contactAddSchema = require("../validations/validations");

const controllerListContacts = async (_, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const controllerGetContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const controllerAddContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const controllerRemoveContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const controllerUpdateContact = async (req, res, next) => {
  try {
    if (Object.values(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    } else {
      const { error } = contactAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
    }
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const controllers = {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
};

module.exports = controllers;
