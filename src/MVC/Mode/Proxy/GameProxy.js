import * as  PIXI from "pixi.js";
import MVC from "puremvc";
import { GameProxyEvent } from "../../Event/GameEvent";
import { GameState } from "../../Other/GameState";
import Isaac from "../../../Isaac";

export class GameProxy extends MVC.Proxy
{
    static NAME = "GameProxy";

    _loader;
    _ticker;

    _score = 0;
    _bestScore = 0;

    _gameState = null;

    constructor(key)
    {
        super();

        this.initializeNotifier(key);
    }

    onRemove ()
    {

    }

    enable ()
    {

        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add(() => this.updata());

        this._loader = new PIXI.loaders.Loader();
        this._loader.add("sprites", "assets/sprites.json")
            .add("bitfnt", "assets/bigfont.fnt")
            .add("Numfnt", "assets/N.fnt")
            .add("Energy_Object02", "assets/Energy_Object02.png")
            .load((loader, res) =>
            {
                console.log(res);

                let bigfonts = [];
                for (let i = 0; i < 10; i++)
                {
                    bigfonts.push(Isaac.Tools.Tool.Format("bigfont_{0}.png", i));
                }

                this.sendNotification(GameProxyEvent.initUI, {
                    menu: {
                        title: "title.png",
                        ratebtn: "button_rate.png",
                        playbtn: "button_play.png",
                        scorebtn: "button_score.png",
                        copyright: "brand_copyright.png",
                        Energy_Object02: "Energy_Object02"
                    },
                    ready: {
                        text_ready: "text_ready.png",
                        tutorial: "tutorial.png",
                    },
                    gameover: {
                        title: "text_game_over.png",
                        playbtn: "button_play.png",
                        scorebtn: "button_score.png",
                        broad: "score_panel.png",
                        menu: "button_menu.png"
                    },
                    bigfonts: bigfonts,
                });

                this.sendNotification(GameProxyEvent.initGame,
                    {
                        background: { day: "bg_day.png", night: "bg_night.png" },
                        bird: { yellow: ["bird0_0.png", "bird0_1.png", "bird0_2.png"], blue: ["bird1_0.png", "bird1_1.png", "bird1_2.png"], red: ["bird2_0.png", "bird2_1.png", "bird2_2.png"] },
                        pipe: [{ up: "pipe1_up.png", down: "pipe1_down.png" }, { up: "pipe2_up.png", down: "pipe2_down.png" }],
                        forceground: { land: "land.png" }
                    });


                this._gameState = GameState.Menu;
                this.sendNotification(GameProxyEvent.statechagne, this._gameState);

                this._ticker.start();

                console.log(this._ticker);
            })
    }

    ready ()
    {
        console.log("ready");
        // 閃黑
        // 鳥移動
        // UI 改變
        this.sendNotification(GameProxyEvent.upscore, this._score);
        this._gameState = GameState.Ready;
        this.sendNotification(GameProxyEvent.statechagne, this._gameState);
    }

    click ()
    {
        if (this._gameState == GameState.Ready)
        {
            console.log("Play");
            this._gameState = GameState.GameIng;
            this.sendNotification(GameProxyEvent.upscore, this._score);
            this.sendNotification(GameProxyEvent.statechagne, this._gameState);
        }
        else
        {
            this.sendNotification(GameProxyEvent.jump);
        }
    }

    updata ()
    {
        this.sendNotification(GameProxyEvent.updata);
    }

    addscore ()
    {
        this._score += 1;
        this.sendNotification(GameProxyEvent.upscore, this._score);
    }

    die ()
    {
        this.sendNotification(GameProxyEvent.die);
    }

    gomenu ()
    {
        this._gameState = GameState.Menu;
        this.sendNotification(GameProxyEvent.statechagne, this._gameState);
    }

    gameOver ()
    {
        if (this._score > this._bestScore)
        {
            this._bestScore = this._score;
        }
        this._gameState = GameState.GameOver;
        this.sendNotification(GameProxyEvent.statechagne, this._gameState);

        this._score = 0;
    }
}