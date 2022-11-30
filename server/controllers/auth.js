import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required!" });
        }
        if (!email) {
            return res.json({ error: "Email is taken" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: "Email is taken" });
        }
        const hashedPassword = await hashPassword(password);

        const user = await new User({
            name,
            email,
            password: hashedPassword,
        }).save();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
};