
export interface IGameData {
    cointIncrementCount : number,
    healthCount : number,
}

export interface IQuestionData {
    Assessment_Question : string,
    Assessment_Type : number,
    Expiry_Date : null | Date,
    Id_Assessment : number,
    Id_Assessment_question : number,
    Id_Game : number,
    Previous_button : number,
    Start_Date : null | Date,
    Timer : number,
    allow_attempt : number,
    assessment_question_url : null | string,
    optionList : [IAnswerData,IAnswerData,IAnswerData,IAnswerData],
}
export interface IAnswerData {
    Answer_Description : string,
    ID_ORGANIZATION : number,
    Id_Assessment_question : number,
    Id_Assessment_question_ans : number,
    Id_CmsUser : number,
    IsActive : string,
    Right_Ans : number,
    Timer : number,
    Score_Coins : number,
    Updated_Date_Time : string,
}

export const GameData : IGameData = {
    cointIncrementCount : 10,
    healthCount : 5,
};


export const GREEN_COLOR = "#00FF8C"
export const ORANGE_COLOR = "#FF9F5F"
export const MODERATE_COLOR = "#FFFB89"
