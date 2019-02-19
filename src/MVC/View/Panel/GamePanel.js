import * as PIXI from "pixi.js";
import { ApplicationFacade } from "../../App/ApplicationFacade";
import { GameMediator } from "../Mediator/GameMediator";
import { BackGround } from "../Component/Game/BackGround";
import { Bird } from "../Component/Game/Bird";
import { GameState } from "../../Other/GameState";
import { Pipes } from "../Component/Game/Pipes";
import { FroceGround } from "../Component/Game/FroceGround";

export class GamePanel extends PIXI.Container
{
    _width;
    _height;
    _key;

    _bacground;
    _pipes;
    _bird;
    _forceground;

    constructor(data)
    {
        super();
        this._width = data.width;
        this._height = data.height;
        this._key = data.key;




        this._isPlay = false;
        this._isDie = false;

        this.once("added", () => this.onAdded())
    }

    onAdded ()
    {
        ApplicationFacade.getInstance(this._key).registerMediator(new GameMediator(this));

        this._bacground = new BackGround();
        this.addChild(this._bacground);

        this._pipes = new Pipes();
        this.addChild(this._pipes);

        this._forceground = new FroceGround();
        this.addChild(this._forceground);

        this._bird = new Bird();
        this.addChild(this._bird);
    }

    init (data)
    {
        this._bacground.init(data.background);
        this._pipes.init(data.pipe);
        this._bird.init(data.bird);
        this._forceground.init(data.forceground);
    }

    statechange (state)
    {
        switch (state)
        {
            case GameState.Menu:
                this._bird.position.set(this.StageWidth * 0.5, this.StageHeight * 0.33);
                this._bird.reset();
                this._pipes.reset();
                break;
            case GameState.Ready:
                this._bird.position.set(this.StageWidth * 0.4, this.StageHeight * 0.45);
                this._bird.reset();
                this._pipes.reset();
                break;
            case GameState.GameIng:
                this._isPlay = true;
                //this._pipes.play();
                this._bird.play();
                break;
            case GameState.GameOver:
                this._isPlay = false;
                this._isDie = false;
                break;
            default:
                break;
        }
    }

    updata ()
    {
        // this._bacground.updata();
        if (this._isPlay)
        {
            if (!this._isDie)
            {
                this._forceground.updata(this._bird.Circle);
                this._pipes.updata(this._bird.Circle);
                this._bird.updata();
            }
            else
            {
                this._bird.goDown(this._forceground.ColliderH)
            }
        }
    }

    die ()
    {
        this._isDie = true;
    }

    get StageWidth ()
    {
        return this._width;
    }

    get StageHeight ()
    {
        return this._height;
    }

    get Bird ()
    {
        return this._bird;
    }

    get Key ()
    {
        return this._key;
    }
}