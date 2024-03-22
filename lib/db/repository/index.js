import { resultPerPage } from "@/constants";

export const insert = async ({
  collection,
  data,
  query = {},
  options = {},
  returnDocument = "after",
}) => {
  const result = await collection.insertOne(data, options);

  if (result.insertedCount === 0) {
    return [null, `Could not insert data into ${collection.collection.name}`];
  } else {
    return [result.ops[0], null];
  }
};

export const insertOne = async ({ model, data }) => {
  try {
    const newDocument = new model(data);
    const savedDocument = await newDocument.save();

    return [savedDocument, null]; // Return the saved document

  } catch (error) {
    return [null, `Could not insert data into ${model.collection.name}: ${error.message}`];
  }
};

export const update = async ({
  collection,
  query,
  data,
  options = {},
  returnDocument = "after",
}) => {
  const result = await collection.updateOne(query, data, options);
  if (result.matchedCount === 0) {
    return [null, `Could not update data in ${collection.collection.name}`];
  } else {
    return [result.ops[0], null];
  }
};

export const findOne = async ({ collection, query }) => {
  const result = await collection.findOne(query);

  if (result) {
    return [result, null];
  } else {
    return [null, `Could not find data in ${collection.collection.name}`];
  }
};

export const findMany = async ({ collection, query, options = {} }) => {
  const { skip = 0, limit = resultPerPage } = options;
  const result = await collection
    .find(query)
    .skip(skip)
    .limit(limit);

  if (result) {
    return [result, null];
  } else {
    return [null, `Could not find data in ${collection.collection.name}`];
  }
};
