import MVC from "puremvc";
import { GameProxyEvent } from "../../Event/GameEvent";

export class UIMediator extends MVC.Mediator
{
    static get NAME ()
    {
        return "UIMediator";
    }

    constructor(viewComponent)
    {
        super(UIMediator.NAME, viewComponent);
    }

    listNotificationInterests ()
    {
        return [
            GameProxyEvent.initUI,
            GameProxyEvent.statechagne,
            GameProxyEvent.upscore,
            GameProxyEvent.die
        ];
    }

    handleNotification (notification)
    {
        switch (notification.getName())
        {
            case GameProxyEvent.initUI:
                this.viewComponent.init(notification.getBody());
                break;
            case GameProxyEvent.statechagne:
                this.viewComponent.statechange(notification.getBody());
                break;
            case GameProxyEvent.upscore:
                this.viewComponent.Score.upScore(notification.getBody());
                break;
            case GameProxyEvent.die:
                this.viewComponent.die();
                break;
            default:
                break;
        }
    }
}