import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("✅ Connecté à MongoDB Atlas");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error("La DB n'est pas encore initialisée !");
  return db;
}
