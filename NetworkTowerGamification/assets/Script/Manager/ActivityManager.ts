
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import { ScreenOrientation } from "./OrientationManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityManager extends cc.Component {

    private static _instance: ActivityManager;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new ActivityManager();
        return this._instance;
    }


    private currentScreenOrientation: ScreenOrientation = ScreenOrientation.LANDSCAPE;
    public get currentOrientation(): ScreenOrientation {
        return this.currentScreenOrientation;
    }
    public set currentOrientation(v: ScreenOrientation) {
        this.currentScreenOrientation = v;
        clientEvent.dispatchEvent(EventName.OnOrientationChange, {
            currentOrientation: this.currentScreenOrientation
        });
    }


    private _isGamePaused: boolean = false;
    public get isGamePaused(): boolean {
        return this._isGamePaused;
    }
    public set isGamePaused(v: boolean) {
        this._isGamePaused = v;
    }
    canvasWidth = 0;
    canvasHeight = 0;

    private _quitButtonEnabled: boolean = true;
    public get quitButtonEnabled(): boolean {
        return this._quitButtonEnabled;
    }
    public set quitButtonEnabled(v: boolean) {
        this._quitButtonEnabled = v;
    }

    totalPoint: number = 0;
    totalConnection: number = 0;
    totalDisConnection: number = 0;
    initialGameTime : Date = null;
    currentRetryCount :number = -1;

    // init AudioManager in GameRoot.
    init() {

    }

    enableQuitButton(enabled : boolean){
        this.quitButtonEnabled = enabled;
    }

    gamePaused(paused : boolean){
        this.isGamePaused = paused;
    }
}
