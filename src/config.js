const config = {
  serverID: process.env.REACT_APP_SERVER_ID || "Localhost",
  environment: process.env.REACT_APP_SERVER_ENVIRONMENT || "Localhost",
  apiURL: process.env.REACT_APP_API_URL || "http://localhost:8001/api",
  timezone: "Asia/Singapore",
};
export default config;
