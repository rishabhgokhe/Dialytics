import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";
import { saveCookie } from "@/lib/saveCookies";
import generateJWTToken from "@/lib/generateJwtToken";

const logIn = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({
        success: false,
        message: "Only POST requests are allowed",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    await connectDB();

    const userWithPassword = await User.findOne({ email }).select("+password");

    if (!userWithPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatched = password === userWithPassword.password;
    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email }).select("-password");

    const token = generateJWTToken(user._id);

    saveCookie(res, token, true);

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

export default logIn;