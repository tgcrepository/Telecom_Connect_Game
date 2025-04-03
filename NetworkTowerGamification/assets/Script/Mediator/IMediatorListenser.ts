import { IMediator } from "./IMediator";

export interface IMediatorListenser {
    notify(sender: object, ...args: any): void;
    send(sender: object, ...args: any): void;
    setMediator(mediator: IMediator)
}
