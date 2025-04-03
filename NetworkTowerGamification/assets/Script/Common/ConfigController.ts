// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { IQuestionData } from "../Config/config";
import CommonFun from "./CommonFun";
import { Constant } from "./Constant";

const configData = {
  

  updateConfigData: function(newData){
      this.currentConfig = newData;
      window.localStorage.setItem("magicJson", JSON.stringify(this.currentConfig));
  },

  getConfig: function(){

    // if(!Constant.DEBUG_ENABLED)
    //   this.updateConfigData(this.currentConfig);

      
    //   if (window.localStorage.getItem("magicJson") == null || window.localStorage.getItem("magicJson") == undefined)
    //       window.localStorage.setItem("magicJson", JSON.stringify(this.currentConfig));
      
    //   return JSON.parse(window.localStorage.getItem("magicJson"));

      if(CommonFun.instance.currentGame == 0)
        return this.letterConfig;
      if(CommonFun.instance.currentGame == 1)
        return this.shapeConfig;
  }
}

export default configData;