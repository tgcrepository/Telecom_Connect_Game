import { GameData } from "../Config/config";
import ActivityManager from "../Manager/ActivityManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ParallaxBackground extends cc.Component {
    @property([cc.Node])
    backgroundLayers: cc.Node[] = [];

    private screenHeight: number = 0;

    onLoad() {
        // Get screen width
        this.screenHeight = cc.winSize.width;

        // Ensure backgrounds are positioned side by side
        for (let i = 1; i < this.backgroundLayers.length; i++) {
            const prev = this.backgroundLayers[i - 1];
            const curr = this.backgroundLayers[i];
            curr.y = prev.y + prev.height;
        }
    }

    update(dt: number) {
        if(ActivityManager.instance.isGamePaused) return;
        
        for (const bg of this.backgroundLayers) {
            // Move the background left
            // bg.y -= this.scrollSpeed * dt;

            // Check if it has moved completely off-screen
            if (bg.y + bg.height < 0) {
                // Reposition to the end of the last background
                const lastBg = this.getLastBackground();
                bg.y = lastBg.y + lastBg.height;
            }
        }
    }

    private getLastBackground(): cc.Node {
        // Get the background furthest to the right
        return this.backgroundLayers.reduce((prev, curr) => (prev.y > curr.y ? prev : curr));
    }
}
