import MVC from "puremvc";
import { ApplicationMediator } from "../../App/ApplicationMediator";

export class AppCommand extends MVC.SimpleCommand {


    execute(notification) {
        //var main: ApplicationMain = notification.getBody();
        this.facade.registerMediator(new ApplicationMediator(notification.getBody()));
    }
}