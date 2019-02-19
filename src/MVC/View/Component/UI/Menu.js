import Isaac from "../../../../Isaac";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class Menu extends Isaac.UI.Container
{
    _title;
    _rate_btn;
    _ready_btn;
    _score_btn;
    _copyright_sp;

    init (data)
    {
        this._title = Isaac.UI.Sprite.fromFrame(data.title);
        this._title.pivot = 0.5;
        this._title.x = "50%";
        this._title.y = "20%";
        this.addChild(this._title);

        this._rate_btn = new Isaac.UI.Button({ "background": Isaac.UI.Sprite.fromFrame(data.ratebtn) });
        this._rate_btn.pivot = 0.5;
        this._rate_btn.x = "50%";
        this._rate_btn.y = "50%";
        this.addChild(this._rate_btn);

        this._ready_btn = new Isaac.UI.Button({ "background": Isaac.UI.Sprite.fromFrame(data.playbtn) });
        this._ready_btn.pivot = 0.5;
        this._ready_btn.x = "50%";
        this._ready_btn.y = "72%";
        this.addChild(this._ready_btn);
        console.log(this._ready_btn);
        this._ready_btn.on("click", () => this.onClick_Ready());

        this._score_btn = new Isaac.UI.Button({ "background": Isaac.UI.Sprite.fromFrame(data.scorebtn) });
        this._score_btn.pivot = 0.5;
        this._score_btn.x = "60%";
        this._score_btn.y = "72%";
        this.addChild(this._score_btn);
        this._score_btn.on("click", () => this.onClick_Score());
        this._score_btn.visible = false;

        this._copyright_sp = Isaac.UI.Sprite.fromFrame(data.copyright);
        this._copyright_sp.pivot = 0.5;
        this._copyright_sp.x = "50%";
        this._copyright_sp.y = "90%";
        this.addChild(this._copyright_sp);

        this.visible = false;
    }

    openScoreBtn ()
    {
        this._ready_btn.x = "40%";
        this._score_btn.visible = true;
    }

    onClick_Ready ()
    {
        ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.ready);
    }

    onClick_Score ()
    {
        console.log("onClick_Score");
    }
}