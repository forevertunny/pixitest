import * as PIXI from "pixi.js";

export class BackGround extends PIXI.Container
{
    _bgCount = 3;
    _bgSpeed = 3;
    _bgs = [];

    _bg_day;
    _bg_hight;

    init (data)
    {
        this._bg_day = data.day;
        this._bg_hight = data.night;


        for (let i = 0; i < this._bgCount; i++)
        {
            let sp = PIXI.Sprite.fromFrame(data.day);
            sp.anchor.x = 1;
            sp.x = sp.width * (i + 1) - i * 0.4;
            this.addChild(sp);
            this._bgs.push(sp);
        }
    }


    updata ()
    {
        for (let i = 0; i < this._bgCount; i++)
        {
            // this._bgs[i].x -= this._bgSpeed;

            // if (this._bgs[i].x < 0)
            // {
            //     this._bgs[i].x += this._bgs[i].width * this._bgCount - 0.4 * this._bgCount;
            // }
        }
    }
}