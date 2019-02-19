import Isaac from "../../../../Isaac";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class Click extends Isaac.UI.Container
{
    _mask;

    constructor(data)
    {
        super(data.width, data.height);

        this._mask = new Isaac.UI.Sprite();
        this._mask.width = "100%";
        this._mask.height = "100%";
        this.addChild(this._mask);

        this._mask.container.interactive = true;
        this._mask.container.on("click", () =>
        {
            ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.click);
        });
    }
}