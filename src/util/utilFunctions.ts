import _ from 'lodash';
import request from 'request';
import {genres} from "./genreData";
import logger from "./logger";

export const getListOfMovies = (genreName : string) => {
    return new Promise((resolve, reject) => {
        const api_key = process.env.TMDB_KEY;
        const genreObject = _.find(genres, (genreData) => { return genreData.name === genreName; });
        const options = { method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            qs: {
                with_genres: genreObject.id.toString(),
                primary_release_year: '2018',
                page: '1',
                include_video: 'false',
                include_adult: 'false',
                sort_by: 'popularity.desc',
                language: 'en-US',
                api_key: api_key },
            body: '{}' };
        return request(options, (error, response, body) => {
            if (error || body.error) {
                logger.info({"module": "GetListOfMovies", "message": "Got Error", "details": error});
                reject(new Error(error));
            }
            logger.info({"module": "GetListOfMovies", "message": "Got Data"});
            resolve(JSON.parse(body || response.body));
        });
    })
};