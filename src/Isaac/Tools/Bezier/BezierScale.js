import * as PIXI from "pixi.js";

export class BezierScale
{
    _from;

    _to;

    constructor( from, to )
    {
        this._from = from;
        this._to = to;
    }

    GetPointAtTime( t )
    {
        let t2 = t * t;

        return new PIXI.Point( ( this._to.x - this._from.x ) * t2 + this._from.x, ( this._to.y - this._from.y ) * t2 + this._from.y );
    }
}