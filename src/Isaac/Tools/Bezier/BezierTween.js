import * as PIXI from "pixi.js";

export var BezierInfo =
{
    time: 0,
    delayTime: 0,
    bez: null,
    alpha: null,
    scale: null,
    rotation: null,
    onStart: Function,
    onComplete: Function,
}

export class BezierTween
{
    _target;

    _isLoop = false;

    _bzs = [];

    _currBzIndex = 0;

    _fps = 0;

    _currPosition = 0;

    _currPaseTime = 0;

    _ticker;

    _onUpdate;

    _onComplete;

    _totalTime = 0;

    /**
     * 
     * @param {any} target 
     * @param {BezierInfo[]} bzs 
     * @param {boolean} isLoop 
     * @param {boolean} isDrawLine 
     * @param {Function} onUpdate 
     * @param {Function} onComplete 
     */
    constructor( target, bzs = [], isLoop = true, isDrawLine = false, onUpdate = null, onComplete = null )
    {
        this._target = target;
        this._isLoop = isLoop;
        this._bzs = bzs;
        this._onUpdate = onUpdate;
        this._onComplete = onComplete;

        for ( let i = 0; i < this._bzs.length; i++ )
        {
            this._totalTime += this._bzs[ i ].delayTime;
        }

        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add( () => this.update() );



        if ( isDrawLine )
        {

        }

    }

    play()
    {
        this._ticker.start();

        this._currBzIndex = 0;
        this._currPaseTime = 0;
        this._currPosition = 0;
    }

    stop()
    {
        this._ticker.stop();
    }

    update()
    {
        if ( this._target !== null && this._bzs.length > 0 && this._currBzIndex < this._bzs.length )
        {
            let bz = this._bzs[ this._currBzIndex ];

            if ( this._currPaseTime === 0 && bz.onStart !== null && bz.onStart !== undefined )
            {
                bz.onStart();
            }

            let interval = 1 / bz.time;
            this._currPaseTime += this._ticker.elapsedMS;

            if ( this._currPaseTime > bz.delayTime )
            {
                this._currPosition += interval * this._ticker.elapsedMS;

                let moveTo = null;
                let scaleTo = null;
                let rotationTo = null;
                let alphaTo = null;

                if ( bz.bez != null )
                {
                    moveTo = bz.bez.GetPointAtTime( this._currPosition );
                }
                if ( bz.scale != null )
                {
                    scaleTo = bz.scale.GetPointAtTime( this._currPosition );
                }
                if ( bz.rotation != null )
                {
                    rotationTo = bz.rotation.GetPointAtTime( this._currPosition );
                }

                if ( bz.alpha != null )
                {
                    alphaTo = bz.alpha.GetPointAtTime( this._currPosition );
                }


                //console.log( moveTo );
                //console.log( scaleTo );

                if ( moveTo != null )
                {
                    this._target.position.set( moveTo.x, moveTo.y );
                }

                if ( scaleTo != null )
                {
                    this._target.scale.set( scaleTo.x, scaleTo.y )
                }

                if ( rotationTo != null )
                {
                    this._target.rotation = rotationTo;
                }

                if ( alphaTo != null )
                {
                    this._target.alpha = alphaTo;
                }

                if ( this._onUpdate !== null && this._onUpdate !== undefined )
                {
                    this._onUpdate();
                }

            }

            if ( this._currPaseTime >= bz.time + bz.delayTime )
            {

                this._currBzIndex++;

                if ( bz.onComplete !== null && bz.onComplete !== undefined )
                {
                    bz.onComplete();
                }

                if ( this._currBzIndex >= this._bzs.length )
                {
                    if ( !this._isLoop )
                    {
                        this.stop();
                        if ( this._onComplete !== null && this._onComplete !== undefined )
                        {
                            this._onComplete();
                        }
                    }
                    else 
                    {
                        this._currBzIndex = 0;
                    }
                }

                this._currPaseTime = 0;
                this._currPosition = 0;
            }
        }
        else
        {
            this.stop();
        }

    }

    get GetTotaleTime()
    {
        return this._totalTime;
    }
}