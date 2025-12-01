import { authService } from "../services/auth.service.js";

const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ statusCode: 400, error: "Email y contraseña son requeridos." });
            }
            const newUser = await authService.register(email, password);
            res.status(201).json({ statusCode: 201, message: "Usuario registrado exitosamente", user: { id: newUser.id, email: newUser.email } });
        } catch (error) {
            res.status(400).json({ statusCode: 400, error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ statusCode: 400, error: "Email y contraseña son requeridos." });
            }
            const { token } = await authService.login(email, password);
            res.status(200).json({ statusCode: 200, message: "Inicio de sesión exitoso", token });
        } catch (error) {
            res.status(401).json({ statusCode: 401, error: error.message });
        }
    },
};

export { authController };
