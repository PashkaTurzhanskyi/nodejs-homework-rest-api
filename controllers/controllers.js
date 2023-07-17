const contactsService = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const controllerListContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const controllerGetContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const controllerAddContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const controllerRemoveContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const controllerUpdateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const controllers = {
  controllerListContacts: ctrlWrapper(controllerListContacts),
  controllerGetContactById: ctrlWrapper(controllerGetContactById),
  controllerAddContact: ctrlWrapper(controllerAddContact),
  controllerRemoveContact: ctrlWrapper(controllerRemoveContact),
  controllerUpdateContact: ctrlWrapper(controllerUpdateContact),
};

module.exports = controllers;
