export class BezierAlpha
{
    _from = 0;
    _to = 0;

    constructor( from, to )
    {
        this._from = from;
        this._to = to;
    }

    GetPointAtTime( t )
    {
        let t2 = t * t;

        return ( this._to - this._from ) * t2 + this._from;
    }
}