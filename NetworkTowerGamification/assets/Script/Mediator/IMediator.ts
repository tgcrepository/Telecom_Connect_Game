import { IMediatorListenser } from "./IMediatorListenser"

export interface IMediator {
    send(sender: object, ...args: any): void
    register(Listenser: IMediatorListenser): IMediator
}
