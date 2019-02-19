import puremvc from "puremvc";
import { AppCommand } from "../Command/AppCommand";
import { AudioCommand } from "../Command/AudioCommand";
import { AudioProxy } from "../../Mode/Proxy/AudioProxy";
// import { DatGuiCommand } from "../Command/DatGuiCommand";
// import { DatGuiProxy } from "../../Mode/Proxy/DatGuiProxy";
import { GameCommand } from "../Command/GameCommand";
import { GameProxy } from "../../Mode/Proxy/GameProxy";



export class InitMacroCommand extends puremvc.MacroCommand
{

    initializeMacroCommand ()
    {

        this.addSubCommand(InitSimleCommand);
        this.addSubCommand(AppCommand);
    }
}

export class InitSimleCommand extends puremvc.SimpleCommand
{

    execute (notification)
    {
        /**
         * Command Register
         */
        //( new Sample.SampleCommand() ).register();
        (new AudioCommand(this.facade.multitonKey)).register();
        // (new DatGuiCommand(this.facade.multitonKey)).register();
        (new GameCommand(this.facade.multitonKey)).register();
        /** 
         * Proxy Register
         */
        //this.facade.registerProxy( new Sample.SampleProxy() );
        this.facade.registerProxy(new AudioProxy(this.facade.multitonKey));
        // this.facade.registerProxy(new DatGuiProxy(this.facade.multitonKey));
        this.facade.registerProxy(new GameProxy(this.facade.multitonKey));
    }
}