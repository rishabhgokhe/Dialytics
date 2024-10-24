import * as cookie from 'cookie';

export function saveCookie(res, token, set) {
    const isProduction = process.env.NODE_ENV === "production";
    
    // Log token for debugging
    console.log("Setting cookie with token:", token);
    
    // Serialize the token into a cookie
    const tokenCookie = cookie.serialize("token", set && token ? token : "", {
        httpOnly: true,              // Cookie is not accessible via JavaScript
        secure: isProduction,        // Only send cookie over HTTPS in production
        sameSite: "strict",          // Prevent CSRF attacks
        path: "/",                   // Cookie is valid for the entire domain
        maxAge: set ? 60 * 60 * 24 * 10 : 0, // 10 days if set, clear if not
    });

    // Set the cookie in the response header
    res.setHeader("Set-Cookie", tokenCookie);
}