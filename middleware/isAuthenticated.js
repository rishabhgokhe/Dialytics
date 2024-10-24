import jwt from 'jsonwebtoken';

export default async function isAuthenticated(req, res) {
  const token = req.headers.authorization?.split(" ")[1]; // Adjust this based on how you send the token

  if (!token) {
    return null; // or res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is defined
    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}