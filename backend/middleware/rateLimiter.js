/**
 * Simple in-memory rate limiter
 */
const requestCounts = new Map();

function rateLimiter(maxRequests = 30, windowMs = 60000) {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(key)) {
      requestCounts.set(key, []);
    }

    const timestamps = requestCounts.get(key).filter(t => now - t < windowMs);
    timestamps.push(now);
    requestCounts.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.',
        errorHi: 'बहुत सारे अनुरोध। कृपया पुनः प्रयास करने से पहले एक क्षण प्रतीक्षा करें।',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    next();
  };
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of requestCounts) {
    const filtered = timestamps.filter(t => now - t < 120000);
    if (filtered.length === 0) requestCounts.delete(key);
    else requestCounts.set(key, filtered);
  }
}, 300000);

module.exports = rateLimiter;
