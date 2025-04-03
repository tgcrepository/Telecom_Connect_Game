
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import ActivityManager from "./ActivityManager";

// import ActivityManager, { ScreenOrientation } from "./ActivityManager";
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;

const { ccclass, property } = cc._decorator;
export enum ScreenOrientation {
    PORTRAIT = 0, 
    LANDSCAPE,
    AUTO
}

const scaleFactor = 1;

@ccclass
export default class OrientationManager extends cc.Component {
    public screenRatio: number;
    public _designWidthPortrait: number = 540*scaleFactor;
    public _designHeightPortrait: number = 960*scaleFactor;
    public _designWidthLandscape: number = 960*1.5;
    public _designHeightLandscape: number = 540*1.5;
    public _maxWidth: number = 2000*scaleFactor;
    public _maxHeight: number = 2000*scaleFactor;
    public _width: number;
    public _height: number;


    // @property(cc.Node)
    // portraitNodeList: cc.Node[] = [];
    // @property(cc.Node)
    // landscapeNodeList: cc.Node[] = [];

    // @property(cc.Node)
    // bg: cc.Node = null;

    onLoad() {
        // cc.view.on('canvas-resize', this.ScreenAdapter, this);
        // cc.view.enableAutoFullScreen(false);
    }

    start() {
        // this.ScreenAdapter();
    }
    // ScreenAdapter() {
    //     this._width = cc.view.getFrameSize().width;
    //     this._height = cc.view.getFrameSize().height;
    //     this.screenRatio = this._width / this._height;
    //     let orientation: ScreenOrientation = ScreenOrientation.PORTRAIT;

    //     if (this.screenRatio > 1) {
    //         ActivityManager.instance.currentOrientation = ScreenOrientation.LANDSCAPE;
    //         this.SetLandscapeOrientation();
    //     } else {
    //         ActivityManager.instance.currentOrientation = ScreenOrientation.PORTRAIT;
    //         this.SetPortraitOrientation();
    //     }
    //     this.ActivatePortraitLandcape();
    // }
    // SetDesignResolution(_designWidthPortrait: number, _designHeightPortrait: number) {
    //     cc.view.setDesignResolutionSize(_designWidthPortrait, _designHeightPortrait, 5);

    //     if(this.bg){
    //         this.bg.width = _designWidthPortrait;
    //         this.bg.height = _designHeightPortrait;
    //     }

    //     const interval = setTimeout(() => {
    //         ActivityManager.instance.canvasWidth = this.node.width;
    //         ActivityManager.instance.canvasHeight = this.node.height;
    //         clientEvent.dispatchEvent(EventName.OnCanvasSizeChanged);
    //     }, 10);

    //     this.ActivatePortraitLandcape();
    // }
    // ActivatePortraitLandcape(){
    //     this.portraitNodeList.forEach(element => {
    //         element.active = ActivityManager.instance.currentOrientation == ScreenOrientation.PORTRAIT ? true : false;
    //     });
    //     this.landscapeNodeList.forEach(element => {
    //         element.active = ActivityManager.instance.currentOrientation == ScreenOrientation.LANDSCAPE ? true : false;
    //     });
    // }
    // SetPortraitOrientation() {
    //     if(this.node.getComponent(cc.Canvas)){
    //         if (this.screenRatio <= this._designWidthPortrait / this._maxHeight) {
    //             this.node.getComponent(cc.Canvas).fitHeight = true;
    //             this.node.getComponent(cc.Canvas).fitWidth = true;
    //             this.SetDesignResolution(this._designWidthPortrait, this._maxHeight);
    //         }
    //         else if (this.screenRatio <= this._designWidthPortrait / this._designHeightPortrait) {
    //             this.node.getComponent(cc.Canvas).fitHeight = false;
    //             this.node.getComponent(cc.Canvas).fitWidth = true;
    //             this.SetDesignResolution(this._designWidthPortrait, this._designHeightPortrait);
    //         }
    //         else if (this.screenRatio <= this._designHeightPortrait / this._designWidthPortrait) {
    //             this.node.getComponent(cc.Canvas).fitHeight = true;
    //             this.node.getComponent(cc.Canvas).fitWidth = false;
    //             this.SetDesignResolution(this._designWidthPortrait, this._designHeightPortrait);
    //         }
    //         else {
    //             this.node.getComponent(cc.Canvas).fitHeight = true;
    //             this.node.getComponent(cc.Canvas).fitWidth = true;
    //             this.SetDesignResolution(this._maxWidth, this._designHeightPortrait);
    //         }
    //     }
    // }
    // SetLandscapeOrientation() {
    //     if(this.node.getComponent(cc.Canvas)){
    //         if (this.screenRatio <= this._designWidthLandscape / this._designHeightLandscape) {
    //             this.node.getComponent(cc.Canvas).fitHeight = false;
    //             this.node.getComponent(cc.Canvas).fitWidth = true;
    //             this.SetDesignResolution(this._designWidthLandscape, this._designHeightLandscape);
    //         }
    //         else if (this.screenRatio <= this._maxHeight / this._designHeightLandscape) {
    //             this.node.getComponent(cc.Canvas).fitHeight = true;
    //             this.node.getComponent(cc.Canvas).fitWidth = false;
    //             this.SetDesignResolution(this._designWidthLandscape, this._designHeightLandscape);
    //         }
    //         else {
    //             this.node.getComponent(cc.Canvas).fitHeight = true;
    //             this.node.getComponent(cc.Canvas).fitWidth = true;
    //             this.SetDesignResolution(this._maxWidth, this._designHeightPortrait);
    //         }
    //     }
    // }
}

