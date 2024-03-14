const generateResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: stringifyBody(body),
  };
};

const stringifyBody = (body) => {
  return JSON.stringify(body);
};

export const ok = (body = {}) => {
  return generateResponse(200, body);
};

export const created = (body = {}) => {
  return generateResponse(201, body);
};

export const noContent = () => {
  return generateResponse(204);
};

export const badRequest = (body = {}) => {
  return generateResponse(400, body);
};

export const unauthorized = (body = {}) => {
  return generateResponse(401, body);
};

export const forbidden = (body = {}) => {
  return generateResponse(403, body);
};

export const notFound = (body = {}) => {
  return generateResponse(404, body);
};

export const conflict = (body = {}) => {
  return generateResponse(409, body);
};

export const internalServerError = (body = {}) => {
  return generateResponse(500, body);
};

export const notImplemented = (body = {}) => {
  return generateResponse(501, body);
};

export const badGateway = (body = {}) => {
  return generateResponse(502, body);
};

export const serviceUnavailable = (body = {}) => {
  return generateResponse(503, body);
};

export const gatewayTimeout = (body = {}) => {
  return generateResponse(504, body);
};

export const response = (statusCode, body) => {
  return generateResponse(statusCode, body);
};

export const redirect = (location) => {
  return {
    statusCode: 302,
    headers: {
      Location: location,
    },
  };
};

export const permanentRedirect = (location) => {
  return {
    statusCode: 301,
    headers: {
      Location: location,
    },
  };
};

export const custom = (statusCode, body) => {
  return generateResponse(statusCode, body);
};

export const notModified = () => {
  return generateResponse(304);
};

export const unsupportedMediaType = (body = {}) => {
  return generateResponse(415, body);
};

export const unprocessableEntity = (body = {}) => {
  return generateResponse(422, body);
};

export const tooManyRequests = (body = {}) => {
  return generateResponse(429, body);
};
