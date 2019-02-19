import puremvc from "puremvc";
import { ApplicationFacadeEvent } from "../Event/ApplicationFacadeEvent";
import { InitMacroCommand } from "../Controller/Init/Initialization";


export class ApplicationFacade extends puremvc.Facade
{
    // static Name = "ApplicationFacade";

    static get Name ()
    {
        return "ApplicationFacade";
    }

    /** @override */
    initializeController ()
    {
        super.initializeController();

        this.registerCommand(ApplicationFacadeEvent.INITSIMLECOMMAND, InitMacroCommand);
    }

    /** @override */
    initializeModel ()
    {
        super.initializeModel();
    }

    /** @override */
    initializeView ()
    {
        super.initializeView();
    }

    SetMainViwe (rootview)
    {
        this.sendNotification(ApplicationFacadeEvent.INITSIMLECOMMAND, rootview);
        this.removeCommand(ApplicationFacadeEvent.INITSIMLECOMMAND);
        //this.sendNotification(ApplicationFacadeEvent.INITIALIZATION);
    }

    static getInstance (multitonKey)
    {
        const instanceMap = puremvc.Facade.instanceMap;
        if (!instanceMap[multitonKey])
        {
            instanceMap[multitonKey] = new ApplicationFacade(multitonKey);
        }
        return instanceMap[multitonKey];
    }

    static Destroy (key)
    {
        if (puremvc.Facade.hasCore(key))
        {
            let mediator = puremvc.View.getInstance(key);
            if (mediator != null)
            {
                for (let i in mediator.mediatorMap)
                {
                    mediator.removeMediator(mediator.mediatorMap[i].mediatorName);
                }
            }

            let controller = puremvc.Controller.getInstance(key);
            if (controller != null)
            {
                let commandkeys = Object.keys(controller.commandMap);
                for (let i in commandkeys)
                {
                    controller.removeCommand(commandkeys[i]);
                }
            }

            let model = puremvc.Model.getInstance(key);
            if (model != null)
            {
                for (let i in model.proxyMap)
                {
                    model.removeProxy(model.proxyMap[i].proxyName);
                }
            }
            puremvc.Facade.removeCore(key);
        }
    }
}