const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const controllerListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", { skip, limit });
  res.json(result);
};

const controllerGetContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const controllerAddContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const controllerRemoveContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const controllerUpdateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

module.exports = controllers;
