import {sendErrorResponse, sendJsonResponse, sendSuccessResponse} from '../utils/responseHandler';
import { asyncMiddleware } from '../middleware/async';

const manualTest = asyncMiddleware(async (req, res) => {
        const data = {}; // await fullManualTest(req, res);
        return data ? sendJsonResponse(res, 200, data) : sendErrorResponse(res, 500, "failed");
});

const HttpController = {
        manualTest
};

export default HttpController;
