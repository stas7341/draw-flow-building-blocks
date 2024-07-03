import {sendErrorResponse, sendJsonResponse, sendOK, sendSuccessResponse} from '../utils/responseHandler';
import { asyncMiddleware } from '../middleware/async';
import { Logger, LogLevel, Message } from '@asmtechno/service-lib';
import fs from 'fs';

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

const manualTest = asyncMiddleware(async (req, res) => {
        const data = {"kuku": true}; // await fullManualTest(req, res);
        return data ? sendJsonResponse(res, 200, data) : sendErrorResponse(res, 500, "failed");
});

const saveFlow = asyncMiddleware(async (req, res) => {
        const { dirname } = require('path');
        const appDir = dirname(require?.main?.filename);
        const msg = Message.clone(req.body);
        log(`arrived save draw`, LogLevel.debug, msg);
        fs.writeFileSync(appDir + `/public/flows/${msg.payload?.flowName}`+ `.json`, JSON.stringify(msg.payload?.data), 'utf8');
        return sendOK(res);
});

const loadFlow = asyncMiddleware(async (req, res) => {
        const { dirname } = require('path');
        const appDir = dirname(require?.main?.filename);
        const msg = Message.clone(req.body);
        log(`arrived save draw`, LogLevel.debug, msg);
        fs.writeFileSync(appDir + `/public/flows/${msg.payload?.flowName}`+ `.json`, JSON.stringify(msg.payload?.data), 'utf8');
        return sendOK(res);
});

const HttpController = {
        manualTest,
        saveFlow,
        loadFlow
};

export default HttpController;
