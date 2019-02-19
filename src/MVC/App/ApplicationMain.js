import * as PIXI from "pixi.js";
import { GamePanel } from "../View/Panel/GamePanel";
import { UIPanel } from "../View/Panel/UIPanel";

export class ApplicationMain extends PIXI.Container
{

    constructor(width, height, key)
    {
        super();


        this._gamePanel = null;
        this._uiPanel = null;

        this.init(width, height, key);
    }

    init (width, height, key)
    {
        if (this._gamePanel == null)
        {
            this._gamePanel = new GamePanel({
                width: width,
                height: height,
                key: key
            });

            this.addChild(this._gamePanel);
        }

        this._gamePanel.visible = true;

        if (this._uiPanel == null)
        {
            this._uiPanel = new UIPanel({
                width: width,
                height: height,
                key: key
            })

            this.addChild(this._uiPanel);
        }


        this._uiPanel.visible = true;
    }

}