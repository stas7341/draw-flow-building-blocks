import express from 'express';
import HttpController from '../controller/http.controller';
import validator from '../utils/inputValidators';

const router = express.Router();

router.all(
    '/test',
    validator.validationHandler,
    HttpController.manualTest
);

router.post(
    '/save',
    validator.validationHandler,
    HttpController.saveFlow
);

router.get(
    '/load',
    validator.validationHandler,
    HttpController.loadFlow
);

export default router;
