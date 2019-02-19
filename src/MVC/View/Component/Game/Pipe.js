import * as PIXI from "pixi.js";

export class Pipe extends PIXI.Container
{
    _up;
    _down;

    _gap = 50;
    _colliderScale = 0.98;

    constructor(data)
    {
        super();

        this._up = new PIXI.Sprite(data.up);
        this._up.anchor.set(0.5, 0);
        this.addChild(this._up);

        this._down = new PIXI.Sprite(data.down);
        this._down.anchor.set(0.5, 1);
        this.addChild(this._down);



    }

    changeSprite (data)
    {
        this._up.texture = data.up;
        this._down.texture = data.down;
    }

    randomY (y)
    {
        this._up.y = y + this._gap;
        this._down.y = y - this._gap;
    }

    get Rectangles ()
    {
        return {
            up: {
                x1: this.x + this._up.x - this._up.width * this._colliderScale * this._up.anchor.x,
                y1: this.y + this._up.y - this._up.height * this._colliderScale * this._up.anchor.y,
                x2: this.x + this._up.x + this._up.width * this._colliderScale * (1 - this._up.anchor.x),
                y2: this.y + this._up.y + this._up.height * this._colliderScale * (1 - this._up.anchor.y)
            },
            down: {
                x1: this.x + this._down.x - this._down.width * this._colliderScale * this._down.anchor.x,
                y1: this.y + this._down.y - this._down.height * this._colliderScale * this._down.anchor.y,
                x2: this.x + this._down.x + this._down.width * this._colliderScale * (1 - this._down.anchor.x),
                y2: this.y + this._down.y + this._down.height * this._colliderScale * (1 - this._down.anchor.y)
            }
        }
    }

    get Rect ()
    {
        return {
            up:
            {
                x: this.x + this._up.x - this._up.width * this._up.anchor.x,
                y: this.y + this._up.y - this._up.height * this._up.anchor.y,
                w: this._up.width,
                h: this._up.height
            },
            down:
            {
                x: this.x + this._down.x - this._down.width * this._down.anchor.x,
                y: this.y + this._down.y - this._down.height * this._down.anchor.y,
                w: this._up.width,
                h: this._up.height
            }
        }
    }
}