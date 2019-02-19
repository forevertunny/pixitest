import MVC from "puremvc";
import { DatGuiEvent } from "../../Event/DatGuiEvent";
import { DatGuiProxy } from "../../Mode/Proxy/DatGuiProxy";


export class DatGuiCommand extends MVC.SimpleCommand
{
    static NAME = "DatGuiCommand";

    constructor(key)
    {
        super();

        this.initializeNotifier(key);
    }

    register ()
    {
        let registers = [
            DatGuiEvent.ACTIVE
        ];

        registers.forEach(key =>
        {
            this.getFacade().registerCommand(key, DatGuiCommand);
        });
    }

    execute (notification)
    {
        let datguiProxy = this.getFacade().retrieveProxy(DatGuiProxy.NAME);

        switch (notification.getName())
        {
            case DatGuiEvent.ACTIVE:
                datguiProxy.active(notification.getBody());
                break;
            default:
                break;
        }
    }
}