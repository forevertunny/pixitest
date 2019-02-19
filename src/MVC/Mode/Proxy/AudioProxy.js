import MVC from "puremvc";
import * as PIXI from "pixi.js";
import "pixi-sound";
import { AudioManifest } from "../Data/AudioManifest";
import Isaac from "../../../Isaac";

export class AudioProxy extends MVC.Proxy
{
    static get Name () 
    {
        return "AudioProxy";
    }



    constructor(key)
    {
        super(AudioProxy.NAME);

        this._soundLoader;

        this._isLoadComplete;

        this._sounds;

        this._isMuteAll = false;
        this._isRealMuteAll = false;
        this._isPauseAll = false;
        this._isRealPauseAll = false;

        this._playTemp = [];

        this.initializeNotifier(key);

        this.init();
    }

    // onRegister ()
    // {
    //     if (PIXI.sound.context == null)
    //     {
    //         PIXI.sound.init();
    //     }
    // }

    onRemove ()
    {
        this.stopAll();
        PIXI.sound.removeAll();
        // PIXI.sound.close();
    }

    init ()
    {

        this._sounds = new Isaac.Tools.Map();

        this._soundLoader = new PIXI.loaders.Loader();

        for (let i in AudioManifest)
        {
            this._soundLoader.add(i, AudioManifest[i]);
        }

        this._soundLoader.load((loader, res) => 
        {
            for (let i in AudioManifest)
            {
                this._sounds.push(this.spKey(AudioManifest[i]), res[i].sound);
            }

            this._isLoadComplete = true;


            if (this._playTemp.length > 0)
            {
                for (let i = 0; i < this._playTemp.length; i++)
                {
                    this.play(this._playTemp[i]);
                }

                this._playTemp = [];
            }
        });
    }

    play (data)
    {
        if (data.key !== undefined)
        {
            data.key = this.spKey(data.key);
        }
        else return;

        if (!this._isLoadComplete) 
        {
            this._playTemp.push(data);
            return;
        }

        if (this._sounds.containsKey(data.key))
        {
            if (data.plural !== undefined)
            {
                if (this._sounds.getValue(data.key).isPlaying && data.plural === false)
                {
                    return;
                }
            }

            if (data.delay !== undefined)
            {
                setTimeout(() =>
                {
                    this._sounds.getValue(data.key).play(
                        {
                            start: data.start || 0,
                            end: data.end || null,
                            speed: data.speed || 1,
                            volume: data.volume || 1,
                            loop: data.loop || false,
                            complete: data.callback || null
                        });
                }, data.delay);
            }
            else
            {
                this._sounds.getValue(data.key).play(
                    {
                        start: data.start || 0,
                        end: data.end || null,
                        speed: data.speed || 1,
                        volume: data.volume || 1,
                        loop: data.loop || false,
                        complete: data.callback || null
                    });
            }
        }
    }

    stop (key)
    {
        let spkey = this.spKey(key);
        if (!this._isLoadComplete) return;

        if (this._sounds.containsKey(spkey))
        {
            this._sounds.getValue(spkey).stop();
        }
    }

    stopAll ()
    {
        if (!this._isLoadComplete) return;

        // PIXI.sound.stopAll();
        for (let i in this._sounds.Keys)
        {
            this.stop(this._sounds.Keys[i]);
        }
    }

    pause (key)
    {
        let spkey = this.spKey(key);
        if (!this._isLoadComplete) return;

        if (this._sounds.containsKey(spkey))
        {
            if (this._sounds.getValue(spkey).paused === undefined || this._sounds.getValue(spkey).paused === null)
            {
                this._sounds.getValue(spkey).pause();
            }
            else if (!this._sounds.getValue(spkey).paused)
            {
                this._sounds.getValue(spkey).pause();
            }
            else
            {
                this._sounds.getValue(spkey).resume();
            }
        }
    }

    pauseAll ()
    {

        if (!this._isLoadComplete) return;

        if (this._isRealMuteAll)
        {
            this._isPauseAll = !this._isPauseAll;
            return;
        }

        this._isRealPauseAll = !this._isRealPauseAll;
        this._isPauseAll = this._isRealPauseAll;

        // PIXI.sound.togglePauseAll();
        for (let i in this._sounds.Keys)
        {
            this.pause(this._sounds.Keys[i]);
        }

        if (this._isMuteAll !== this._isRealMuteAll)
        {
            this.muteAll();
        }
    }

    mute (key)
    {
        let spkey = this.spKey(key);
        if (!this._isLoadComplete) return;

        if (this._sounds.containsKey(spkey))
        {
            this._sounds.getValue(spkey).muted = !this._sounds.getValue(spkey).muted;
        }
    }

    muteAll ()
    {
        if (!this._isLoadComplete) return;

        if (this._isRealPauseAll)
        {
            this._isMuteAll = !this._isMuteAll;
            return;
        }

        this._isRealMuteAll = !this._isRealMuteAll;
        this._isMuteAll = this._isRealMuteAll;

        //PIXI.sound.toggleMuteAll();
        for (let i in this._sounds.Keys)
        {
            this.mute(this._sounds.Keys[i]);
        }

        if (this._isPauseAll !== this._isRealPauseAll)
        {
            this.pauseAll();
        }
    }

    volume (key, num)
    {
        let spkey = this.spKey(key);
        if (!this._isLoadComplete) return;

        if (this._sounds.containsKey(spkey))
        {
            this._sounds.getValue(spkey).volume = num;
        }
    }

    volumeAll (num)
    {
        if (!this._isLoadComplete) return;

        for (let i in this._sounds.Keys)
        {
            this.volume(this._sounds.Keys[i], num);
        }
    }

    spKey (source)
    {
        let sptemp = source.split('/');
        return sptemp[sptemp.length - 1];
    }

}