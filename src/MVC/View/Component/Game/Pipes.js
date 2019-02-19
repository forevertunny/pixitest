import * as PIXI from "pixi.js";
import { Pipe } from "./Pipe";
import Isaac from "../../../../Isaac";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class Pipes extends PIXI.Container
{
    constructor()
    {
        super();

        this._pipeCount = 10;
        this._pipeSpeed = 3;

        this._pipes = [];
        this._pipeSprites = [];

        this._currCheckPipe = 0;

        this._minY;
        this._maxY;
        this._spaceX = 200;

        this._isAddScore = true;
    }

    init (data)
    {

        this._minY = this.parent.StageHeight * 0.25;
        this._maxY = this.parent.StageHeight * 0.62;

        for (let i in data)
        {
            this._pipeSprites.push({
                up: PIXI.Texture.fromFrame(data[i].up),
                down: PIXI.Texture.fromFrame(data[i].down),
            })
        }

        this.createPipe();
    }

    createPipe ()
    {
        for (let i = 0; i < this._pipeCount; i++)
        {
            let pipe = new Pipe(this.randomPipe());
            pipe.randomY(this.randomY());
            pipe.x = this.parent.StageWidth + i * this._spaceX + 50;
            this.addChild(pipe);
            this._pipes.push(pipe);
        }
    }

    reset ()
    {
        for (let i in this._pipes)
        {
            this._pipes[i].changeSprite(this.randomPipe());
            this._pipes[i].randomY(this.randomY());
            this._pipes[i].x = this.parent.StageWidth + i * this._spaceX + 50;
        }
        this._currCheckPipe = 0;
    }

    updata (birdRect)
    {

        for (let i = 0; i < this._pipes.length; i++)
        {
            this._pipes[i].x -= this._pipeSpeed;

            if (this._pipes[i].x < -50)
            {
                this._pipes[i].x += this._pipes.length * this._spaceX;
                this._pipes[i].randomY(this.randomY());
                this._pipes[i].changeSprite(this.randomPipe());
            }
        }

        let currPipeRect = this._pipes[this._currCheckPipe].Rect;
        // // console.lokg((birdRect.x1 > currPipeRect.up.x2 || birdRect.x2 < currPipeRect.up.x1));
        // if (!(birdRect.x1 > currPipeRect.up.x2 || birdRect.x2 < currPipeRect.up.x1) || !(birdRect.x1 > currPipeRect.down.x2 || birdRect.x2 < currPipeRect.down.x1))
        // {
        //     //console.log(birdRect.y1 + "  " + birdRect.y2 + "  " + currPipeRect.up.y1 + "  " + currPipeRect.up.y2);
        //     if (!(birdRect.y1 > currPipeRect.up.y2 || birdRect.y2 < currPipeRect.up.y1))
        //     {
        //         ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.die);
        //     }

        //     if (!(birdRect.y1 > currPipeRect.down.y2 || birdRect.y2 < currPipeRect.down.y1))
        //     {
        //         ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.die);
        //     }
        // }
        // else if (birdRect.x1 > currPipeRect.up.x2 || birdRect.x1 > currPipeRect.down.x2)
        // {
        //     this._currCheckPipe++;
        //     this._currCheckPipe %= this._pipes.length;
        //     ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.addscore);
        // }

        // console.log(birdRect);



        if (this.collision(birdRect, currPipeRect.up) || this.collision(birdRect, currPipeRect.down))
        {
            ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.die);
        }
        if ((this.checkAddScore(birdRect, currPipeRect.up) || this.checkAddScore(birdRect, currPipeRect.down)) && this._isAddScore)
        {
            ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.addscore);
            this._isAddScore = false;
        }

        if (this.checkAddPipeCount(birdRect, currPipeRect.up) || this.checkAddPipeCount(birdRect, currPipeRect.down))
        {
            this._currCheckPipe++;
            this._currCheckPipe %= this._pipes.length;
            this._isAddScore = true;
        }
    }

    collision (circle, rect)
    {
        var distX = Math.abs(circle.x - rect.x - rect.w / 2);
        var distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r))
        {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r))
        {
            return false;
        }

        if (distX <= (rect.w / 2))
        {
            return true;
        }
        if (distY <= (rect.h / 2))
        {
            return true;
        }

        var dx = distX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }

    checkAddScore (circle, rect)
    {
        if (circle.x > rect.x + rect.w / 2 && circle.x < rect.x + rect.w)
        {
            return true;
        }

        return false;
    }

    checkAddPipeCount (circle, rect)
    {
        if (circle.x > rect.x + rect.w)
        {
            return true;
        }
        return false;
    }

    randomPipe ()
    {
        let random = Math.floor(Math.random() * this._pipeSprites.length);
        return this._pipeSprites[random];
    }

    randomY ()
    {
        return Isaac.Tools.Tool.RandomRange(this._minY, this._maxY);
    }
}