import {Logger, LogLevel, Message} from "@asmtechno/service-lib";

const log = (msg: string, level: LogLevel, data?) => Logger.getInstance().log("amqp.controller::" + msg, level, data);

export async function handlingAMQPMessages(msg, ch): Promise<boolean> {
    try {
        const message = Message.clone(JSON.parse(msg.content.toString().trim())) as Message;
        log(`handlingPublisherAQMP:Received routing: ${msg?.fields?.routingKey}`, LogLevel.info,
            {msg: message, size: msg.content.toString().length});

        return true;
    } catch (err) {
        log('handlingPublisherAQMP failed', LogLevel.error, {err, msg});
        return true;
    }
}
