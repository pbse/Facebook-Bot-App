import express from "express";
require('dotenv').config()
import bodyParser from "body-parser";
import logger from "./util/logger";
import expressValidator from "express-validator";

// Controllers (route handlers)
import apiController from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use((parameters: { req: any, res: express.Response, next: express.NextFunction }) => {
    const {req, next} = parameters;
    logger.info({"module": "App", "details": req});
    next();
});

/**
 * Primary app routes.
 */
app.use("/", apiController);

export {
    app
}