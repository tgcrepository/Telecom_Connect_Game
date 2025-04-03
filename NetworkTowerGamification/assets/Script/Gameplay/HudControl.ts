// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import audioManager from "../Common/audioManager";
import CommonFun from "../Common/CommonFun";
import LifePanel from "../Hud/LifePanel";
import ActivityManager from "../Manager/ActivityManager";
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HudControl extends cc.Component {

    @property(cc.Label)
    pointsLabel: cc.Label = null;
    @property(cc.Label)
    ConnectionLabel: cc.Label = null;
    @property(cc.Label)
    disConnectionLabel: cc.Label = null;

    @property(cc.Node)
    lifePanel: cc.Node = null;
    @property(cc.Prefab)
    lifeBasse: cc.Prefab = null;
    private lifeArray : cc.Node[] = [];

    currentCountDown : number = 0;

    onLoad () {
        this.lifeArray = [];
    }

    initialiseLives(lifeCount : number){
        for (let i = 0; i < lifeCount; i++) {
            const life = cc.instantiate(this.lifeBasse);
            life.setParent(this.lifePanel);
            this.lifeArray.push(life);
        }
    }

    setLives(lifeCount : number){
        for (let i = 0; i < this.lifeArray.length; i++) {
            const life = this.lifeArray[i];
            const lifePanelComp = life.getComponent(LifePanel);
            if(lifePanelComp){
                lifePanelComp.toggleLife(i < lifeCount);
            }
        }
    }



    setPoint(pointCount : number){
        this.pointsLabel.string = "Points: "+(pointCount.toString()).padStart(2, '0');
    }
    setConnection(count : number){
        this.ConnectionLabel.string = "Connections: "+count.toString().padStart(2, '0');
    }
    setDisConnection(count : number){
        this.disConnectionLabel.string = "Disconnections: "+count.toString().padStart(2, '0');
    }


    onQuitClicked(){
        if(!ActivityManager.instance.quitButtonEnabled) return;
        ActivityManager.instance.enableQuitButton(false);
        clientEvent.dispatchEvent(EventName.ShowQuitPopup);
    }
}
