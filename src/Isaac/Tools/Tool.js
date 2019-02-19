export class Tool
{
    static RandomRange( min, max )
    {
        return Math.random() * ( max - min + 1 ) + min;
    }


    static Format()
    {
        var s = arguments[ 0 ];
        if ( s == null ) return "";
        for ( var i = 0; i < arguments.length - 1; i++ )
        {
            var reg = this.getStringFormatPlaceHolderRegEx( i );
            s = s.replace( reg, ( arguments[ i + 1 ] == null ? "" : arguments[ i + 1 ] ) );
        }
        return this.cleanStringFormatResult( s );
    }

    static PpadLeft( str, len, char )
    {
        str = '' + str;
        if ( str.length >= len )
        {
            return str;
        }
        else
        {
            return this.PadLeft( char + str, len, char );
        }
    }

    static PadRight( str, len, char )
    {
        str = '' + str;
        if ( str.length >= len )
        {
            return str;
        } else
        {
            return this.PadRight( str + char, len, char );
        }
    }

    static getStringFormatPlaceHolderRegEx( placeHolderIndex )
    {
        return new RegExp( '({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm' )
    }

    static cleanStringFormatResult( txt )
    {
        if ( txt == null ) return "";
        return txt.replace( this.getStringFormatPlaceHolderRegEx( "\\d+" ), "" );
    }
}