import * as Dat from "dat.gui";
import MVC from "puremvc";

export class DatGuiProxy extends MVC.Proxy
{
    static NAME = "DatGuiProxy";

    _gui;

    constructor(key)
    {
        super(DatGuiProxy.NAME);

        this.initializeNotifier(key);

        this._gui = new Dat.GUI();

        Dat.GUI.toggleHide();
    }

    active (bool)
    {
        if (bool)
        {
            Dat.GUI.toggleHide();
        }
    }
}


