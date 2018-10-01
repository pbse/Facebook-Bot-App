"use strict";
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

/**
 * Define Home page route
 * Not using this here though
 */
router.get('/', function (_req, res) {
    res.send('Thanks for Checking Us Out');
});

/**
 * This will get triggered as and when any one
 * opens the chat window for the first time
 */
bot.setGreetingText("Hello, Welcome to XYZ Page. Lets start by knowing your favorite genre.");

/**
 * Log the message we receive.
 * All the message with type `message`
 * will appear in this function
 */
bot.on('message', (payload : Payload, _chat : Chat) => {
    logger.info({"module": "Api Controller", "message": payload.message.text, "details": payload});
});

/**
 * Log the Attachment message we receive.
 * All the message with type `Attachment message`
 * will appear in this function
 */
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