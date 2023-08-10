import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res
      .status(403)
      .json({ error: true, message: "Access denied:No Token Provided" });
  }

  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req.user = tokenDetails;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: true, message: "Access denied:Invalid Token" });
  }
};

export default auth;
