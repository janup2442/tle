// requestLogger.js
const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  next(); // Pass control to the next middleware
};

// module.exports = requestLogger;
export default requestLogger
