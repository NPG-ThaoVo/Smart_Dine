import Table from "../models/tableModel.js";

export const createTable = async (data) => {
  return await Table.create(data);
};

export const getAllTables = async ({ status, search }) => {
  let query = {};
  if (status === "open" || status === "close") {
    query.status = status;
  }
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  return await Table.find(query).sort({ number: 1 });
};

export const getTableById = async (id) => {
  return await Table.findById(id);
};

export const updateTable = async (id, data) => {
  return await Table.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteTable = async (id) => {
  return await Table.findByIdAndDelete(id);
};