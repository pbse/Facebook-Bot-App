"use strict";

//import request from "request";
import express from "express";
const router = express.Router()
import logger from "../util/logger";
import BootBot from 'bootbot';
import {Payload} from "../types/payloadTypes";
import {Chat} from "../types/chatTypes";
import {helpFunc} from "../modules/help";
import {genreFunc} from "../modules/genre";
import {greetFunc} from "../modules/greet";

const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});

// define the home page route
router.get('/', function (_req, res) {
    res.send('Thanks for Checking Us Out');
});

bot.setGreetingText("Hello, Welcome to XYZ Page. Lets start by knowing your favorite genre.");

bot.on('message', (payload : Payload, _chat : Chat) => {
    logger.info({"module": "Api Controller", "message": payload.message.text, "details": payload});
});

bot.on('attachment', (payload : Payload, chat : Chat) => {
    logger.info({"module": "Api Controller", "message": "Recieved Attachment", "details": payload});
    chat.say('We do not support this message type');
});

/**
 * Assign Bot Modules
 */
bot.module(greetFunc);
bot.module(helpFunc);
bot.module(genreFunc);

/**
 * Start the Bot
 */
bot.start(process.env.BOTPORT);

export default router;