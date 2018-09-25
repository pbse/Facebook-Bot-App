import {Payload} from "../types/payloadTypes";
import {Chat} from "../types/chatTypes";
import logger from "../util/logger";

export const greetFunc = (bot : any) => {

    bot.hear(['hello', 'hey', 'sup', /hey( there)?/i], (payload : Payload, chat : Chat)=>{
        logger.info({"module": "Api Controller", "message": payload.message.text, "details": chat});
        chat.say('Hello, human friend!').then(() => {
            chat.say('Please say genre to get the list of genres to search from', { typing: true });
        });
    });

    bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios', 'get lost', 'thankyou'], (_payload : Payload, chat : Chat) => {
        chat.say('Bye, human!');
    });

};

