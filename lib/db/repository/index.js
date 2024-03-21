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
