import Isaac from "../../../../Isaac";

export class Score extends Isaac.UI.Container
{
    _num_bitmap;
    _bigfont = [];

    init ()
    {
        this._num_bitmap = new Isaac.UI.BitmapText("0", { font: '80px bitfont' });
        this._num_bitmap.pivot = 0.5;
        this._num_bitmap.x = "50%";
        this._num_bitmap.y = "10%";
        this.addChild(this._num_bitmap);
    }

    upScore (num)
    {
        this._num_bitmap.text = "" + num;
    }
}