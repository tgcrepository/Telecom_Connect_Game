// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constructor } from "../../Manager/RootData";
import { IMediator } from "./IMediator";
import { IMediatorListenser } from "./IMediatorListenser";

export class GlobalMediator {
    static connecters: { [name: string]: IMediator };

    register(key: string, constructor: Constructor<IMediator>, Listenser: IMediatorListenser): IMediator {
        let connecter = GlobalMediator.connecters[key]
        if (connecter) {
            return connecter.register(Listenser)
        }
        connecter = new constructor()
        GlobalMediator.connecters[key] = connecter;
        return connecter.register(Listenser)
    }
}
