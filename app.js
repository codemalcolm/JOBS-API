require("dotenv").config();
require("express-async-errors");

// extra security
const helmet = require("helmet");
const cors = require("cors");
const xs = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// DB connection
const connectDB = require("./db/connect");

// middleware
const authenticateUser = require("./middleware/authentication");

app.set('trust proxy', 1)

app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.);
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xs());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
