export class MapInfo
{
    // _Key;
    // _Value;

    constructor(key, value)
    {
        this._Key = key;
        this._Value = value;
    }

    get Key ()
    {
        return this._Key;
    }

    get Value ()
    {
        return this._Value;
    }
}

export class Map
{

    constructor()
    {
        this._elements = [];
    }

    get length ()
    {
        return this._elements.length;
    }

    //判断MAP是否为空
    get isEmpty ()
    {
        return (this.length < 1);
    }

    get Elements ()
    {
        return this._elements;
    }

    //删除MAP所有元素
    clear ()
    {
        this._elements = [];
    }

    push (_key, _value)
    {
        let tmepfind = this.containsKey(_key) === true ? this._elements.find(s => s.Key === _key) : null;

        if (tmepfind != null)
        {
            tmepfind.Value = _value;
        }
        else
        {
            this._elements.push(new MapInfo(_key, _value));
        }
    }

    remove (_key)
    {
        var find = false;
        try
        {
            for (let i = 0; i < this._elements.length; i++)
            {
                if (this._elements[i].Key === _key)
                {
                    this._elements.splice(i, 1);
                }
            }
        }
        catch (e)
        {
            find = false;
        }

        return find;
    }

    getValue (_key)
    {
        try
        {
            for (let i = 0; i < this._elements.length; i++)
            {
                if (this._elements[i].Key === _key)
                {
                    return (this._elements[i].Value);
                }
            }
            return null;
        }
        catch (e)
        {
            return null;
        }
    }

    element (_index)
    {
        if (_index < 0 || _index >= this._elements.length)
        {
            return null;
        }
        return this._elements[_index];
    }

    containsKey (_key)
    {
        return this._elements.some(s => s.Key === _key);
    }

    containsValue (_value)
    {
        return this._elements.some(s => s.Value === _value);
    }

    get Values ()
    {
        var arr = [];
        for (let i = 0; i < this._elements.length; i++)
        {
            arr.push(this._elements[i].Value);
        }
        return arr;
    }

    get Keys ()
    {
        var arr = [];
        for (let i = 0; i < this._elements.length; i++)
        {
            arr.push(this._elements[i].Key);
        }
        return arr;
    }
}