
const { ccclass, property } = cc._decorator;

@ccclass
export default class LeaderBoard extends cc.Component {

    @property(cc.Node)
    selected: cc.Node = null;

    @property(cc.Label)
    srnoLabel: cc.Label = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Label)
    pointLabel: cc.Label = null;

    initilaise(srno: string, name: string, point: string, isPlayer: boolean) {
        this.srnoLabel.string = srno;
        this.nameLabel.string = name;
        this.pointLabel.string = point;
        if (isPlayer) {
            this.selected.active = true;
        } else {
            this.selected.active = false;
        }
    }
}
