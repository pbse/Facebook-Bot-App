import express from "express";
const router = express.Router()
import logger from "../util/logger";

router.get('/', (req: express.Request, res: express.Response) => {
    logger.info({"module": "Home Controller", "message": "Some One Called Me", "details" : req});
    res.send('Thanks for Checking Us Out');
});

export default router;