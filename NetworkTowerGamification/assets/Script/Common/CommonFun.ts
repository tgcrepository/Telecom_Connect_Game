// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import audioManager from "./audioManager";
import { Constant } from "./Constant";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonFun extends cc.Component {

    private static _instance: CommonFun;

    public currentLvl = 0;
    public currentage = 0;
    public totalLvl = 11;

    static get instance(){
        if(this._instance){
            return this._instance;
        }

        this._instance = new CommonFun;
        return this._instance;
    }

    currentGame = 0;

    
    public currentNode = null;
    public currentRef = null;
    public persisitentNode = null;
    public persisitentRef = null;

    start () {
        this.currentLvl = 0;
    }

    convertToCenterXPos(x)
    {
        var val = x + cc.winSize.width / 2;
        return val;
    }

    convertToCenterYPos(y)
    {
        var val = y + cc.winSize.height / 2;
        return val;
    }

    convertXPos(x)
    {
        var val = x - cc.winSize.width / 2;
        return val;
    }

    convertYPos(y)
    {
        var val = y - cc.winSize.height / 2;
        return val;
    }

    convertXPosWithNode(x,node)
    {
        var val = x - node.width / 2;
        return val;
    }

    convertYPosWithNode(y,node)
    {
        var val = y - node.height / 2;
        return val;
    }
   

    showScaleAnimation(node, scale, time){
        cc.tween(node)
            .to(time, { 
                scale: scale 
            })
            .start()
    }
    
    
    angle(originX, originY, targetX, targetY) {
        var dx = originX - targetX;
        var dy = originY - targetY;
    
        var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
        theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
        if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east
    
        return theta;
    }


    removeArrayValue(array,val){
        const index = array.indexOf(val);
        if (index > -1) { 
            array.splice(index, 1); 
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    getDistance(xA, yA, xB, yB) { 
        var xDiff = xA - xB; 
        var yDiff = yA - yB;
    
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    generateRect(p1){

        let val = 20;
        
        let left = p1.x-val;
        let right = p1.x+val;
        let top = p1.y+val;
        let bottom = p1.y-val;
        let width = right - left;
        let height = top - bottom;
        return cc.rect(left, p1.y, width, height);
    }

    checkInPolygon(p1 , p3){
        let rect = this.generateRect(p1);
        let inside = rect.contains(p3);
        return inside;
    }

    pointOnLine(pt1, pt2, pt3) {
        const result = {
            on_projected_line: true,
            on_line: false,
            between_both: false,
            between_x: false,
            between_y: false,
        };
    
        // Determine if on line interior or exterior
        const x = (pt3.x - pt1.x) / (pt2.x - pt1.x);
        const y = (pt3.y - pt1.y) / (pt2.y - pt1.y);
    
        // Check if on line equation
        result.on_projected_line = x === y;
    
        // Check within x bounds
        if (
            (pt1.x <= pt3.x && pt3.x <= pt2.x) ||
            (pt2.x <= pt3.x && pt3.x <= pt1.x)
        ) {
            result.between_x = true;
        }
    
        // Check within y bounds
        if (
            (pt1.y <= pt3.y && pt3.y <= pt2.y) ||
            (pt2.y <= pt3.y && pt3.y <= pt1.y)
        ) {
            result.between_y = true;
        }
    
        result.between_both = result.between_x && result.between_y;
        result.on_line = result.on_projected_line && result.between_both;
        return result;
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new cc.Color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16),255) : new cc.Color(0, 0, 0, 255);
    }
}
