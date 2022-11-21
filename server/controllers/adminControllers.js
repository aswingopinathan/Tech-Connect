const authAdmin = (req, res) => {
  // console.log("working");
  const credentials = { email: "admin@gmail.com", password: "admin123" };
  const { email, password } = req.body;
  if (credentials.email === email && credentials.password === password) {
    res.json({ email: email });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
};

module.exports = { authAdmin };
