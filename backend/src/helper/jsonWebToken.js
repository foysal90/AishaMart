const jwt = require("jsonwebtoken");

const createJWT = (payload, secretKey, expiresIn) => {

    //checking errors
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be non-empty object");
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be non empty string");
  }

  //creating jwt
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("failed to sign the JWT:", error);
    throw error;
  }
};

module.exports = { createJWT };
