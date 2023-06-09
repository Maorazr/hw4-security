const jwt = require("jsonwebtoken");

// Sign a new token
const token = jwt.sign({ foo: "bar" }, "e1be909386166b0cb8127sdgsg");
console.log("Token: ", token);

// Verify the token
try {
  const decoded = jwt.verify(token, "e1be909386166b0cb8127sdgsg");
  console.log("Decoded: ", decoded);
} catch (err) {
  console.log("JWT verification error: ", err);
}
