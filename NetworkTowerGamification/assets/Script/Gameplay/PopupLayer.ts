// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import audioManager from "../Common/audioManager";
import CommonFun from "../Common/CommonFun";
import { Cfg, Constant } from "../Common/Constant";
import { GameData, GREEN_COLOR, IQuestionData, MODERATE_COLOR, ORANGE_COLOR } from "../Config/config";
import ActivityManager from "../Manager/ActivityManager";
import { EventName } from "../Mediator/EventName";
import { clientEvent } from "../observer/clientEvent";
import Utils from "../Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopupLayer extends cc.Component {

    @property(cc.Node)
    lifeLostPopup: cc.Node = null;
    
    @property(cc.Node)
    allLifeLostPopup: cc.Node = null;
    
    @property(cc.Node)
    quitGamePopup: cc.Node = null;
    
    @property(cc.Node)
    gameOverPopup: cc.Node = null;

    @property(cc.Node)
    linuxPopup: cc.Node = null;

    @property(cc.Node)
    loguotpopup: cc.Node = null;


    @property(cc.Node)
    questionPanel: cc.Node = null;
    @property(cc.Label)
    questionLabel: cc.Label = null;
    @property(cc.Sprite)
    questionBarTimer: cc.Sprite = null;
    @property(cc.Label)
    questionTimer: cc.Label = null;
    @property(cc.Node)
    optionPanel: cc.Node[] = [];
    @property(cc.Node)
    timesUpNode: cc.Node = null;
    @property(cc.Label)
    lvlLabel: cc.Label = null;

    @property(cc.Node)
    gameOverPanelCloseButton: cc.Node = null;



    @property(cc.Node)
    ScoreBoardPopup: cc.Node = null;
    @property(cc.Label)
    connectionLabel: cc.Label = null;
    @property(cc.Label)
    disConnectionLabel: cc.Label = null;
    @property(cc.Label)
    strengthLabel: cc.Label = null;
    @property(cc.Label)
    strengthDescLabel: cc.Label = null;
    @property(cc.Label)
    pointLabel: cc.Label = null;
    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Node)
    restartBtn: cc.Node = null;
    @property(cc.Node)
    leaderBoardBtn: cc.Node = null;
    @property(cc.Node)
    dashBoardtBtn: cc.Node = null;


    private currentQuestionIndex : number = 0;
    private currentOptionIndex : number = 0;
    private currentTimer : number = 0;
    private currentTimerValue : number = 0;
    private correctOptions : number = 0;
    private lastQuestion : boolean = false;
    private pointIncrementVal : number = 0;

    private currentPopup : cc.Node|null = null

    private videoElement = null;

    start () {
        this.lifeLostPopup.active = false;

    }
    protected onEnable(): void {
        clientEvent.on(EventName.ShowQuitPopup, this.showQuitPopup, this);
        clientEvent.on(EventName.ShowQuestionPanel, this.showQuestionPanel, this);
    }
    protected onDisable(): void {
        clientEvent.off(EventName.ShowQuitPopup, this.showQuitPopup, this);
        clientEvent.off(EventName.ShowQuestionPanel, this.showQuestionPanel, this);
    }
    
    showLifeLost(){
        this.currentPopup = this.lifeLostPopup;
        this.lifeLostPopup.active = true;
    }
    onLifeLostOkClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.currentPopup = null;
        this.lifeLostPopup.active = false;
        this.checkNextGame();
    }

    showAllLifeLost(){
        this.currentPopup = null;
        this.allLifeLostPopup.active = true;
    }
    onRestartClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        Utils.loadScene(Constant.GAMESCENE);
    }
    onExitClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        if(Cfg.isLinux === 0)
            window.location.reload()
        else if(Cfg.isLinux === 1)
            window.location.replace(Cfg.pauseExitUrl);
        else
            this.showLinuxPopu()
    }

    showQuitPopup(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.currentPopup = this.quitGamePopup;
        this.quitGamePopup.active = true;
        ActivityManager.instance.gamePaused(true);
    }
    hideQuitPopup(){       
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.currentPopup = null;
        this.quitGamePopup.active = false;
        ActivityManager.instance.enableQuitButton(true);
    }
    showQuestionPanel(questionIndex : number = 0){
        this.currentQuestionIndex = questionIndex;
        this.currentPopup = null;

        const currentQuestion = Constant.GameQuestiondata[questionIndex];
        this.lastQuestion = (questionIndex >= Constant.GameQuestiondata.length-1)
        this.currentTimer = currentQuestion.Timer;
        this.currentTimerValue = currentQuestion.Timer;
        this.lvlLabel.string = "LVL "+(questionIndex+1);
        this.questionLabel.string = (questionIndex+1)+". "+currentQuestion.Assessment_Question;
        this.questionTimer.string = this.currentTimer.toString();
        this.questionBarTimer.fillRange = 1;
        this.currentOptionIndex = 0;

        this.timesUpNode.active = false;

        this.questionTimer.node.color = CommonFun.instance.hexToRgb(GREEN_COLOR);
        this.questionBarTimer.node.color = CommonFun.instance.hexToRgb(GREEN_COLOR);

        this.optionPanel.forEach((element, index) => {
            element.getChildByName("optionPanelCorrect").active = false;
            element.getChildByName("optionPanelWrong").active = false;

            const labelNode = element.getChildByName("base").getChildByName("text").getComponent(cc.Label);

            labelNode.string = currentQuestion.optionList[index].Answer_Description;
            labelNode.node.parent.parent.getComponent(cc.Button).interactable = true;

            if(currentQuestion.optionList[index].Right_Ans === 1){
                this.correctOptions = index;
                this.pointIncrementVal = currentQuestion.optionList[index].Score_Coins;
            }
        });

        this.startQuestion();
    }

    startQuestion(){
        this.questionPanel.active = true;
        this.schedule(this.questionCountDownTimer, 1);
    }

    questionCountDownTimer(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.clockTimerSound);
        this.currentTimer--;
        this.questionTimer.string = this.currentTimer.toString();
        this.questionBarTimer.fillRange = this.currentTimer / this.currentTimerValue;

        if(this.currentTimer <= 10){
            this.questionTimer.node.color = CommonFun.instance.hexToRgb(ORANGE_COLOR);
            this.questionBarTimer.node.color = CommonFun.instance.hexToRgb(ORANGE_COLOR);
        }

        if(this.currentTimer <= 0){
            this.timesUpNode.active = true;
            this.unschedule(this.questionCountDownTimer);
            this.showCorrectPoint();
        }
    }

    onOptionSelected(ref, val){
        this.unschedule(this.questionCountDownTimer);
        val = parseInt(val)-1;
        this.currentOptionIndex = val;
        if(val === this.correctOptions){
            this.optionPanel.forEach((element, index) => {
                element.getComponent(cc.Button).interactable = false;
                if(index === val){
                    element.getChildByName("optionPanelCorrect").active = true;
                    element.getChildByName("optionPanelWrong").active = false;
                }
            });
            audioManager.instance.playSound(CommonFun.instance.persisitentRef.correctSound);
            this.showPoints(this.pointIncrementVal);
        }
        else{
            this.optionPanel.forEach((element, index) => {
                element.getComponent(cc.Button).interactable = false;
                if(index === val){
                    element.getChildByName("optionPanelCorrect").active = false;
                    element.getChildByName("optionPanelWrong").active = true;
                }
            });
            audioManager.instance.playSound(CommonFun.instance.persisitentRef.incorrectSound);
            this.showPoints(0);
        }
    }

    showCorrectPoint(){
        // this.optionPanel.forEach((element, index) => {
        //     element.node.parent.getComponent(cc.Button).interactable = false;
        //     if(index === this.correctOptions){
        //         element.node.parent.getComponent(cc.Button).disabledColor = selectedCorrectPanelColor;
        //         element.node.color = selectedTextColor;
        //     }
        // });
        this.showPoints(0,true);
    }

    showPoints(currentPoint: number, isTimerRunOut : boolean = false){
        setTimeout(() => {
            clientEvent.dispatchEvent(EventName.IncreasePoints, currentPoint);
    
            clientEvent.dispatchEvent(EventName.ShowPanel,currentPoint > 0 ? 1 : 2 ,currentPoint > 0, currentPoint, isTimerRunOut);
        }, 3000); // Wait 5 seconds
    }

    checkNextGame(){
        if(this.lastQuestion){
            this.showGameOverPopup();
            return;
        }
        else{
            clientEvent.dispatchEvent(EventName.ShowNextQuestionPanel);
        }
    }

    closeQuestionPopup(isCorrect : boolean,isTimerRunOut : boolean = false){
        this.questionPanel.active = false;

        let previousQuestionData = Constant.GameQuestiondata[this.currentQuestionIndex];

        let timeDiff = previousQuestionData.Timer - this.currentTimer;

        let assestmentOptionData = {
            "ID_ORGANIZATION": Cfg.ID_ORGANIZATION,
            "id_user": Cfg.Id_User,
            "Id_Assessment": previousQuestionData.Id_Assessment,
            "Id_Game": previousQuestionData.Id_Game,
            "attempt_no": previousQuestionData.allow_attempt,
            "id_question": previousQuestionData.Id_Assessment_question,
            "is_right": isCorrect ? "1": "0",
            "score": isCorrect ? this.pointIncrementVal : 0,
            "Id_Assessment_question_ans": isTimerRunOut ? null : previousQuestionData.optionList[this.currentOptionIndex].Id_Assessment_question_ans,
            "Time": timeDiff,
            "M2ostAssessmentId": Cfg.M2ostAssessmentId
        }
        Cfg.assessmentdetailuserlogData.push(assestmentOptionData);
    }

    fitImageToPanel(imageNode: cc.Node, panelNode: cc.Node) {
        // Get the panel's size
        const panelSize = panelNode.getContentSize();
    
        // Get the image's original size
        const imageSize = imageNode.getContentSize();
    
        // Calculate the scale factor to maintain aspect ratio
        const scaleX = (panelSize.width*0.85) / imageSize.width;
        const scaleY = (panelSize.height*0.85) / imageSize.height;
        const scale = Math.min(scaleX, scaleY); // Choose the smaller scale to fit the image inside the panel
    
        // Apply the scale to the image
        imageNode.setScale(scale);
    
        // Optional: Center the image in the panel
        imageNode.setPosition(0, 0); // Assuming the anchor point is centered (0.5, 0.5)
    }

    showGameOverPopup(){
        this.currentPopup = this.gameOverPopup;
        this.gameOverPopup.active = true;
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.gameOverSound);


        return this.sendAllApi().then(async () => {
            this.gameOverPanelCloseButton.active = true;
        });
    }

    async sendAllApi(){
        let prom_arr: Promise<any>[] = [];

        prom_arr.push(this.sendAssesmentLogData());

        // prom_arr.push(this.sendcoinsGameLogData());

        prom_arr.push(this.sendgameusermasterlogData());

        prom_arr.push(this.sendGamePlayDetailsUserLogData());

        await Promise.all(prom_arr);
    }

    async sendAssesmentLogData(){
        return new Promise((resolve: Function) => {
            let assessmentdetailuserlogData = Cfg.assessmentdetailuserlogData;

            Utils.postHttp(
                Cfg.envUrl+Cfg.assessmentdetailuserUrl,
                JSON.stringify(assessmentdetailuserlogData),
                (err, response) => {
                    if (err) {
                        return;
                    }
                    let jsonObject = JSON.parse(response);
                    resolve();
                }
            );
        });
    }
    async sendcoinsGameLogData(){
        let finalGameTime = new Date();
        const milliDiff: number = finalGameTime.getTime()- ActivityManager.instance.initialGameTime.getTime();            
        const totalSeconds = Math.floor(milliDiff / 1000);
        Cfg.coinsGameLogData = {
            "org_id": Cfg.OrgID,
            "id_game": Cfg.idgame,
            "xps": ActivityManager.instance.totalPoint,
            "time": totalSeconds,
            "id_user": Cfg.Id_User,
            "status": "A"
        }

        return new Promise((resolve: Function) => {
            let coinsGameLogData = Cfg.coinsGameLogData;
            Utils.postHttp(
                Cfg.coinsGameUrl,
                JSON.stringify(coinsGameLogData),
                (err, response) => {
                    if (err) {
                        return;
                    }
                    let jsonObject = JSON.parse(response);
                    resolve();
                }
            );
        });
    }
    async sendgameusermasterlogData(){
        let previousQuestionData = Constant.GameQuestiondata[this.currentQuestionIndex];
        Cfg.gameusermasterlogData = [
            {
              "ID_ORGANIZATION": (Cfg.ID_ORGANIZATION).toString(),
              "id_user": Cfg.Id_User,
              "Id_Room": Cfg.gameassid,
              "Id_Game": Cfg.idgame,
              "attempt_no": previousQuestionData.allow_attempt,
              "score": ActivityManager.instance.totalPoint
            }
        ]

        return new Promise((resolve: Function) => {
            let gameusermasterlogData = Cfg.gameusermasterlogData;
            Utils.postHttp(
                Cfg.envUrl+Cfg.gameusermasterUrl,
                JSON.stringify(gameusermasterlogData),
                (err, response) => {
                    if (err) {
                        return;
                    }
                    let jsonObject = JSON.parse(response);
                    resolve();
                }
            );
        });
    }

    async sendGamePlayDetailsUserLogData(){
        let previousQuestionData = Constant.GameQuestiondata[this.currentQuestionIndex];

        let finalGameTime = new Date();
        const milliDiff: number = finalGameTime.getTime()- ActivityManager.instance.initialGameTime.getTime();            
        const totalSeconds = Math.floor(milliDiff / 1000);

        Cfg.gamePlayDetailsUserLogData = [
            {
              "ID_ORGANIZATION": (Cfg.ID_ORGANIZATION).toString(),
              "id_user": Cfg.Id_User,
              "Id_Assessment":null,
              "Id_Game": Cfg.idgame,
              "attempt_no": previousQuestionData.allow_attempt,
              "id_question": null,
              "is_right": null,
              "score": ActivityManager.instance.totalPoint,
              "Id_Assessment_question_ans": null,
              "Time": totalSeconds,
              "M2ostAssessmentId": Cfg.M2ostAssessmentId,
              "status":"A"
            }
        ]


        return new Promise((resolve: Function) => {
            let gamePlayDetailsUserLogData = Cfg.gamePlayDetailsUserLogData;
            Utils.postHttp(
                Cfg.envUrl+Cfg.gamePlayDetailsUserUrl,
                JSON.stringify(gamePlayDetailsUserLogData),
                (err, response) => {
                    if (err) {
                        return;
                    }
                    let jsonObject = JSON.parse(response);
                    resolve();
                }
            );
        });
    }
    
    onExitGameOverButtonClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        if(Cfg.isLinux === 0)
            window.location.reload()
        else if(Cfg.isLinux === 1)
            window.location.replace(Cfg.gameOverExitUrl);
        else
            this.showLinuxPopu()
    }

    showLinuxPopu(){
        this.unschedule(this.questionCountDownTimer);
        if(this.currentPopup !== null){
            this.currentPopup.active = false;
            this.currentPopup = null;
        }
        this.linuxPopup.active = true;
    }

    onSeeScoreClicked(){
        this.restartBtn.active = Cfg.isAuthOn
        this.leaderBoardBtn.active = Cfg.isAuthOn
        this.dashBoardtBtn.active = Cfg.isAuthOn
        
        clientEvent.dispatchEvent(EventName.ShowButton, true)
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        if(this.currentPopup !== null){
            this.currentPopup.active = false;
            this.currentPopup = null;
        }
        this.currentPopup = this.ScoreBoardPopup;
        this.ScoreBoardPopup.active = true;


        this.connectionLabel.string  = "Connections: "+(ActivityManager.instance.totalConnection.toString()).padStart(2, '0');
        this.disConnectionLabel.string  = "Disconnections: "+ActivityManager.instance.totalDisConnection.toString().padStart(2, '0');
        this.pointLabel.string  = ActivityManager.instance.totalPoint.toString().padStart(2, '0');

        let strengthData = "";
        let strengthDescData = "";
        let titleDescData = "";
        
        // Calculate final score as percentage
        const finalScore = (ActivityManager.instance.totalConnection / Constant.GameQuestiondata.length) * 100;

        if (finalScore >= 75) {
            strengthData = "High";
            titleDescData = "Telecom Master";
            strengthDescData = "Great Job! You have successfully built a strong network!";
            this.strengthLabel.node.color = CommonFun.instance.hexToRgb(GREEN_COLOR);
        } 
        else if (finalScore >= 40) {
            strengthData = "Moderate";
            titleDescData = "Network Engineer";
            strengthDescData = "Nice work! Your network is growing, but there’s room to strengthen it!";
            this.strengthLabel.node.color = CommonFun.instance.hexToRgb(MODERATE_COLOR);
        } 
        else {
            strengthData = "Low";
            titleDescData = "Signal Troubler";
            strengthDescData = "Your network faced major disruptions! Keep improving to achieve a stable connection!";
            this.strengthLabel.node.color = CommonFun.instance.hexToRgb(ORANGE_COLOR);
        }
        
        this.strengthLabel.string  = strengthData;
        this.strengthDescLabel.string  = strengthDescData;
        this.titleLabel.string  = titleDescData;
    }

    onSeeLeaderBoard(){
        clientEvent.dispatchEvent(EventName.showLeaderBoardPanel);
    }

    onSeeDashBoard(){
        clientEvent.dispatchEvent(EventName.showDashBoardPanel);
    }



    onShowLogout(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.loguotpopup.active = true;
    }
    onLogoutYesClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        if(Cfg.isLinux === 0)
            window.location.reload()
        else if(Cfg.isLinux === 1)
            window.location.replace(Cfg.gameOverExitUrl);
        else
            this.showLinuxPopu()
    }
    onLogoutNoClicked(){
        audioManager.instance.playSound(CommonFun.instance.persisitentRef.buttonClickSound);
        this.loguotpopup.active = false;
    }

}
