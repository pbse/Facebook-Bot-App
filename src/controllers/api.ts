"use strict";

//import request from "request";
import { Response, Request} from "express";


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (_req: Request, res: Response) => {
    res.render("api/index", {
        title: "API Examples"
    });
};
