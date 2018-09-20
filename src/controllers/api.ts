"use strict";

//import request from "request";
import express from "express";
const router = express.Router()
import logger from "../util/logger";

// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})

export default router;