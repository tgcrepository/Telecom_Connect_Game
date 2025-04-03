// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import audioManager from "../Common/audioManager";
import CommonFun from "../Common/CommonFun";
import { Constant } from "../Common/Constant";

const {ccclass, property} = cc._decorator;

@ccclass
export default class persistentScript extends cc.Component {

    @property(cc.AudioClip)
    public bgmClip = null;

    @property(cc.AudioClip)
    public incorrectSound  = null;

    @property(cc.AudioClip)
    public correctSound  = null;

    @property(cc.AudioClip)
    public clockTimerSound  = null;

    @property(cc.AudioClip)
    public buttonClickSound  = null;

    @property(cc.AudioClip)
    public gameOverSound  = null;

    @property(cc.AudioClip)
    public blastSound  = null;

    @property(cc.AudioClip)
    public bulletSound  = null;

    // onLoad () {}

    start () {
        cc.game.addPersistRootNode(this.node);// init AudioManager

        CommonFun.instance.persisitentNode = this.node;
        CommonFun.instance.persisitentRef = this;

        audioManager.instance.init();

        var url_string = window.location.href
        var url = new URL(url_string);
        var isAudio = url.searchParams.get("soundSetting"); //= ///"true";
        var age = url.searchParams.get("age");

        if(isAudio)
        {
            if((isAudio.toLowerCase() === 'true'))
                window.localStorage.setItem("soundEnabled", "1");
            else if((isAudio.toLowerCase() === 'false'))
                window.localStorage.setItem("soundEnabled", "0");
            else    
                window.localStorage.setItem("soundEnabled", "1");
        }

        // this.checkAudio(false);
    }

    onEnable() {
        audioManager.instance.playMusic(this.bgmClip);
        audioManager.instance.checkSound();
    }
}
