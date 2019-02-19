import MVC from "puremvc";
import { GameProxyEvent } from "../../Event/GameEvent";

export class GameMediator extends MVC.Mediator
{
    static get NAME () 
    {
        return "GameMediator";
    }

    constructor(viewComponent)
    {
        super(GameMediator.NAME, viewComponent);

    }

    listNotificationInterests ()
    {
        return [
            GameProxyEvent.initGame,
            GameProxyEvent.statechagne,
            GameProxyEvent.updata,
            GameProxyEvent.jump,
            GameProxyEvent.die
        ];
    }

    handleNotification (notification)
    {
        switch (notification.getName())
        {
            case GameProxyEvent.initGame:
                this.viewComponent.init(notification.getBody());
                break;
            case GameProxyEvent.statechagne:
                this.viewComponent.statechange(notification.getBody());
                break;
            case GameProxyEvent.updata:
                this.viewComponent.updata();
                break;
            case GameProxyEvent.jump:
                this.viewComponent.Bird.jump();
                break;
            case GameProxyEvent.die:
                this.viewComponent.die();
                break;
            default:
                break;
        }
    }
}