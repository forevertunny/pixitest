import MVC from "puremvc";
import { GameProxy } from "../../Mode/Proxy/GameProxy";
import { GameCommandEvent } from "../../Event/GameEvent";

export class GameCommand extends MVC.SimpleCommand
{

    static NAME = "GameCommand";

    constructor(key)
    {
        super();

        this.initializeNotifier(key);
    }


    register ()
    {
        let keys = [
            GameCommandEvent.enable,
            GameCommandEvent.gomenu,
            GameCommandEvent.ready,
            GameCommandEvent.play,
            GameCommandEvent.click,
            GameCommandEvent.addscore,
            GameCommandEvent.die,
            GameCommandEvent.gameover
        ];

        keys.forEach(key =>
        {
            this.getFacade().registerCommand(key, GameCommand);
        });
    }

    execute (notification)
    {
        switch (notification.getName())
        {
            case GameCommandEvent.enable:
                this.gameProxy.enable();
                break;
            case GameCommandEvent.gomenu:
                this.gameProxy.gomenu();
                break;
            case GameCommandEvent.ready:
                this.gameProxy.ready();
                break;
            case GameCommandEvent.play:
                this.gameProxy.play();
                break;
            case GameCommandEvent.click:
                this.gameProxy.click();
                break;
            case GameCommandEvent.addscore:
                this.gameProxy.addscore();
                break;
            case GameCommandEvent.die:
                this.gameProxy.die();
                break;
            case GameCommandEvent.gameover:
                this.gameProxy.gameOver();
                break;
            default:
                break;
        }
    }

    get gameProxy ()
    {
        return this.getFacade().retrieveProxy(GameProxy.NAME);
    }
}