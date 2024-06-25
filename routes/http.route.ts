import express from 'express';
import HttpController from '../controller/http.controller';
import validator from '../utils/inputValidators';

const router = express.Router();

router.post(
    '/test/:queueName',
    validator.validationHandler,
    HttpController.manualTest
);

export default router;
