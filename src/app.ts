import express from "express";
import bodyParser from "body-parser";
import logger from "./util/logger";
import expressValidator from "express-validator";
import dotenv from 'dotenv';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Controllers (route handlers)
import apiController from "./controllers/api";
import homeController from "./controllers/home";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use((parameters: { req: any, res: express.Response, next: express.NextFunction }) => {
    const {req, res, next} = parameters;
    res.locals.user = req.user;
    logger.info({"module": "App", "details": req});
    next();
});

/**
 * Primary app routes.
 */
app.use("/", homeController);

/**
 * API examples routes.
 */
app.use('/api', apiController);

export default app;