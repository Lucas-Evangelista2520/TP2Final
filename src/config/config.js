import dotenv from "dotenv";

dotenv.config();

const {
	MONGO_URI,
	JWT_SECRET,
	SERVER_PORT,
	SERVER_HOST,
} = process.env;

// Error por si no tenemos el .env
if (!JWT_SECRET) {
	console.warn("⚠️  ADVERTENCIA: JWT_SECRET no está definida en .env");
}

if (!MONGO_URI) {
	console.warn("⚠️  ADVERTENCIA: MONGO_URI no está definida en .env");
}

export const config = {
	MONGO_URI,
	SERVER_PORT,
	SERVER_HOST,
	JWT_SECRET,
};