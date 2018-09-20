"use strict";

//import request from "request";
import express from "express";
const router = express.Router()
import logger from "../util/logger";

router.get('/webhook/', (req: express.Request, res: express.Response) => {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
        logger.info({"module": "Home Controller", "message": "Webhook Verification Successful"});
        return res.send(req.query['hub.challenge'])
    }
    logger.info({"module": "Home Controller", "message": "Webhook Verification Failed"});
    return res.send('wrong token')
})


export default router;