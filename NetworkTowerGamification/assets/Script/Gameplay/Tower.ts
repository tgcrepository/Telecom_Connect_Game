// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CommonFun from "../Common/CommonFun";
import { GREEN_COLOR, ORANGE_COLOR } from "../Config/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tower extends cc.Component {

    @property(cc.Node)
    signalNode: cc.Node[] = [];

    @property(cc.Node)
    connection1: cc.Node = null;

    @property(cc.Node)
    connection2: cc.Node = null;

    @property(cc.Node)
    cross1: cc.Node = null;

    @property(cc.Node)
    cross2: cc.Node = null;

    private connection1Present = false;
    private connection2Present = false;

    start () {

    }

    initialise(){
        this.signalNode.forEach(node => {
            node.active = false;
        });
        this.connection1.active = false;
        this.connection2.active = false;
    }

    showConnection (isTop : boolean = false) {
        if(isTop){
            this.connection1Present = true;
            this.connection1.active = true;
            this.connection1.color = CommonFun.instance.hexToRgb(GREEN_COLOR);

            this.connection1.width = 0;
            cc.tween(this.connection1)
                .to(1, { width: 63 }, { easing: 'linear' }) // Animate to 63 in 0.5 seconds
                .start();

        }
        else{
            this.connection2Present = true;
            this.connection2.active = true;
            this.connection2.color = CommonFun.instance.hexToRgb(GREEN_COLOR);

            this.connection2.width = 0;
            cc.tween(this.connection2)
                .to(1, { width: 63 }, { easing: 'linear' }) // Animate to 63 in 0.5 seconds
                .start();
        }
    }

    hideConnection (isTop : boolean = false) {
        if(isTop){
            this.connection1Present = false;
            this.cross1.active = true;
            this.connection1.color = CommonFun.instance.hexToRgb(ORANGE_COLOR);

            this.connection1.width = 63;
            cc.tween(this.connection1)
                .to(1, { width: 0 }, { easing: 'linear' }) // Animate to 63 in 0.5 seconds
                .start();

            setTimeout(() => {
                this.cross1.active = false;
                this.connection1.active = false;
            }, 2000);
        }
        else{
            this.connection2Present = false;
            this.cross2.active = true;
            this.connection2.color = CommonFun.instance.hexToRgb(ORANGE_COLOR);

            this.connection2.width = 63;
            cc.tween(this.connection2)
                .to(1, { width: 0 }, { easing: 'linear' }) // Animate to 63 in 0.5 seconds
                .start();

            setTimeout(() => {
                this.connection2.active = false;
                this.cross2.active = false;
            }, 2000);
        }
    }

    checkSignal(){
        this.signalNode.forEach(node => {
            node.active = this.connection1Present || this.connection2Present;
        });
    }

    showSignal(show){
        this.signalNode.forEach(node => {
            node.active = show;
        });
    }
}
