import MVC from "puremvc";
import { AudioCommandEvent } from "../../Event/AudioEvent";
import { AudioProxy } from "../../Mode/Proxy/AudioProxy";

export class AudioCommand extends MVC.SimpleCommand
{
    static get Name () 
    {
        return "AudioCommand";
    }

    constructor(key)
    {
        super();

        this.initializeNotifier(key);
    }

    register ()
    {
        let keys = [
            AudioCommandEvent.PLAY,
            AudioCommandEvent.STOP,
            AudioCommandEvent.STOPALL,
            AudioCommandEvent.PAUSE,
            AudioCommandEvent.PAUSEALL,
            AudioCommandEvent.MUTEALL,
            AudioCommandEvent.VOLUMEALL,
        ];

        keys.forEach(key =>
        {
            this.getFacade().registerCommand(key, AudioCommand);
        });
    }

    execute (notification)
    {
        let audioProxy = this.getFacade().retrieveProxy(AudioProxy.NAME);

        switch (notification.getName())
        {
            case AudioCommandEvent.PLAY:
                audioProxy.play(notification.getBody());
                break;
            case AudioCommandEvent.PAUSE:
                audioProxy.pause(notification.getBody());
                break;
            case AudioCommandEvent.PAUSEALL:
                audioProxy.pauseAll();
                break;
            case AudioCommandEvent.STOP:
                audioProxy.stop(notification.getBody());
                break;
            case AudioCommandEvent.STOPALL:
                audioProxy.stopAll(notification.getBody());
                break;
            case AudioCommandEvent.MUTEALL:
                audioProxy.muteAll();
                break;
            case AudioCommandEvent.VOLUMEALL:
                audioProxy.volumeAll(notification.getBody());
                break;
            default:
                break;
        }

    }
}