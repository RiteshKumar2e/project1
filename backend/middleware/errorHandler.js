/**
 * Centralized error handling middleware
 */
function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'An internal error occurred. If this is an emergency, please call 112 immediately.'
    : err.message;

  res.status(statusCode).json({
    error: message,
    errorHi: statusCode === 500
      ? 'एक आंतरिक त्रुटि हुई। यदि यह आपातकाल है, तो कृपया तुरंत 112 पर कॉल करें।'
      : undefined,
    emergencyNumber: '112'
  });
}

module.exports = errorHandler;
