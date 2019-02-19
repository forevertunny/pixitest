import * as PIXI from "pixi.js";
import Isaac from "../../../../Isaac";

export class Ready extends Isaac.UI.Container
{
    _ready_sp;
    _tap_sp;

    init (data)
    {
        this._ready_sp = Isaac.UI.Sprite.fromFrame(data.text_ready);
        this._ready_sp.pivot = 0.5;
        this._ready_sp.x = "50%";
        this._ready_sp.y = "30%";
        this.addChild(this._ready_sp);

        this._tap_sp = Isaac.UI.Sprite.fromFrame(data.tutorial);
        this._tap_sp.pivot = 0.5;
        this._tap_sp.x = "50%";
        this._tap_sp.y = "50%";
        this.addChild(this._tap_sp);

        this.visible = false;
    }
}