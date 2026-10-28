import rateLimit from 'express-rate-limit';

/**
 * Standard API rate limiter
 */
export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      message: 'Too many requests, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});

/**
 * Strict limiter for sensitive operations (bidding, uploads, auth sync)
 */
export const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      message: 'Too many requests on this endpoint, please slow down.',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});
