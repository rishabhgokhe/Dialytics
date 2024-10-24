// pages/api/auth/checkAuth.js

import isAuthenticated from "@/middleware/isAuthenticated";

export default async function handler(req, res) {
  const user = await isAuthenticated(req, res);
  
  if (!user) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  return res.status(200).json({ success: true, user });
}