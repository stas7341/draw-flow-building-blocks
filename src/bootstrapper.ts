import {amqpService, Logger, LogLevel, Message} from "@asmtechno/service-lib";
import express from "express";
import {baseRoute, middlewares} from "./middleware/baseRoute";
import {FLOW_EVENTS, NodeFlow } from "./models/flow";
import { NodeType } from "./models/nodeBuildingBlock";
import { NodeLog, NodeLog2, NodeLog3 } from "./models/nodeLog";
import httpRoute from "./routes/http.route";
import { FlowManagerService } from "./services/flowManager";
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
    Logger.getInstance().log('server started', LogLevel.info, config);

    const flowExample = FlowManagerService.getInstance().createFlow('test', {});

    flowExample.on(FLOW_EVENTS.LOG, (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`log:${message}`, logLevel, metadata);
    });

    flowExample.on(FLOW_EVENTS.STARTED, (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`started:${message}`, logLevel, metadata);
    });
    flowExample.on(FLOW_EVENTS.NODE_MOVED, (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`moved:${message}`, logLevel, metadata);
    });
    flowExample.on(FLOW_EVENTS.ENDED, (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`ended:${message}`, logLevel, metadata);
    });
    flowExample.on(FLOW_EVENTS.ERROR, (...args: any[]) => {
        const [message, logLevel, metadata] = args;
        log(`moved:${message}`, LogLevel.error, metadata);
    });

    flowExample.globalEnv.set('temp', new Message('test', {data: 'start'}));
    flowExample.globalEnv.set('config', config);

    setTimeout(() => FlowManagerService.getInstance().execFlow(flowExample, new Message('test1', {data: 'start1'})), 0);
    //setTimeout(() => FlowManagerService.getInstance().execFlow(flowExample, new Message('test2', {data: 'start2'})), 0);

    log(`all nodes in the flow`, LogLevel.debug,
        {
            flow: flowExample.flowName,
            nodesList: Array.from(flowExample.getAllNode(), ([name, value]) => name)
        });
}

