// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CommonFun from "./Common/CommonFun";
import { Cfg, Constant } from "./Common/Constant";
import audioManager from "./Common/audioManager";
import { GameData, IQuestionData } from "./Config/config";
import PopupLayer from "./Gameplay/PopupLayer";
import Tower from "./Gameplay/Tower";
import ActivityManager from "./Manager/ActivityManager";
import { GameManager } from "./Manager/GameManager";
import ObjectPool, { Nullable } from "./Manager/ObjectPool";
import { ScreenOrientation } from "./Manager/OrientationManager";
import { EventName } from "./Mediator/EventName";
import Utils from "./Utils";
import { clientEvent } from "./observer/clientEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gameplay extends cc.Component {

    @property(cc.Node)
    hudNode: cc.Node = null;
    @property(cc.Node)
    towerNodePanel: cc.Node = null;
    @property(cc.Node)
    loadingnode: cc.Node = null;
    

    @property(cc.Node)
    towerMainNode: cc.Node = null;
    @property(cc.Node)
    towerDialogNode: cc.Node[] = [];
    @property(Tower)
    towerNode: Tower[] = [];

    @property(PopupLayer)
    popupLayer: PopupLayer = null;
    @property(cc.Node)
    errorNode: cc.Node = null;

    @property(cc.Node)
    towerBlock: cc.Node = null;

    private gameManager: Nullable<GameManager> = null

    start () {      
        clientEvent.dispatchEvent(EventName.ShowButton, false)
        this.hudNode.active = false;
        this.towerNodePanel.active = false;
        this.loadingnode.active = true;

        this.gameManager = this.node.getComponent(GameManager);
        this.gameManager.initialise();

        this.towerMainNode.active = false;
        this.getGameDetail();

    }

    getGameDetail() {
        return new Promise((resolve, reject) => {
            const configParams = {
                "OrgID": Cfg.OrgID,
                "UID": Cfg.Id_User,
                "M2ostAssessmentId": Cfg.M2ostAssessmentId,
                "idgame": Cfg.idgame,
                "gameassid": Cfg.gameassid
            }

            Utils.getHttp(
                Cfg.envUrl+Cfg.gameDetailUrl,
                configParams,
                (err, response) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let jsonObject = JSON.parse(JSON.parse(response));


                    // let jsonObject = JSON.parse(Cfg.defaultQuestion);
                    this.updateAnsData(jsonObject);
                    resolve(0);
                }
            );
        });
    }

    updateAnsData(jsonObject: IQuestionData[]){
        Constant.GameQuestiondata = [];
        jsonObject.forEach(element => {
            Constant.GameQuestiondata.push(element);
        });

        this.hudNode.active = true;
        this.towerNodePanel.active = true;
        this.loadingnode.active = false;
        this.initialiseTower();

        this.moveInstruction(0)
    }

    protected onEnable(): void {
        clientEvent.on(EventName.ShowNextQuestionPanel, this.showQuestion, this);
        clientEvent.on(EventName.ShowPanel, this.moveInstruction, this);
    }
    protected onDisable(): void {
        clientEvent.off(EventName.ShowNextQuestionPanel, this.showQuestion, this);
        clientEvent.off(EventName.ShowPanel, this.moveInstruction, this);
    }

    private moveInstruction(dialogNo : number = 0, isCorrect : boolean = false, currentPoint : number = 0, isTimerRunOut : boolean = false){
        this.towerBlock.active = true
        this.errorNode.active = dialogNo === 2;

        if(dialogNo === 1 || dialogNo === 2)
            this.popupLayer.closeQuestionPopup(currentPoint > 0, isTimerRunOut);

        cc.tween(this.towerMainNode)
        .to(1, { position: cc.v3(this.towerMainNode.position.x, 0, 0) }, { easing: "sineOut" })
        .call(()=>{
            this.showDialog(dialogNo,isCorrect,currentPoint);
        })
        .start();
    }
    private showDialog(dialogNo : number = 0, isCorrect : boolean = false, currentPoint : number = 0){
        this.towerDialogNode.forEach((element,index) => {
            this.towerDialogNode[index].active = index === dialogNo
        });

        if(dialogNo === 1 || dialogNo === 2)
            this.signalConnect(isCorrect, currentPoint);

        setTimeout(() => {
            this.resetInstruction(dialogNo, currentPoint);
        }, 5000); // Wait 5 seconds
    }
    private resetInstruction(dialogNo : number = 0, currentPoint : number = 0){
        this.towerDialogNode.forEach((element,index) => {
            this.towerDialogNode[index].active = false
        });
        if(currentPoint <= 0 && (dialogNo === 1 || dialogNo === 2)){
            this.towerBlock.active = false
            clientEvent.dispatchEvent(EventName.DecreaseHealth, 1);
            this.towerMainNode.active = false;
        }

        cc.tween(this.towerMainNode)
        .to(1, { position: cc.v3(this.towerMainNode.position.x, 100, 0) }, { easing: "sineOut" })
        .call(()=>{
            if(dialogNo === 1 || dialogNo === 2){
                if(currentPoint > 0){
                    this.towerBlock.active = false
                    this.popupLayer.checkNextGame();
                }
            }
            else{
                this.towerBlock.active = false
                this.popupLayer.checkNextGame();
            }
        })
        .start();
    }

    showQuestion(){
        this.errorNode.active = false;
        this.towerMainNode.active = true;
        clientEvent.dispatchEvent(EventName.ShowQuestionPanel, this.gameManager.currentQuestion);
        this.gameManager.currentQuestion++;
    }

    initialiseTower(){
        const totalTowerToDisplay = Constant.GameQuestiondata.length-1 > 6 ? this.towerNode.length : Constant.GameQuestiondata.length
        for (let i = 0; i < this.towerNode.length; i++) {
            const element = this.towerNode[i];
            element.initialise();
            element.node.active = i <= totalTowerToDisplay;
        }

        this.towerMainNode.active = true;
    }

    signalConnect(isCorrect : boolean = false, currentPoint : number = 0){
        if(currentPoint > 0){
            clientEvent.dispatchEvent(EventName.IncreaseConnection);
        }
        else{
            clientEvent.dispatchEvent(EventName.DecreaseConnection);
        }

        if(isCorrect)
            this.gameManager.currentTower++;
        else{
            if(this.gameManager.currentTower < 6)
                this.gameManager.currentTower--;
        }

        if(this.gameManager.currentTower < 0)
            this.gameManager.currentTower = -1;

        let currentTowerIndex = this.gameManager.currentTower%6;
        if(!isCorrect) {
            if(this.gameManager.currentTower < 6)
                currentTowerIndex++
        }

        const element = this.towerNode[currentTowerIndex];
        if(element){
            if(isCorrect)
                element.showConnection(this.gameManager.currentTower < 6);
            else
                element.hideConnection(this.gameManager.currentTower < 6);
            element.checkSignal();
        }

        if(currentTowerIndex+1 < 5){
            const element1 = this.towerNode[currentTowerIndex+1];
            element1.showSignal(isCorrect)
        }


        if(!isCorrect){
            if(this.gameManager.currentTower >= 6)
                this.gameManager.currentTower--;
        }

    }
    
}
