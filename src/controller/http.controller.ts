import {sendErrorResponse, sendJsonResponse, sendOK, sendSuccessResponse} from '../utils/responseHandler';
import { asyncMiddleware } from '../middleware/async';
import { Logger, LogLevel } from '@asmtechno/service-lib';

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

const manualTest = asyncMiddleware(async (req, res) => {
        const data = {"kuku": true}; // await fullManualTest(req, res);
        return data ? sendJsonResponse(res, 200, data) : sendErrorResponse(res, 500, "failed");
});

const saveFlow = asyncMiddleware(async (req, res) => {
        const data = {"kuku": true}; // await fullManualTest(req, res);
        log(`arrived save draw`, LogLevel.debug, req);
        return sendOK(res);
});

const HttpController = {
        manualTest,
        saveFlow
};

export default HttpController;
