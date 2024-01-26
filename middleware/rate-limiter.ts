import setRateLimit from "express-rate-limit";

const maxRequestsPerMinute = 20

export const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: maxRequestsPerMinute,
    message: { errors: [`You have exceeded your ${maxRequestsPerMinute} requests per minute limit.`] },
    headers: true,
});
