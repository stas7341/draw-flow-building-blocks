import {amqpService, Logger, LogLevel} from "@asmtechno/service-lib";
import express from "express";
import {baseRoute, middlewares} from "./middleware/baseRoute";
import httpRoute from "./routes/http.route";
import { sendBaseResponse } from "./utils/responseHandler";

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

export const boot = async() => {
    const path = require('path');
    // @ts-ignore
    const config = require.main.require("./config/default");
    await Logger.getInstance().init(config["Logger"]);
    const amqp = amqpService.getInstance();
    await amqp.init(config["amqp"]);

    amqp.on("log", (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`amqp::${message}`, logLevel, metadata);
    });

    const app = express();
    const port = config["app"].port;
    middlewares(app, config["app"].basePath);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', httpRoute);
    app.get('/drawflow', function(req, res) {
        res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        res.sendFile('./public/index.html', { root : __dirname})
    });
    //app.get('/', baseRoute);
    app.all('/health', (req, res) => sendBaseResponse(res, 200));

    app.listen(port, () =>
        Logger.getInstance().log(`${app.get('env')}: server App listening on PORT ${port}...`, LogLevel.info)
    );
    Logger.getInstance().log('IQ server started', LogLevel.info, config);
}

