import {Payload} from "../types/payloadTypes";
import {Chat} from "../types/chatTypes";
import logger from "../util/logger";
import {genres} from "../util/genreData";
import {getListOfMovies} from "../util/utilFunctions";
import {genreResponse} from "../types/genreResponse";

const quickReplies : (string)[] = [];
genres.forEach((genre) => {
    quickReplies.push(genre.name);
});

export const genreFunc = (bot : any) => {
    bot.hear(['genre', 'list', 'movie types'], (_payload : Payload, chat : Chat) => {
        const qr = quickReplies.slice(0,11);
        chat.say({
            text: 'Please Select which Genre Movies for This Year you want to see',
            quickReplies : qr
        });
    });

    bot.hear(['more genre'], (_payload : Payload, chat : Chat) => {
        const qr = quickReplies.slice(11,quickReplies.length);
        chat.say({
            text: 'Please Select which Genre Movies for This Year you want to see',
            quickReplies : qr
        });
    });

    bot.hear(quickReplies, (payload : Payload, chat : Chat) => {
        getListOfMovies(payload.message.text)
            .then((response : genreResponse) => {
                logger.info({"module": "Api Controller", "message": "Got Details"});
                const arr : (string)[] = [];
                response.results.forEach((result : any) => {
                    arr.push(result.original_title);
                });
                for(let i=0;i<10;i++) {
                    chat.say(arr[i]);
                }
            });
    });
};