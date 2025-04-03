import { Cfg } from "./Common/Constant";
import { EventName } from "./Mediator/EventName";
import { clientEvent } from "./observer/clientEvent";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GoogleSignIn extends cc.Component {
    private clientId: string = "379585409892-527gflqa88drltlqvc295aht4nei63sn.apps.googleusercontent.com";

    @property(cc.Node)
    googleSigninNode: cc.Node = null;

    onLoad() {
        this.googleSigninNode.active = false
    }

    loadGoogleSDK() {
        if (document.getElementById("gsi-client")){
            this.renderGoogleButton()
             return;
        }

        let script = document.createElement("script");
        script.id = "gsi-client";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => this.renderGoogleButton();
        document.head.appendChild(script);
    }

    renderGoogleButton() {
        let div = document.createElement("div");
        div.id = "google-signin-btn";
        div.style.position = "absolute";

        function isPortraitMode(): boolean {
            return window.matchMedia("(orientation: portrait)").matches;
        }
        
        if (isPortraitMode()) {
            // Portrait mode: Apply rotation
            div.style.transform = "translate(-50%, -50%) rotate(90deg)";
            div.style.transformOrigin = "center center";
            div.style.top = "50%";
            div.style.left = "25%";
            console.log("Device is in Portrait mode");
        } else {
            // Landscape mode: No rotation
            div.style.transform = "translate(-50%, -50%)";
            div.style.top = "65%";
            div.style.left = "50%";
            console.log("Device is in Landscape mode");
        }

        div.style.zIndex = "1000";
        document.body.appendChild(div);

        (window as any).google.accounts.id.initialize({
            client_id: this.clientId,
            callback: this.handleCredentialResponse.bind(this),
            ux_mode: "popup",
        });

        (window as any).google.accounts.id.renderButton(div, {
            theme: "outline",
            size: "large",
            shape: "rectangular",
            text: "continue_with",
            logo_alignment: "left"
        });
        // this.googleSigninNode.active = true
    }
    unrenderGoogleButton() {
        const googleBtn = document.getElementById("google-signin-btn");
        if (googleBtn) {
            googleBtn.remove(); // Remove the button from the DOM
            console.log("Google Sign-In button removed");
        }
    }

//     siginClick(){
//         // Set a timeout to detect login cancel
//         const loginTimeout = setTimeout(() => {
//             console.log("User did not complete login.");
//             this.handleSignInCancel();
//         }, 30000); // Wait 5 seconds

//         (window as any).google.accounts.id.initialize({
//             client_id: this.clientId,
//             callback: this.handleCredentialResponse.bind(this),
//             ux_mode: "popup",
//             native_callback: this.handleCredentialResponse.bind(this), // Ensures native popups don't show
//         });
        
//         (window as any).google.accounts.id.prompt({
//             use_fedcm_for_prompt: false  // Forces the popup instead of bottom sheet UI
//         });
                
//         this.googleSigninNode.active = false
//    }

   handleSignInCancel() {
       console.log("Sign-in was canceled or closed.");
       this.googleSigninNode.active = true; // Reactivate the sign-in button
   }

    handleCredentialResponse(response: any) {
        console.log("Google ID Token:", response.credential);
        this.unrenderGoogleButton();

        // Verify token and save user data
        this.verifyAndSaveUserData(response.credential);
    }

    async verifyAndSaveUserData(idToken: string) {
        try {
            let response = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken);
            let userData = await response.json();
            console.log("User Info:", userData);

            // Save user data to localStorage
            cc.sys.localStorage.setItem("googleUser", JSON.stringify(userData));

            // Show user profile (optional)
            this.displayUserInfo(userData);
        } catch (error) {
            console.error("Token verification failed", error);
        }
    }

    displayUserInfo(userData: any) {
        console.log("User:", userData.name);
        console.log("Email:", userData.email);
        console.log("Profile Pic:", userData.picture);

            // Hide the Google Sign-In button
        let googleBtn = document.getElementById("google-signin-btn");
        if (googleBtn) {
            googleBtn.style.display = "none"; // Hide the button
        }
        

        const configParams = {
            "Name": userData.name,
            "Email": userData.email,
            "Phone_No": "9850128882"
        }

        Utils.postHttp(
            Cfg.gameLoginUrl,
            JSON.stringify(configParams),
            (err, response) => {
                if (err) {
                    return;
                }

                let jsonObject = (JSON.parse(response));
                Cfg.OrgID = jsonObject.Data.OrgId
                Cfg.Email = jsonObject.Data.Email
                Cfg.UID = jsonObject.Data.UID
        
                clientEvent.dispatchEvent(EventName.OnGoogleSignInCompleted)
            }
        );
    }

    getSavedUserData() {
        let data = cc.sys.localStorage.getItem("googleUser");
        return data ? JSON.parse(data) : null;
    }
}