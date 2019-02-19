import * as puremvc from "puremvc";

export class ApplicationMediator extends puremvc.Mediator
{
    static get Name () 
    {
        return "ApplicationMediator";
    }

    constructor(viewComponent)
    {
        super(ApplicationMediator.Name, viewComponent);
    }

    listNotificationInterests ()
    {
        return [];
    }

    handleNotification (notification)
    {


    }

    get main ()
    {
        return this.viewComponent;
    }
}

