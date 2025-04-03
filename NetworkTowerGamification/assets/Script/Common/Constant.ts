import { IQuestionData } from "../Config/config";

const {ccclass, property} = cc._decorator;

// export const envUrl = "https://www.playtolearn.in/nGage-MollyTdirect_api/api/"
// export const envUrl = "https://www.playtolearn.in/Mini_games/api/"


export const Cfg = {
	gameLoginUrl: "https://www.playtolearn.in/signinapi_new/api/user/add",
	gameAuthUrl: "UserDetail",
	gameDetailUrl: "GetAssessmentDataList",
    assessmentdetailuserUrl : "assessmentdetailuserlog",
    gameusermasterUrl : "gameusermasterlog",
    gamePlayDetailsUserUrl: "GamePlayDetailsUserLog",

    gameLeaderBoard : "https://n-gage.co.in:4000/api/leaderboard",
    gameDashBoard : "https://playtolearn.in/signinapi_new/api/GetUserAssesmentData",

    isLinux : 2, // 0 - 1st version, 1 - 2nd version, 2 - 3rd version
    isAuthOn : false,
    coinsGameUrl : "https://www.playtolearn.in/Mini_games_coins/api/coinsGameLog",
    envUrl : "https://www.playtolearn.in/Mini_games/api/",
    
    pauseExitUrl: "https://www.m2ost.in/M2OST_Console_PriME/Dashboard/Index?Flag=N",
    gameOverExitUrl :"https://www.m2ost.in/M2OST_Console_PriME/Dashboard/Index?Flag=N",    

    gameassid : "",
    Email : "",
    OrgID : "",
    M2ostAssessmentId : "",
    idgame : "",
    Source : "",
    IsActive : "A",
    Id_User : "",
    ID_ORGANIZATION : "",
    Id_Assessment : "",
    UID : "",

    pointScore : 10,

    allow_attempt : "",
    
    defaultQuestion : "[{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1584,\"Id_Assessment\":225,\"Assessment_Question\":\"शिकायत करने वाले Customers चाहते हैं\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6095,\"Id_Assessment_question\":1584,\"Answer_Description\":\"चिल्लाना\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728231000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6096,\"Id_Assessment_question\":1584,\"Answer_Description\":\"उनकी बातें सुनी जाएं तथा उनके प्रश्नों/समस्याओं का समाधान किया जाए\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728253000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6097,\"Id_Assessment_question\":1584,\"Answer_Description\":\"निराशा बाहर VENT के लिए\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728269000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6098,\"Id_Assessment_question\":1584,\"Answer_Description\":\"कुछ भी नहीं है\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728285000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1585,\"Id_Assessment\":225,\"Assessment_Question\":\"NPS की गणना इस प्रकार की जाती है,\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6091,\"Id_Assessment_question\":1585,\"Answer_Description\":\"Net Promoter Score= Promoter का % - Detractors का %\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728143000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6092,\"Id_Assessment_question\":1585,\"Answer_Description\":\"Net Promoter Score = Promoter - Detractors\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728163000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6093,\"Id_Assessment_question\":1585,\"Answer_Description\":\"Net Promoter Score = Promoter – Detractors – Passive\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728181000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6094,\"Id_Assessment_question\":1585,\"Answer_Description\":\"उपरोक्त options में से कोई नहीं\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728206000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1586,\"Id_Assessment\":225,\"Assessment_Question\":\"……….ग्राहक को गर्मजोशी से.\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6087,\"Id_Assessment_question\":1586,\"Answer_Description\":\"अभिवादन करना\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728029000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6088,\"Id_Assessment_question\":1586,\"Answer_Description\":\"अलविदा कहें\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728068000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6089,\"Id_Assessment_question\":1586,\"Answer_Description\":\"परिचय देना\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728086000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6090,\"Id_Assessment_question\":1586,\"Answer_Description\":\"काम\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735728107000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1587,\"Id_Assessment\":225,\"Assessment_Question\":\"……… Impression Last Impression है।\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6083,\"Id_Assessment_question\":1587,\"Answer_Description\":\"पहला\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735727808000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6084,\"Id_Assessment_question\":1587,\"Answer_Description\":\"Last\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735727947000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6085,\"Id_Assessment_question\":1587,\"Answer_Description\":\"तीसरा\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735727969000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6086,\"Id_Assessment_question\":1587,\"Answer_Description\":\"चौथी\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735727990000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1589,\"Id_Assessment\":225,\"Assessment_Question\":\"नीचे दिए गए options में से कौन सा customer Service का गुण नहीं है?\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6075,\"Id_Assessment_question\":1589,\"Answer_Description\":\"व्यावसायिकता\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726455000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6076,\"Id_Assessment_question\":1589,\"Answer_Description\":\"अभ्यास\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726477000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6077,\"Id_Assessment_question\":1589,\"Answer_Description\":\"धैर्य\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726501000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6078,\"Id_Assessment_question\":1589,\"Answer_Description\":\"लोगों को प्राथमिकता देना\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735879321000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1590,\"Id_Assessment\":225,\"Assessment_Question\":\"If customer आपसे नाराज हो जाए तो क्या आप आक्रामक हो सकते हैं?\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6071,\"Id_Assessment_question\":1590,\"Answer_Description\":\"हाँ\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726362000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6072,\"Id_Assessment_question\":1590,\"Answer_Description\":\"नहीं\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726376000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6073,\"Id_Assessment_question\":1590,\"Answer_Description\":\"परिस्थिति पर निर्भर करता है\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726405000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6074,\"Id_Assessment_question\":1590,\"Answer_Description\":\"शायद\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726422000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1591,\"Id_Assessment\":225,\"Assessment_Question\":\"ऐसे customer से निपटने का सबसे अच्छा approach क्या है जो किसी गैर-दावा योग्य Product के लिए claim चाहता है?\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6067,\"Id_Assessment_question\":1591,\"Answer_Description\":\"claim को अस्वीकार करें और बातचीत को तुरंत समाप्त करें\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726155000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6068,\"Id_Assessment_question\":1591,\"Answer_Description\":\"equal value के वैकल्पिक Products पेश करें\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726296000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6069,\"Id_Assessment_question\":1591,\"Answer_Description\":\"BIL Exchange और claim policy समझाएं और विनम्रता से इनकार करें\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726315000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6070,\"Id_Assessment_question\":1591,\"Answer_Description\":\"customer को some other Shop पर Go का सुझाव दें\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726334000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1592,\"Id_Assessment\":225,\"Assessment_Question\":\"शरीर की मुद्रा …….बनाए maintain ।\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6063,\"Id_Assessment_question\":1592,\"Answer_Description\":\"सीधा और आत्मविश्वासी\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735879453000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6064,\"Id_Assessment_question\":1592,\"Answer_Description\":\"झुकना\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726086000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6065,\"Id_Assessment_question\":1592,\"Answer_Description\":\"पैर पर पैर रखनेवाला\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726106000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6066,\"Id_Assessment_question\":1592,\"Answer_Description\":\"क्रॉस-आर्म्ड\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726125000)/\",\"Id_CmsUser\":21}]},{\"Id_Game\":13,\"Start_Date\":null,\"Expiry_Date\":null,\"Id_Assessment_question\":1593,\"Id_Assessment\":225,\"Assessment_Question\":\"Good NPS Score और Happy Customers का direct प्रभाव क्या होगा?\",\"allow_attempt\":2,\"Previous_button\":0,\"Assessment_Type\":4,\"assessment_question_url\":null,\"Timer\":60,\"optionList\":[{\"Id_Assessment_question_ans\":6059,\"Id_Assessment_question\":1593,\"Answer_Description\":\"UPT में Increase\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735725958000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6060,\"Id_Assessment_question\":1593,\"Answer_Description\":\"ASP में Increase\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735725982000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6061,\"Id_Assessment_question\":1593,\"Answer_Description\":\"UPT और ASP में Increase\",\"Right_Ans\":1,\"Score_Coins\":10,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726009000)/\",\"Id_CmsUser\":21},{\"Id_Assessment_question_ans\":6062,\"Id_Assessment_question\":1593,\"Answer_Description\":\"कोई भी options नहीं\",\"Right_Ans\":2,\"Score_Coins\":0,\"ID_ORGANIZATION\":15,\"IsActive\":\"A\",\"Updated_Date_Time\":\"/Date(1735726024000)/\",\"Id_CmsUser\":21}]}]",

    assessmentdetailuserlogData : [],
    coinsGameLogData : {},
    gameusermasterlogData : [],
    gamePlayDetailsUserLogData: [],
};

@ccclass
export class Constant {

    public static GAMESCENE = "gameScene";
    public static LOADINGSCENE = "loadingScene";

    public static DEBUG_ENABLED = true;

    public static GAMESTATE = {
        MAINMENU: 0,
        GAMEPLAY: 1,
        GAMEOVER: 2,
        LEVELSELECTION: 3,
    }
    
    
    public static URL_TYPE = {
        NONE: 0,
        IMAGE: 1,
        VIDEO: 2,
    }

    public static currentscene = null;
    public static CURRENTSTATE = Constant.GAMESTATE.MAINMENU;

    public static GameQuestiondata: IQuestionData[];

    
    public static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    public static getFrame(path,frameLocation, currentLength,totalLength,shouldPlayAnim, callbacks){
        cc.resources.load(path, cc.SpriteFrame, (err, spriteFrame) => {
            if(err)
            {
                console.warn("load Sprite frame Failed : ", err);
                callbacks(null);
            }
            try{
                callbacks(spriteFrame,frameLocation,currentLength,totalLength,shouldPlayAnim);
            } catch(error) {
                callbacks(null);
            }
        });
    }

    public static updateSpriteFrame(img, path){
        cc.resources.load(path, cc.SpriteFrame, (err, spriteFrame) => {
            if(err)
            {
                console.warn("load Sprite frame Failed : ", err);
                return;
            }
            try{
                if(img != null)
                    img.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            } catch(error) {
                console.log(error, " error");
            }
        });
    }
    
    //sound
    public static CheckSoundEnabled() {
        if (window.localStorage.getItem("soundEnabled") == null || window.localStorage.getItem("soundEnabled") == undefined)
            window.localStorage.setItem("soundEnabled", "1")

        return parseInt(window.localStorage.getItem("soundEnabled"));
    }


    public static ToggleSound() {
        if (parseInt(window.localStorage.getItem("soundEnabled")))
            window.localStorage.setItem("soundEnabled", "0")
        else
            window.localStorage.setItem("soundEnabled", "1")

        return this.CheckSoundEnabled();
    }

    public static getKeyByValueForEnum(enumObj: any, value: any): string | undefined {
        for (const key in enumObj) {
        if (enumObj[key] === value) {
            return key;
        }
        }
        return undefined;
    }

    public static AssignData(){
        if(Cfg.isLinux == 0 || Cfg.isLinux == 1){
            Cfg.envUrl = "https://www.playtolearn.in/nGage-MollyTdirect_api/api/";
            Cfg.coinsGameUrl = "https://n-gage.co.in:4000/api/coinsGameLog";
            Cfg.pauseExitUrl = "https://n-gage.in/NgageNewServer/#/home";
            Cfg.gameOverExitUrl = "https://n-gage.in/NgageNewServer/#/home";
        }
        else
        {
            Cfg.envUrl = "https://www.playtolearn.in/Mini_games/api/";
            Cfg.coinsGameUrl = "https://www.playtolearn.in/Mini_games_coins/api/coinsGameLog";
            Cfg.pauseExitUrl = "https://www.m2ost.in/M2OST_Console_PriME/Dashboard/Index?Flag=N";
            Cfg.gameOverExitUrl = "https://www.m2ost.in/M2OST_Console_PriME/Dashboard/Index?Flag=N";
        }
    }

    public static LOG_DATA = {

        //initial
        LOADING_100 : "loading--100",
        LOADER_COMPLETE_TRUE : "loaderComplete--true",
        TITLE_SHOWED : "logEvent--showedScreen--Title",

        LEVEL_STARTED : "levelStarted--",
        FIRST_CLICK : "firstClick--",
        LEVEL_COMPLETE : "levelComplete--",
        LEVEL_FAILED : "levelFailed--",
        STARS_EARNED : "starsEarned--",
        LEVEL_CLICK : "levelClick--",
        CORRECT_ANSWER : "correctAnswer--",
        WRONG_ANSWER : "wrongAnswer--",

        RESTARTED : "logEvent--replayClick--true",

        SOUND_TRUE : "soundSetting--true",
        SOUND_FALSE : "soundSetting--false",

        GAME_EXIT : "gameExit--true",

        //gameOver
        CONGRATULATION : "logEvent--showedScreen--Congratulations",
        GAME_ENDED_TRUE : "gameEnded--true",
    }
}
