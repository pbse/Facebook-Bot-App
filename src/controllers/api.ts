"use strict";

//import request from "request";
import express from "express";
const router = express.Router()
import logger from "../util/logger";
import BootBot from 'bootbot';
import {Payload} from "../types/payloadTypes";
import {Chat} from "../types/chatTypes";
import {genres} from "../util/genreData";
import {getListOfMovies} from "../util/utilFunctions";

const quickReplies : (string)[] = [];
genres.forEach((genre) => {
    quickReplies.push(genre.name);
});
quickReplies.splice(11,quickReplies.length);


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

bot.on('postback:HELP_HUMAN', (payload : Payload, chat : Chat) => {
    logger.info({"module": "Api Controller", "message": "Help Human Was Clicked", "details": payload});
    chat.say('We can extend this to provide FAQ');
});

bot.on('postback:HELP_FAQ', (payload : Payload, chat : Chat) => {
    logger.info({"module": "Api Controller", "message": "Help FAQ Was Clicked", "details": payload});
    chat.say('We can extend this to provide FAQ');
});

bot.on('postback:HELP_SETTINGS', (payload : Payload, chat : Chat) => {
    logger.info({"module": "Api Controller", "message": "Help Settings Was Clicked", "details": payload});
    chat.say('We can extend this to provide FAQ');
});

bot.hear(['hello', 'hey', 'sup', /hey( there)?/i], (payload : Payload, chat : Chat)=>{
    logger.info({"module": "Api Controller", "message": payload.message.text, "details": chat});
    chat.say('Hello, human friend!').then(() => {
        chat.say('Please say genre to get the list of genres to search from', { typing: true });
    });
});

bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios', 'get lost'], (_payload : Payload, chat : Chat) => {
    chat.say('Bye, human!');
});

bot.hear(['genre', 'list', 'movie types'], (_payload : Payload, chat : Chat) => {

    chat.say({
        text: 'Please Select which Genre Movies for This Year you want to see',
        quickReplies
    });
});

bot.hear(quickReplies, (payload : Payload, chat : Chat) => {
    getListOfMovies(payload.message.text)
        .then((response : any) => {
            logger.info({"module": "Api Controller", "message": "Got Details", "details": response});
            const arr : (string)[] = [];
            response['results'].forEach((result : any) => {
                arr.push(result['original_title']);
            });
            for(let i=0;i<10;i++) {
                chat.say(arr[i]);
            }
        });
});


bot.hear(['help'], (_payload : Payload, chat : Chat) => {
    // Send a text message with buttons
    chat.say({
        text: 'What do you need help with?',
        buttons: [
            { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
            { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
            { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
        ]
    });
});



/**
 * Start the Bot
 */
bot.start(process.env.BOTPORT);

export default router;