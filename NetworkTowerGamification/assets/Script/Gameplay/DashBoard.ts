
const { ccclass, property } = cc._decorator;

@ccclass
export default class DashBoard extends cc.Component {

    @property(cc.Label)
    questionLabel: cc.Label = null;
    @property(cc.Node)
    disconnection: cc.Node = null;
    @property(cc.Node)
    connection: cc.Node = null;

    initilaise(name: string, isConnected: boolean) {
        this.questionLabel.string = name;
        this.connection.active = isConnected;
        this.disconnection.active = !isConnected;
    }
}
