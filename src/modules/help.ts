import {Payload} from "../types/payloadTypes";
import {Chat} from "../types/chatTypes";
import logger from "../util/logger";

export const helpFunc = (bot : any) => {
    bot.hear('help', (_payload : Payload, chat : Chat) => {
        const buttons = [
            { type: 'postback', title: 'Commands', payload: 'HELP_COMMANDS' },
            { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
            { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
        ]
        chat.sendButtonTemplate(`Need help? Try one of these options`, buttons);
    });

    bot.on('postback:HELP_HUMAN', (payload : Payload, chat : Chat) => {
        logger.info({"module": "Api Controller", "message": "Help Human Was Clicked", "details": payload});
        chat.say('We can extend this to provide FAQ');
    });

    bot.on('postback:HELP_FAQ', (payload : Payload, chat : Chat) => {
        logger.info({"module": "Api Controller", "message": "Help FAQ Was Clicked", "details": payload});
        chat.say('We can extend this to provide FAQ');
    });

    bot.on('postback:HELP_COMMANDS', (payload : Payload, chat : Chat) => {
        logger.info({"module": "Api Controller", "message": "Help Commands Was Clicked", "details": payload});
        chat.say('Here are the following commands for use.')
            .then(() => {
                chat.say("'genre': to get a list of genre supported");
            })
            .then(() => {
                chat.say("'more genre': more supported genres");
            });
    });
};