import Isaac from "../../../../Isaac";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class GameOver extends Isaac.UI.Container
{
    _title;
    _scorebroad;
    _menu_btn;
    _ready_btn;
    _score_btn;

    init (data)
    {

        this._title = Isaac.UI.Sprite.fromFrame(data.title);
        this._title.pivot = 0.5;
        this._title.x = "50%";
        this._title.y = "20%";
        this.addChild(this._title);

        this._scorebroad = Isaac.UI.Sprite.fromFrame(data.broad);
        this._scorebroad.pivot = 0.5;
        this._scorebroad.x = "50%";
        this._scorebroad.y = "45%";
        this.addChild(this._scorebroad);


        this._menu_btn = new Isaac.UI.Button({ background: Isaac.UI.Sprite.fromFrame(data.menu) });
        this._menu_btn.pivot = 0.5;
        this._menu_btn.x = "50%";
        this._menu_btn.y = this._scorebroad.y + "15%";
        this.addChild(this._menu_btn);
        this._menu_btn.on("click", () => this.onClick_Menu());

        this._ready_btn = new Isaac.UI.Button({ background: Isaac.UI.Sprite.fromFrame(data.playbtn) });
        this._ready_btn.pivot = 0.5;
        this._ready_btn.x = "40%";
        this._ready_btn.y = "72%";
        this.addChild(this._ready_btn);
        this._ready_btn.on("click", () => this.onClick_Ready());

        this._score_btn = new Isaac.UI.Button({ background: Isaac.UI.Sprite.fromFrame(data.scorebtn) });
        this._score_btn.pivot = 0.5;
        this._score_btn.x = "60%";
        this._score_btn.y = "72%";
        this.addChild(this._score_btn);
        this._score_btn.on("click", () => this.onClick_Score());
    }

    onClick_Menu ()
    {
        ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.gomenu);
    }

    onClick_Ready ()
    {
        ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.ready);
    }

    onClick_Score ()
    {

    }
}