const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.includes("Bearer")) {
    return authorization.replace("Bearer", "").trim();
  }
  return null;
};
module.exports = { deepClone, getTokenFrom };
