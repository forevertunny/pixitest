export var Continuation =
    {
        Continue: 0,
        Cancel: 1,
    };

export class Intervals
{
    setIntervalHandle = null;
    setIntervalLastTime = 0;

    paused = false;

    clientCallbacks = [];

    // Constants
    static get DEFAULT_MILLISECOND_INTERVAL() { return 30; }


    //
    // Starts the interval
    //
    start( clientCallback )
    {

        // Add this to the list
        this.clientCallbacks.push( clientCallback );

        // If we have a valid interval, don't bother continuing as we're already running
        if ( this.setIntervalHandle !== null )
        {
            return;
        }

        // Get the time and start
        this.setIntervalLastTime = ( new Date() ).getTime();
        this.setIntervalHandle = setInterval( () => this.setIntervalCallback(), Intervals.DEFAULT_MILLISECOND_INTERVAL );
    }

    //
    // Manually stops the interval
    //
    stop()
    {

        // Clear the callbacks
        this.clientCallbacks = [];
        this.paused = false;

        // If we don't have an interval, we have nothing to do
        if ( this.setIntervalHandle === null )
        {
            return;
        }

        // Simply stop the interval
        clearInterval( this.setIntervalHandle );
        this.setIntervalHandle = null;
    }

    //
    // Pauses the current interval
    //
    pause( pause )
    {
        this.paused = pause;
    }

    //
    // Interval callback
    //
    setIntervalCallback()
    {

        // If we don't have an interval handle, we cannot continue
        if ( this.setIntervalHandle === null )
        {
            return;
        }

        // Before we get the callback, callculate the time difference
        let currentTime = ( new Date() ).getTime();
        let timeDelta = ( currentTime - this.setIntervalLastTime ) / 1000;

        // Only enable the callbacks if we're not paused
        if ( this.paused === false )
        {

            // We need to make a deep copy of the callback lists
            // so clients can add intervals during a callback
            let currentCallbacks = [];
            for ( let i = 0; i < this.clientCallbacks.length; ++i )
            {
                currentCallbacks.push( this.clientCallbacks[ i ] );
            }

            // Trigger the clients callbacks
            for ( let i = 0; i < currentCallbacks.length; i++ )
            {

                let thisCallback = currentCallbacks[ i ];
                let continueWithInterval = thisCallback( timeDelta );

                // Should we continue with this callback?
                if ( continueWithInterval === Continuation.Cancel )
                {
                    let callbackIndex = this.clientCallbacks.indexOf( thisCallback );
                    if ( callbackIndex !== -1 )
                    {
                        this.clientCallbacks.splice( callbackIndex, 1 );
                    }
                }
            }
        }

        // Save our callback time
        this.setIntervalLastTime = currentTime;

        // Should we continue
        if ( this.clientCallbacks.length === 0 )
        {
            this.stop();
        }
    }
}