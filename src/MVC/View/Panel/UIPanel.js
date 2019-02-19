import Isaac from "../../../Isaac";
import { ApplicationFacade } from "../../App/ApplicationFacade";
import { UIMediator } from "../Mediator/UIMediator";
import { Menu } from "../Component/UI/Menu";
import { GameState } from "../../Other/GameState";
import { Ready } from "../Component/UI/Ready";
import { Score } from "../Component/UI/Score";
import { Click } from "../Component/UI/Click";
import { GameOver } from "../Component/UI/GameOver";

export class UIPanel extends Isaac.UI.Stage
{
    // _width;
    // _height;
    // _key;

    // _meun;
    // _ready;
    // _score;
    // _clickPanel;
    // _gameover;

    constructor(data)
    {
        super(data.width, data.height);

        this._width = data.width;
        this._height = data.height;
        this._key = data.key;

        this.once("added", () => this.onAdded());
    }

    onAdded ()
    {
        ApplicationFacade.getInstance(this._key).registerMediator(new UIMediator(this));

        this._clickPanel = new Click({ width: this._width, height: this._height });
        this.addChild(this._clickPanel);

        this._meun = new Menu(this._width, this._height);
        this.addChild(this._meun);

        this._ready = new Ready(this._width, this._height);
        this.addChild(this._ready);

        this._score = new Score(this._width, this._height);
        this.addChild(this._score);

        this._gameover = new GameOver(this._width, this._height);
        this.addChild(this._gameover);
    }

    init (data)
    {
        this._meun.init(data.menu);
        this._ready.init(data.ready);
        this._score.init();
        this._gameover.init(data.gameover);
    }

    statechange (state)
    {
        switch (state)
        {
            case GameState.Menu:
                this._clickPanel.visible = false;
                this._ready.visible = false;
                this._meun.visible = true;
                this._score.visible = false;
                this._gameover.visible = false;
                break;
            case GameState.Ready:
                this._clickPanel.visible = true;
                this._meun.visible = false;
                this._ready.visible = true;
                this._score.visible = true;
                this._gameover.visible = false;
                break;
            case GameState.GameIng:
                this._ready.visible = false;
                break;
            case GameState.GameOver:
                this._gameover.visible = true;
                break;
            default:
                break;
        }
    }

    die ()
    {
        this._clickPanel.visible = false;
    }

    get Key ()
    {
        return this._key;
    }

    get Score ()
    {
        return this._score;
    }
}