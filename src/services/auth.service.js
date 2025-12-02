import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

class AuthService {
    constructor() {

    }

    async register(email, password) {
        // Primero, verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("El usuario con este email ya existe.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return newUser;
    }

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Credenciales inválidas.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Credenciales inválidas.");
        }

        const token = jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: "1h" });
        return { token };
    }
}

export const authService = new AuthService();
