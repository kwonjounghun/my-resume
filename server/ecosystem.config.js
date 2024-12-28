require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./app.js",
      env: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        GOOGLE_AUTH_URL: process.env.GOOGLE_AUTH_URL,
      },
    },
  ],
};