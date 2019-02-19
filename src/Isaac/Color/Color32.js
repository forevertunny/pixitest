import * as PIXI from "pixi.js";

export class ColorRGB 
{
    /**
     * @type {number}
     */
    _r;
    /**
     * @type {number}
     */
    _g;
    /**
     * @type {number}
     */
    _b;

    /**
     * 
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     */
    constructor( r = 0, g = 0, b = 0 )
    {
        this._r = r;
        this._g = g;
        this._b = b;
    }

    get r()
    {
        return this._r;
    }
    set r( v )
    {
        this._r = v;
    }

    get g()
    {
        return this._g;
    }
    set g( v )
    {
        this._r = v;
    }

    get b()
    {
        return this._b;
    }
    set b( v )
    {
        this._b = v;
    }

    /**
    * 
    * @param {ColorRGB} c2 
    */
    IsEqual( c2 )
    {
        if ( this.r === c2.r && this.g === c2.g && this.b === c2.b )
        {
            return true;
        }

        return false;
    }

    /**
    * 
    * @param {ColorRGB} c1 
    * @param {ColorRGB} c2 
    */
    static IsEqual( c1, c2 )
    {
        if ( c1.r === c2.r && c1.g === c2.g && c1.b === c2.b )
        {
            return true;
        }

        return false;
    }
}


export class Color32
{
    static get red()
    {
        return new Color32( new ColorRGB( 255, 0, 0 ) );
    }

    static get green()
    {
        return new Color32( new ColorRGB( 0, 255, 0 ) );
    }

    static get blue()
    {
        return new Color32( new ColorRGB( 0, 0, 255 ) );
    }

    static get white()
    {
        return new Color32( new ColorRGB( 255, 255, 255 ) );
    }

    static get black()
    {
        return new Color32( new ColorRGB( 0, 0, 0 ) );
    }


    static get yellow()
    {
        return new Color32( new ColorRGB( 255, 235, 4 ) );
    }

    static get cyan()
    {
        return new Color32( new ColorRGB( 0, 255, 255 ) );
    }

    static get magenta()
    {
        return new Color32( new ColorRGB( 255, 0, 255 ) );
    }

    static get gray()
    {
        return new Color32( new ColorRGB( 125, 125, 125 ) );
    }

    static RandomColor()
    {
        let h = Math.random();
        let s = 0.3 + Math.random() * ( 0.4 - 0.3 );
        let v = 0.45 + Math.random() * ( 0.6 - 0.45 );

        return new Color32( Color32.hsvToColor( { h: h, s: s, v: v } ) );
    }

    static RandomDrakColor()
    {
        let h = Math.random();
        let s = 0.8;
        let v = 0.1;

        return new Color32( Color32.hsvToColor( { h: h, s: s, v: v } ) );
    }

    _colorRGB;

    /**
     * 
     * @param {ColorRGB|Color32|String|Number} color 
     */
    constructor( color )
    {
        if ( color instanceof Color32 )
        {
            this._colorRGB = new ColorRGB( color.ColorRGB.r, color.ColorRGB.g, color.ColorRGB.b );
        }
        else if ( color instanceof ColorRGB )
        {
            this._colorRGB = color;
        }
        else 
        {
            let tempHex = Color32.hexToRgb( color );
            if ( tempHex !== null )
            {
                this._colorRGB = new ColorRGB( tempHex.r, tempHex.g, tempHex.b );
            }
            else this._colorRGB = new ColorRGB();
        }
    }

    /**
     * 
     * @param {number} c 
     */
    static numberToHex( c )
    {
        var hex = c.toString( 16 );
        return hex.length === 1 ? "0" + hex : hex;
    }

    /**
     * 
     * @param {ColorRGB} colorRGB 
     */
    static rgbToNumber( colorRGB ) 
    {
        return colorRGB.r * 65536 + colorRGB.g * 256 + colorRGB.b;
    }

    /**
     * 
     * @param {number} c 
     */
    static numberToRgb( c ) 
    {
        return {
            r: Math.floor( c / ( 256 * 256 ) ),
            g: Math.floor( c / 256 ) % 256,
            b: c % 256,
        };
    }

    /**
    * 
    * @param {ColorRGB} colorRGB 
    */
    static rgbToHex( colorRGB )
    {
        return "#" + this.numberToHex( colorRGB.r ) + this.numberToHex( colorRGB.g ) + this.numberToHex( colorRGB.b );
    }

    /**
     * 
     * @param {String|number} hex 
     */
    static hexToRgb( hex )
    {
        if ( hex === null )
            hex = 0xffffff;

        if ( !isNaN( hex ) ) return this.numberToRgb( hex );

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace( shorthandRegex, function ( m, r, g, b )
        {
            return r + r + g + g + b + b;
        } );

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );

        return result ? {
            r: parseInt( result[ 1 ], 16 ),
            g: parseInt( result[ 2 ], 16 ),
            b: parseInt( result[ 3 ], 16 )
        } : null;
    }

    static hsvToColor( hsv )
    {
        let r = hsv.cv;
        let g = hsv.cv;
        let b = hsv.cv;

        if ( hsv.v <= 0 )
            hsv.v = 0.001;
        if ( hsv.v >= 1 )
            hsv.v = 0.999;

        if ( hsv.s !== 0 )
        {
            var v2 = hsv.v < 0.5 ? hsv.v * ( hsv.s + 1 ) : hsv.v + hsv.s - hsv.v * hsv.s;
            var v1 = hsv.v * 2 - v2;
            r = this.conventRGB( v1, v2, hsv.h + 1 / 3 );
            g = this.conventRGB( v1, v2, hsv.h );
            b = this.conventRGB( v1, v2, hsv.h - 1 / 3 );
        }

        return new ColorRGB( Math.floor( r * 255 ), Math.floor( g * 255 ), Math.floor( b * 255 ) );
    }

    static conventRGB( v1, v2, h )
    {
        if ( h < 0 ) h += 1;
        if ( h > 1 ) h -= 1;
        if ( h * 6 < 1 ) return v1 + ( v2 - v1 ) * h * 6;
        if ( h * 2 < 1 ) return v2;
        if ( h * 3 < 2 ) return v1 + ( v2 - v1 ) * ( 2 / 3 - h ) * 6;
        return v1;
    }

    /**
    * 
    * @param {ColorRGB} colorRGB 
    */
    static rgbToHSV( colorRGB )
    {
        let h = 0, s = 0, v = 0;
        let max = Math.max( colorRGB.r, Math.max( colorRGB.g, colorRGB.b ) ) / 255;
        let min = Math.min( colorRGB.r, Math.min( colorRGB.g, colorRGB.b ) ) / 255;

        v = ( max + min ) / 2;

        if ( min !== max )
        {
            let delata = max - min;
            s = 1 > 0.5 ? delata / ( 2 - max - min ) : delata / ( min + max );

            if ( max === colorRGB.r / 255 )
            {
                h = ( colorRGB.g - colorRGB.b ) / 255 / delata + ( colorRGB.g < colorRGB.b ? 6 : 0 );
            }
            else if ( max === colorRGB.g / 255 )
            {
                h = ( colorRGB.b - colorRGB.r ) / 255 / delata + 2;
            }
            else if ( max === colorRGB.b / 255 )
            {
                h = ( colorRGB.r - colorRGB.g ) / 255 / delata + 4;
            }

            h /= 6;
        }

        return { h: h, s: s, v: v }
    }

    /**
     * 
     * @param {Color32|ColorRGB} color 
     * @param {PIXI.BLEND_MODES.ADD} blendMode 
     */
    static rgbToMatrix( color, blendMode )
    {
        color = color instanceof Color32 ? color.ColorRGB : color;
        let result = new PIXI.filters.ColorMatrixFilter();
        result.blendMode = blendMode;
        result.matrix = [
            color.r / 255, 0, 0, 0, 0,
            0, color.g / 255, 0, 0, 0,
            0, 0, color.b / 255, 0, 0,
            0, 0, 0, 1, 0
        ];
        return result;
    }

    /**
     * 
     * @param {Color32} c2 
     */
    IsEqual( c2 )
    {
        return ColorRGB.IsEqual( this._colorRGB, c2.ColorRGB );
    }

    /**
     * 
     * @param {Color32} c1 
     * @param {Color32} c2 
     */
    static IsEqual( c1, c2 )
    {
        return ColorRGB.IsEqual( c1.ColorRGB, c2.ColorRGB );
    }

    /**
     * 
     * @param {ColorRGB|color} from 
     * @param {ColorRGB|color} to 
     * @param {number} t 
     */
    static Lerp( from, to, t )
    {
        let tempT = t < 0 ? 0 : ( t > 1 ? 1 : t );
        let colorFrom = from instanceof Color32 ? from.ColorRGB : from;
        let colorTo = to instanceof Color32 ? to.ColorRGB : to;

        return new Color32(
            new ColorRGB
                (
                colorFrom.r + ( colorTo.r - colorFrom.r ) * tempT,
                colorFrom.g + ( colorTo.g - colorFrom.g ) * tempT,
                colorFrom.b + ( colorTo.b - colorFrom.b ) * tempT
                ) );

        //return new Color(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t);
    }

    get ColorRGB()
    {
        return this._colorRGB;
    }

    get ColorHSV()
    {
        return Color32.rgbToHSV( this._colorRGB );
    }

    get ColorHEX()
    {
        return Color32.rgbToHex( this._colorRGB )
    }
}