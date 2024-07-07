import {amqpService, Logger, LogLevel, Message} from "@asmtechno/service-lib";
import express from "express";
import {baseRoute, middlewares} from "./middleware/baseRoute";
import { NodeFlow } from "./models/flow";
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

    /*
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
*/

    const flowExample = new NodeFlow('flow1');
    flowExample.globalEnv.set('temp', new Message('test', {data: 'start'}));
    flowExample.globalEnv.set('config', config);
    const node1 = new NodeLog('node1', NodeType.RETURN_VALUE, flowExample);
    flowExample.startNode = node1;
    const node21 = new NodeLog2('node21', NodeType.RETURN_VALUE, flowExample);
    const node22 = new NodeLog2('node22', NodeType.RETURN_VALUE, flowExample);
    node1.addConnection(node21);
    node1.addConnection(node22);
    const node31 = new NodeLog3('node31', NodeType.RETURN_VALUE, flowExample);
    const node32 = new NodeLog3('node32', NodeType.RETURN_VALUE, flowExample);
    const node33 = new NodeLog3('node33', NodeType.RETURN_VALUE, flowExample);
    const node34 = new NodeLog3('node34', NodeType.RETURN_VALUE, flowExample);
    node21.addConnection(node31);
    node22.addConnection(node32);
    node22.addConnection(node33);
    node22.addConnection(node34);

    await FlowManagerService.getInstance().execFlow(flowExample, new Message('test', {data: 'start'}));

    log(`all nodes in the flow`, LogLevel.debug,
        {
            flow: flowExample.flowName,
            nodesList: Array.from(flowExample.repoNodeBuildingBlocks, ([name, value]) => name)
        });
}

