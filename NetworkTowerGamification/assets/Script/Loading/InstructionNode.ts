

import audioManager from "../Common/audioManager";
import CommonFun from "../Common/CommonFun";
import { Cfg, Constant } from "../Common/Constant";
import DashBoard from "../Gameplay/DashBoard";
import LeaderBoard from "../Gameplay/LeaderBoard";
import OrientationManager from "../Manager/OrientationManager";
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import Utils from "../Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InstructionNode extends OrientationManager {

    @property(cc.Node)
    instructionPanel: cc.Node = null;

    @property(cc.Node)
    leaderBoardNode: cc.Node = null;

    @property(cc.Button)
    leaderBoardBtn: cc.Button = null;

    @property(cc.Node)
    leaderBoardPanel: cc.Node = null;
    @property(cc.Prefab)
    leaderBoardPrefab: cc.Prefab = null;
    @property(cc.Node)
    contentScrollData: cc.Node = null;

    @property(LeaderBoard)
    myBoard: LeaderBoard = null;


    @property(cc.Node)
    dashBoardPanel: cc.Node = null;
    @property(cc.Button)
    dashBoardBtn: cc.Button = null;

    @property(cc.Node)
    attemptContent: cc.Node = null;
    @property(cc.Label)
    attemptContentLabelNode: cc.Label = null;
    @property(cc.Prefab)
    dashBoardPrefab: cc.Prefab = null;
    @property(cc.Node)
    contentdashBoardScrollData: cc.Node = null;
    @property(cc.Label)
    connectionLabel: cc.Label = null;
    @property(cc.Label)
    disConnectionLabel: cc.Label = null;
    @property(cc.ScrollView)
    boardScrollView: cc.ScrollView = null;

    @property(cc.Node)
    boardPanel: cc.Node = null;
    @property(cc.Node)
    noboardPanel: cc.Node = null;

    private groupedData: Record<number, any[]> = {}; // Object to store grouped attempts

    private leaderBoardClicked : boolean = false;
    private dashBoardClicked : boolean = false;

    // onLoad () {}

    start () {
        super.start();  
        this.showButton(false);

        cc.game.addPersistRootNode(this.node);
    }
    protected onEnable(): void {
        clientEvent.on(EventName.ShowInstructionPanel, this.onInstructionClicked, this);
        clientEvent.on(EventName.CloseInstructionPanel, this.onCloseInstructionPanel, this);
        clientEvent.on(EventName.showLeaderBoardPanel, this.showLeaderBoard, this);
        clientEvent.on(EventName.showDashBoardPanel, this.showDashBoard, this);
        clientEvent.on(EventName.ShowButton, this.showButton, this);
    }
    protected onDisable(): void {
        clientEvent.off(EventName.ShowInstructionPanel, this.onInstructionClicked, this);
        clientEvent.off(EventName.CloseInstructionPanel, this.onCloseInstructionPanel, this);
        clientEvent.off(EventName.showLeaderBoardPanel, this.showLeaderBoard, this);
        clientEvent.off(EventName.showDashBoardPanel, this.showDashBoard, this);
        clientEvent.off(EventName.ShowButton, this.showButton, this);
    }

    onStartClicked(){
        this.showButton(false);
        clientEvent.dispatchEvent(EventName.CloseInstructionPanel);
        Utils.loadScene(Constant.GAMESCENE);
        // clientEvent.dispatchEvent(EventName.ShowInstructionPanel);
    }

    onInstructionClicked(){
        this.showButton(true);

        this.instructionPanel.active = true;
        clientEvent.dispatchEvent(EventName.OnInstructionShown);
    }
    onCloseInstructionPanel(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.instructionPanel.active = false;
    }

    onCloseClicked(){
        this.instructionPanel.active = false;
        clientEvent.dispatchEvent(EventName.OnInstructionHidden);
    }

    showButton(isActive: boolean = true){
        this.dashBoardBtn.node.active = isActive;
        this.leaderBoardBtn.node.active = isActive;

        if(isActive){
            this.leaderBoardNode.active = Cfg.isAuthOn
            this.dashBoardBtn.node.active = Cfg.isAuthOn;
        }
    }




    showLeaderBoard(){
        if(this.leaderBoardClicked) return;
        this.leaderBoardClicked = true;
        this.dashBoardClicked = false;
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);

        this.leaderBoardBtn.interactable = false;
        this.leaderBoardBtn.node.opacity = 150;
        this.dashBoardBtn.interactable = false;

        this.contentScrollData.removeAllChildren();
        const configParams = {
            "id_game": Cfg.idgame,
            "ID_ORGANIZATION": (Cfg.ID_ORGANIZATION).toString()
        }

        Utils.getHttp(
            Cfg.gameLeaderBoard,
            configParams,
            (err, response) => {
                if (err) {
                    return;
                }

                let jsonObject = (JSON.parse(response));
                
                this.showLeaderData(jsonObject.leaderboard);
            }
        );
    }

    showLeaderData(data){
        this.dashBoardBtn.interactable = true;
        this.dashBoardBtn.node.opacity = 255;
        this.dashBoardPanel.active = false;

        data.forEach((element, index) => {
            const leaderBoard = cc.instantiate(this.leaderBoardPrefab);
            leaderBoard.active = true;
            leaderBoard.parent = this.contentScrollData;
            leaderBoard.getComponent(LeaderBoard).initilaise(element.rank, element.name, element.total_score, element.id_user === Cfg.Id_User);
            if(element.id_user === Cfg.Id_User){
                this.myBoard.node.active = true;
                this.myBoard.initilaise(element.rank, element.name, element.total_score, element.id_user === Cfg.Id_User);
            }
        });
        this.contentScrollData.getComponent(cc.Layout).updateLayout();
        this.leaderBoardPanel.active = true;
    }

    onCloseLeaderBoardClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.leaderBoardBtn.interactable = true;
        this.leaderBoardBtn.node.opacity = 255;
        this.leaderBoardPanel.active = false;
        this.leaderBoardClicked = false;
    }

    showDashBoard(){
        if(this.dashBoardClicked) return;
        this.dashBoardClicked = true;
        this.leaderBoardClicked = false;
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);

        this.dashBoardBtn.interactable = false;
        this.dashBoardBtn.node.opacity = 150;
        this.leaderBoardBtn.interactable = false;

        this.contentScrollData.removeAllChildren();
        const configParams = {
            "UID": Cfg.UID,
        }

        Utils.getHttp(
            Cfg.gameDashBoard,
            configParams,
            (err, response) => {
                if (err) {
                    return;
                }

                let jsonObject = (JSON.parse(response));
                
                this.showDashBoardData(jsonObject);
            }
        );
    }

    showDashBoardData(data){
        this.leaderBoardBtn.interactable = true;
        this.leaderBoardBtn.node.opacity = 255;
        this.leaderBoardPanel.active = false;


        this.dashBoardPanel.active = true;
        if(data.length === 0){
            this.boardPanel.active = false;
            this.noboardPanel.active = true;
            return
        }
        this.boardPanel.active = true;
        this.noboardPanel.active = false;

        this.groupedData = []
        data.forEach((element) => {
            const attemptNo = element.attempt_no;
            
            if (!this.groupedData[attemptNo]) {
                this.groupedData[attemptNo] = [];
            }
            
            this.groupedData[attemptNo].push(element);
        });

        const attemptKeys = Object.keys(this.groupedData).map(Number).sort((a, b) => a - b);
        const attemptCount = attemptKeys.length;
        this.attemptContent.removeAllChildren();

        const firstKey = attemptKeys.length > 0 ? attemptKeys[0] : null;
        attemptKeys.forEach((key, index) => {
            const element = cc.instantiate(this.attemptContentLabelNode.node);
            element.parent = this.attemptContent;
            element.active = true;

            const label = element.getComponent(cc.Label);
            label.string = "Attempt " + (key); // Use key instead of index
            label.enableUnderline = (index === 0);
            element.opacity = (index === 0) ? 255 : 100;

            // Add Button Component
            const button = element.addComponent(cc.Button);
        
            // Add Click Event Listener
            button.node.on(cc.Node.EventType.TOUCH_END, () => {
                this.onAttemptClick( element ,key);
            }, this);
        });

        if (firstKey !== null) {
            this.changeData(firstKey); // Pass the first key
        }
    }

    private changeData(attemptNum){
        this.contentdashBoardScrollData.removeAllChildren();
        let correctConnection = 0
        let correctDisConnection = 0
        this.groupedData[attemptNum].forEach((element, index) => {
            const leaderBoard = cc.instantiate(this.dashBoardPrefab);
            leaderBoard.active = true;
            leaderBoard.parent = this.contentdashBoardScrollData;
            leaderBoard.getComponent(DashBoard).initilaise((index+1)+". "+element.Assessment_Question, element.is_right);
            element.is_right ? correctConnection++ : correctDisConnection++
        });
        this.contentdashBoardScrollData.getComponent(cc.Layout).updateLayout();


        this.connectionLabel.string  = "Connections: "+(correctConnection.toString()).padStart(2, '0');
        this.disConnectionLabel.string  = "Disconnections: "+correctDisConnection.toString().padStart(2, '0');
    }

    // Function to handle click
    private onAttemptClick(ref: cc.Node, attemptNumber: number) {
        this.attemptContent.children.forEach(element => {
            element.getComponent(cc.Label).enableUnderline = ref.uuid === element.uuid
            element.opacity = ref.uuid === element.uuid ? 255 : 100
        });
        
        this.changeData(attemptNumber);
    }

    onCloseDashBoardClicked(){
        this.dashBoardClicked = false;
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.dashBoardBtn.interactable = true;
        this.dashBoardBtn.node.opacity = 255;
        this.dashBoardPanel.active = false;
    }
    onNextClick() {
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        const currentOffset = Math.abs(this.boardScrollView.getScrollOffset().x); // Get current X offset
        const stepSize = 200; // Adjust step size for smooth scrolling
        this.boardScrollView.scrollToOffset(new cc.Vec2(currentOffset+stepSize, 0), 0.5);
    }
    
    onPrevClick() {
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        const currentOffset = Math.abs(this.boardScrollView.getScrollOffset().x); // Get current X offset
        const stepSize = 200; // Adjust step size for smooth scrolling
        this.boardScrollView.scrollToOffset(new cc.Vec2(currentOffset-stepSize, 0), 0.5);
    }
}
