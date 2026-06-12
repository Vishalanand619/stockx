const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = { _id: "507f1f77bcf86cd799439011", name, email };
  res.json(user);
};

exports.login = async (req, res) => {
  console.log("BODY:", req.body);
  const { email, password } = req.body;

 
  const token = jwt.sign(
    { id: "507f1f77bcf86cd799439011" },
    process.env.JWT_SECRET || "stockxsecret123",
    { expiresIn: "1d" }
  );

  res.json({ token });
};