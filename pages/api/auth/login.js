

import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";
import { saveCookie } from "@/lib/saveCookies";
import generateJWTToken from "@/lib/generateJwtToken";

const logIn = async (req, res) => {
  try {
    // Ensure that the request method is POST
    if (req.method !== "POST") {
      return res.status(400).json({
        success: false,
        message: "Only POST requests are allowed",
      });
    }

    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Validate that both fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Connect to the database
    await connectDB();

    // Find the user by email and include the password field (even though we are not using bcrypt)
    const userWithPassword = await User.findOne({ email }).select("+password");

    // If the user is not found, return an error
    if (!userWithPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Simple password comparison (as bcrypt is not used)
    const passwordMatched = password === userWithPassword.password;
    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Find the user without the password field (for returning clean data)
    const user = await User.findOne({ email }).select("-password");

    // Generate a JWT token for the user
    const token = generateJWTToken(user._id);

    // Save the token in a cookie
    saveCookie(res, token, true);

    // Return success response with the user data (excluding password)
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user,
    });
  } catch (error) {
    // Handle errors and return 500 status with an error message
    console.error("Error in login API:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

export default logIn;