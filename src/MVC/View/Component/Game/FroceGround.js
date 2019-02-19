import * as PIXI from "pixi.js";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class FroceGround extends PIXI.Container
{
    _bgCount = 3;
    _landSpeed = 3;
    _lands = [];

    _land;
    _colliderH;

    init (data)
    {
        let texture = PIXI.Texture.fromFrame(data.land);
        for (let i = 0; i < this._bgCount; i++)
        {
            let sp = new PIXI.Sprite(texture);
            sp.anchor.set(1, 1);
            sp.position.set(sp.width * (i + 1), this.parent.StageHeight);
            this.addChild(sp);
            this._lands.push(sp);
        }

        this._colliderH = this.parent.StageHeight - texture.height;
    }

    updata (birdRect)
    {

        for (let i = 0; i < this._bgCount; i++)
        {
            // this._bgs[i].x -= this._bgSpeed;

            // if (this._bgs[i].x < 0)
            // {
            //     this._bgs[i].x += this._bgs[i].width * this._bgCount - 0.4 * this._bgCount;
            // }
            this._lands[i].x -= this._landSpeed;
            if (this._lands[i].x < 0)
            {
                this._lands[i].x += this._lands[i].width * this._bgCount;
            }
        }


        if (birdRect.y > this._colliderH - birdRect.r * 2)
        {
            ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.die);
        }
    }

    get ColliderH ()
    {
        return this._colliderH;
    }
}