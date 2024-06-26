import {Logger, LogLevel, Message} from "@asmtechno/service-lib";
import fs from "fs";
export const log = (msg: string, level: LogLevel = LogLevel.info, metadata: any = undefined) =>
    Logger.getInstance().log(`handlingSaveConfig::` + msg, level, metadata);

const flows = {
    saveFlowConfig,
    loadFlowConfig
};

export const handlingFlowConfig = async (msg: Message) => {
    try {
        const func = flows[msg.action];
        return func(msg);
    } catch (err) {
        log('failed to procedure', LogLevel.error, err);
        return false;
    }
}

function saveFlowConfig (msg: Message) {
    const fs = require('fs');
    fs.writeFileSync(msg.payload.flowName + ".json", JSON.stringify(msg.payload.data));
    return "save succeeded";
}
function loadFlowConfig (msg: Message) {
    const fs = require('fs');
    const data = fs.readFileSync(msg.payload.flowName + ".json",{encoding:'utf8', flag:'r'});
    return data;
}
