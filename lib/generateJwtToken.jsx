import jwt from "jsonwebtoken";

export default function generateJWTToken(_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
}