import { Cfg } from "../Common/Constant";
import { GameData } from "../Config/config";
import HudControl from "../Gameplay/HudControl";
import PopupLayer from "../Gameplay/PopupLayer";
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import ActivityManager from "./ActivityManager";
import { Nullable } from "./ObjectPool";
import OrientationManager from "./OrientationManager";

const {ccclass, property} = cc._decorator;

@ccclass('GameManager')
export class GameManager extends OrientationManager {

    @property(HudControl)
    hudContol: Nullable<HudControl> = null;

    @property(PopupLayer)
    popupLayer: Nullable<PopupLayer> = null;

    private currentHealthCount: number = 0;
    private totalPointCount: number = 0;
    private totalConnection: number = 0;
    private totalDisConnection: number = 0;
    
    currentTower: number = 0;
    currentQuestion : number = 0;
    currentRetryCount :number = -1;

    protected onEnable(): void {
        clientEvent.on(EventName.IncreasePoints, this.increasePoint, this);
        clientEvent.on(EventName.DecreaseHealth, this.decreaseHealth, this);
        clientEvent.on(EventName.IncreaseConnection, this.increaseConnection, this);
        clientEvent.on(EventName.DecreaseConnection, this.increaseDisConnection, this);
    }
    protected onDisable(): void {
        clientEvent.off(EventName.IncreasePoints, this.increasePoint, this);
        clientEvent.off(EventName.DecreaseHealth, this.decreaseHealth, this);
        clientEvent.off(EventName.IncreaseConnection, this.increaseConnection, this);
        clientEvent.off(EventName.DecreaseConnection, this.increaseDisConnection, this);
    }
    onStart(){
        this.currentRetryCount = -1
        ActivityManager.instance.currentRetryCount = this.currentRetryCount
    }
    initialise(){
        ActivityManager.instance.initialGameTime = new Date();
        ActivityManager.instance.gamePaused(false);
        ActivityManager.instance.totalPoint = 0;
        ActivityManager.instance.totalConnection = 0;
        ActivityManager.instance.totalDisConnection = 0;
        this.totalPointCount = 0;
        this.totalConnection = 0;
        this.totalDisConnection = 0;
        this.currentTower = -1;
        this.currentHealthCount = GameData.healthCount;
        this.currentRetryCount += 1;
        
        ActivityManager.instance.currentRetryCount++;

        this.currentQuestion = 0;

        this.hudContol.initialiseLives(this.currentHealthCount);
        Cfg.assessmentdetailuserlogData = [];
    }

    decreaseHealth(healthDecreaseValue : number){
        this.currentHealthCount -= healthDecreaseValue;
        this.hudContol.setLives(this.currentHealthCount);
        ActivityManager.instance.gamePaused(true);
        if(this.currentHealthCount <= 0){
            this.popupLayer.showAllLifeLost();
        }
        else
        {
            this.popupLayer.showLifeLost();
        }
    }

    increasePoint(point : number){
        this.totalPointCount += point;
        ActivityManager.instance.totalPoint = this.totalPointCount
        this.hudContol.setPoint(this.totalPointCount);
    }

    increaseConnection(){
        this.totalConnection++;
        ActivityManager.instance.totalConnection = this.totalConnection;
        this.hudContol.setConnection(this.totalConnection);
    }
    increaseDisConnection(){
        this.totalDisConnection++;
        ActivityManager.instance.totalDisConnection = this.totalDisConnection;
        this.hudContol.setDisConnection(this.totalDisConnection);
    }
}
