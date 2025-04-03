
import { Constructor } from "../../Manager/RootData";
import { IMediator } from "./IMediator";
import { IMediatorListenser } from "./IMediatorListenser";


export class OneToOneListenser implements IMediator {
    private Listenser1: IMediatorListenser;
    private Listenser2: IMediatorListenser;

    public send(sender: object, ...args: any): void {
        if (sender == this.Listenser1) {
            this.Listenser2?.notify.apply(this.Listenser2, args)
        } else {
            this.Listenser1?.notify.apply(this.Listenser1, args)
        }
    }

    register(Listenser: IMediatorListenser): IMediator {
        if (this.Listenser1 == null) {
            this.Listenser1 = Listenser;
            this.Listenser1.setMediator(this);
            return this;
        };
        if (this.Listenser2 == null) {
            this.Listenser2 = Listenser;
            this.Listenser2.setMediator(this);
            return this;
        };
        return null;
    }

}

