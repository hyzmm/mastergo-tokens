// 插件发出的消息
import PluginCommunicator from "@ui/PluginCommunicator";

export enum PluginMessage {}

//UI发出的消息
export enum UIMessage {
    STORAGE_SET,
    STORAGE_GET,
    GET_TOKENS,
    APPLY_THEME,
}

export type MessageType = {
    type: UIMessage | PluginMessage;
    data?: any;
    seq?: string;
};

/**
 * 向UI发送消息
 */
export const sendMsgToUI = (data: MessageType) => {
    mg.ui.postMessage(data, "*");
};

export async function storageGet(key: string): Promise<any> {
    return PluginCommunicator.send({ type: UIMessage.STORAGE_GET, data: key });
}

export async function storageSet(key: string, value: any): Promise<void> {
    return PluginCommunicator.send({
        type: UIMessage.STORAGE_SET, data: {
            key, data: value
        }
    });
}