
import { Cfg, Constant } from "../Common/Constant";
import { IQuestionData } from "../Config/config";
import GoogleSignIn from "../GoogleAuth";
import OrientationManager from "../Manager/OrientationManager";
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import Utils from "../Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingScene extends OrientationManager {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    
    apiLoaded : boolean = false;
    progressLoaded : boolean = false;

    start () {
        Constant.AssignData();
        super.start();  
        this.preloadScene(Constant.GAMESCENE);
        
        this.fetchAuthConfig();
    }

    protected onEnable(): void {
        clientEvent.on(EventName.OnGoogleSignInCompleted, this.loadAuthData, this);
    }
    protected onDisable(): void {
        clientEvent.off(EventName.OnGoogleSignInCompleted, this.loadAuthData, this);
    }

    fetchAuthConfig() {
        //override auth config with params return from url
        let urlVals = Utils.getUrlVars();
        Cfg.gameassid = (215).toString()
        if (urlVals["gameassid"]) {
            Cfg.gameassid = urlVals["gameassid"];
        }
        if (urlVals["Email"]) {
            Cfg.Email = urlVals["Email"];
        }
        if (urlVals["OrgID"]) {
            Cfg.OrgID = urlVals["OrgID"];
        }
        if (urlVals["M2ostAssessmentId"]) {
            Cfg.M2ostAssessmentId = urlVals["M2ostAssessmentId"];
        }
        Cfg.idgame = (34).toString()
        if (urlVals["idgame"]) {
            Cfg.idgame = urlVals["idgame"];
        }
        if (urlVals["Source"]) {
            Cfg.Source = urlVals["Source"];
        }
        if (urlVals["env"]) {
            Cfg.envUrl = urlVals["env"];
        }
        if (urlVals["UID"]) {
            Cfg.UID = urlVals["UID"];
        }
    }


    loadAuthData() {
        // get game config
        const configParams = {
            "OrgID": Cfg.OrgID,
            "Email": Cfg.Email
        }

        Utils.getHttp(
            Cfg.envUrl+Cfg.gameAuthUrl,
            configParams,
            (err, response) => {
                if (err) {
                    return;
                }

                let jsonObject = JSON.parse(JSON.parse(response));

                Cfg.Id_User = jsonObject.Id_User;
                Cfg.IsActive = jsonObject.IsActive;
                Cfg.ID_ORGANIZATION = jsonObject.ID_ORGANIZATION;
                
                this.apiLoaded = true;
                    
                clientEvent.dispatchEvent(EventName.ShowInstructionPanel);
            }
        );
    }

    // update (dt) {}
    preloadScene(sceneName) {
        cc.director.preloadScene(sceneName, (completedCount, totalCount, item) => {
            let progress = (completedCount / totalCount) * 100;
            this.progressBar.progress = progress/100;
        }, (error) => {
            if (error) {
                console.error(`Failed to preload scene: ${sceneName}`, error);
            } else {
                console.log(`${sceneName} preloaded successfully.`);
                this.progressLoaded = true;
                this.checkGameLoaded();
            }
        });
    }

    checkGameLoaded(){
        if(this.progressLoaded){
            this.progressBar.node.active = false;
            if(Cfg.isAuthOn)
                this.node.getComponent(GoogleSignIn)?.loadGoogleSDK();
            else
                this.loadAuthData();
        }
    }
}
