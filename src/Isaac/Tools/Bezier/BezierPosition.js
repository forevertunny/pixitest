import * as  PIXI from "pixi.js";

export class BezierPosition
{

    p0;
    p1;
    p2;
    p3;

    ti = 0;

    b0 = new PIXI.Point();
    b1 = new PIXI.Point();
    b2 = new PIXI.Point();
    b3 = new PIXI.Point();

    Ax;
    Ay;
    //private Az: number;

    Bx;
    By;
    //private Bz: number;

    Cx;
    Cy;
    //private Cz: number;

    /**
     * 
     * @param {PIXI.Point} v0 
     * @param {PIXI.Point} v1 
     * @param {PIXI.Point} v2 
     * @param {PIXI.Point} v3 
     */
    constructor( v0, v1, v2, v3 )
    {
        this.p0 = v0;
        this.p1 = v1;
        this.p2 = v2;
        this.p3 = v3;
    }

    GetPointAtTime( t )
    {
        this.CheckConstant();

        let t2 = t * t;

        let t3 = t * t * t;

        let x = this.Ax * t3 + this.Bx * t2 + this.Cx * t + this.p0.x;

        let y = this.Ay * t3 + this.By * t2 + this.Cy * t + this.p0.y;

        //let z = this.Az * t3 + this.Bz * t2 + this.Cz * t + this.p0.z;

        return new PIXI.Point( x, y );
    }

    SetConstant()
    {

        this.Cx = 3 * ( ( this.p0.x + this.p1.x ) - this.p0.x );

        this.Bx = 3 * ( ( this.p3.x + this.p2.x ) - ( this.p0.x + this.p1.x ) ) - this.Cx;

        this.Ax = this.p3.x - this.p0.x - this.Cx - this.Bx;

        this.Cy = 3 * ( ( this.p0.y + this.p1.y ) - this.p0.y );

        this.By = 3 * ( ( this.p3.y + this.p2.y ) - ( this.p0.y + this.p1.y ) ) - this.Cy;

        this.Ay = this.p3.y - this.p0.y - this.Cy - this.By;



        /*this.Cz = 3 * ( ( this.p0.z + this.p1.z ) - this.p0.z );

        this.Bz = 3 * ( ( this.p3.z + this.p2.z ) - ( this.p0.z + this.p1.z ) ) - this.Cz;

        this.Az = this.p3.z - this.p0.z - this.Cz - this.Bz;*/
    }

    CheckConstant()
    {
        if ( this.p0 !== this.b0 || this.p1 !== this.b1 || this.p2 !== this.b2 || this.p3 !== this.b3 )
        {

            this.SetConstant();

            this.b0 = this.p0;

            this.b1 = this.p1;

            this.b2 = this.p2;

            this.b3 = this.p3;

        }
    }

}