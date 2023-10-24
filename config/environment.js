const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "keyboard cat",
  db: "ss_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "akshaykumarknight@gmail.com",
      pass: "pkdyanwhgzdyrntg",
    },
    jwt_key: "secretsocial",
  },
  google_client_ID:
    "156685969550-k42j9unov4agosopmc5entbs8pg2p5oc.apps.googleusercontent.com",
  google_client_Secret: "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",
  google_call_back_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_key: "secretsocial",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: "production",
  asset_path: process.env.SS_AASET_PATH,
  session_cookie_key: process.env.SS_SCK,
  db: "ss_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SS_AUTH_USER,
      pass: process.env.SS_AUTH_PATH,
    },
  },
  google_client_ID: process.env.SS_GCI,
  google_client_Secret: process.env.SS_GCS,
  google_call_back_URL: process.env.SS_GCU,
  jwt_key: process.env.SS_JWT_KEY,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};

module.exports =
  eval(process.env.SS_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.SS_ENVIRONMENT);
