import { PluginMessage } from "@messages/sender";

export default class PluginCommunicator {
    static _messageResolvers: Map<string, (value: any) => void> = new Map();
    static _seq = 0;

    static init(): void {
        window.onmessage = (
            event: MessageEvent<{ type: PluginMessage; seq?: string, data: any }>
        ) => {
            const { type, seq, data } = event.data;
            console.info("Receive message from main thread: ", event.data);

            // trigger the resolver that `send` method created
            if (seq && this._messageResolvers.has(seq)) {
                this._messageResolvers.get(seq)!(data);
            }
        };
    }

    static send(data: any): Promise<any> {
        return new Promise((resolve) => {
            const seq = `ui_${this._seq++}`;
            data["seq"] = seq;
            parent.postMessage(data, "*");
            this._messageResolvers.set(seq, resolve);
        });
    }

}
