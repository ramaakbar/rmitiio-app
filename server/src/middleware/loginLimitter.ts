import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please retry again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    console.log(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
