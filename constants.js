export const DB_NAME = "sofrik";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // allow OAuth redirect
  secure: process.env.NODE_ENV === "production",
};

 

  