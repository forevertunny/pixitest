import * as PIXI from "pixi.js";
// import { ApplicationMain } from "./MVC/App/ApplicationMain";
// import { ApplicationFacade } from "./MVC/App/ApplicationFacade";
// import { GameCommandEvent } from "./MVC/Event/GameEvent";
// import bunnyUrl from '../assets/bunny.png'
// import Isaac from "./Isaac";

export default class
{

    static get AAAAAA ()
    {
        return {
            abc: "abc",
            zzz: 123456
        }
    }
    // static TestName = "TestName";
    // _key = "app";

    // _stageWidth = 0;
    // _stageHeight = 0;

    constructor(target, data)
    {
        this.target = target

        this._key = data.key;
        this._stageWidth = data.width;
        this._stageHeight = data.height;

        this._canvans = new PIXI.Application({ backgroundColor: 0x1099bb })
        this.target.appendChild(this._canvans.view)

        this.rendererResize();
        window.addEventListener("resize", () => this.rendererResize());
        window.addEventListener('deviceOrientation', () => this.rendererResize());

        // this.createScene();
    }

    createScene ()
    {
        // this._app = new ApplicationMain(this._stageWidth, this._stageHeight, this._key);
        // this._canvans.stage.addChild(this._app);
        // ApplicationFacade.getInstance(this._key).SetMainViwe(this._app);
        // // // ApplicationFacade.getInstance(this._key).sendNotification(DatGuiEvent.ACTIVE, this._isDebug);
        // ApplicationFacade.getInstance(this._key).sendNotification(GameCommandEvent.enable);



        // PIXI.loader.add("bunny", "assets/bunny.png").load(() =>
        // {
        //     let cc = new PIXI.Container();
        //     this._canvans.stage.addChild(cc);

        //     let uiStage = new Isaac.UI.Stage(this._stageWidth, this._stageHeight);
        //     cc.addChild(uiStage);

        //     let sp = Isaac.UI.Sprite.fromFrame("bunny");
        //     //uiStage.addChild(sp);

        //     let button = new Isaac.UI.Button({ background: sp });
        //     uiStage.addChild(button);


        //     button.on("click", () => { console.log("Aaaa") });
        // })

        // this.bunnyTex = PIXI.Texture.fromImage(bunnyUrl);
        // let sp = new Isaac.UI.Sprite(this.bunnyTex);
        // // let button = new Isaac.UI.Button({ background: new Isaac.UI.Sprite(this.bunnyTex) });
        // // uiStage.addChild(button);
        // uiStage.addChild(sp);
        // sp.x = "50%";


        // let bunny = new PIXI.Sprite(this.bunnyTex)
        // bunny.anchor.set(0.5)
        // bunny.x = 200
        // bunny.y = 200
        // bunny.interactive = true;
        // bunny.buttonMode = true;
        // this._canvans.stage.addChild(bunny);
    }

    rendererResize ()
    {
        let stageSize = this.calculateStageSize(window.innerWidth, window.innerHeight, this._stageWidth, this._stageHeight)
        let stageWidth = stageSize.stageWidth;
        let stageHeight = stageSize.stageHeight;
        let displayWidth = stageSize.displayWidth;
        let displayHeight = stageSize.displayHeight;

        if (this._canvans.view.width !== stageWidth)
        {
            this._canvans.view.width = stageWidth;
        }

        if (this._canvans.view.height !== stageHeight)
        {
            this._canvans.view.height = stageHeight;
        }

        let scalex = displayWidth / stageWidth, scaley = displayHeight / stageHeight;

        this._canvans.stage.scale.set(scalex, scaley);
        this._canvans.renderer.resize(displayWidth, displayHeight);
    }

    calculateStageSize (screenWidth, screenHeight, contentWidth, contentHeight)
    {
        let displayWidth = screenWidth;
        let displayHeight = screenHeight;
        let stageWidth = contentWidth;
        let stageHeight = contentHeight;


        let scaleX = (screenWidth / stageWidth) || 0;
        let scaleY = (screenHeight / stageHeight) || 0;

        /*
            switch (scaleMode) {
                    case egret.StageScaleMode.EXACT_FIT:
                        break;
                    case egret.StageScaleMode.FIXED_HEIGHT:
                        stageWidth = Math.round(screenWidth / scaleY);
                        break;
                    case egret.StageScaleMode.FIXED_WIDTH:
                        stageHeight = Math.round(screenHeight / scaleX);
                        break;
                    case egret.StageScaleMode.NO_BORDER:
                        if (scaleX > scaleY) {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        else {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        break;
                    case egret.StageScaleMode.SHOW_ALL:
                        if (scaleX > scaleY) {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        else {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        break;
                    case egret.StageScaleMode.FIXED_NARROW:
                        if (scaleX > scaleY) {
                            stageWidth = Math.round(screenWidth / scaleY);
                        }
                        else {
                            stageHeight = Math.round(screenHeight / scaleX);
                        }
                        break;
                    case egret.StageScaleMode.FIXED_WIDE:
                        if (scaleX > scaleY) {
                            stageHeight = Math.round(screenHeight / scaleX);
                        }
                        else {
                            stageWidth = Math.round(screenWidth / scaleY);
                        }
                        break;
                    default:
                        stageWidth = screenWidth;
                        stageHeight = screenHeight;
                        break;
        */
        if (scaleX > scaleY)
        {
            displayWidth = Math.round(stageWidth * scaleY);
        }
        else
        {
            displayHeight = Math.round(stageHeight * scaleX);
        }

        if (stageWidth % 2 !== 0)
        {
            stageWidth += 1;
        }
        if (stageHeight % 2 !== 0)
        {
            stageHeight += 1;
        }
        if (displayWidth % 2 !== 0)
        {
            displayWidth += 1;
        }
        if (displayHeight % 2 !== 0)
        {
            displayHeight += 1;
        }

        return {
            stageWidth: stageWidth,
            stageHeight: stageHeight,
            displayWidth: displayWidth,
            displayHeight: displayHeight
        };
    }
}