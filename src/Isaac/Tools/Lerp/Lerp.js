import { Intervals, Continuation } from "./Intervals";

//
// Types of lerps available
//
// Transition style
export var Transition =
{
    EaseOut: "EaseOut",
    EaseIn: "EaseIn",
    EaseInOut: "EaseInOut",
}

// Movement style
export var Style =
{
    Linear: "Linear",
    Quadratic: "Quadrati",
    Sine: "Sine",
    Exponential: "Exponential",
    Cubic: "Cubi",
}

//
// Lerps a given set of values over time
//

export class Lerp
{



    constructor()
    {
        this.currentTime = 0;
        this.lerpValues = [[0, 0]];

        this.duration = 0;

        this.lerpFunctions = {};
        this.lerpIntervals = new Intervals();

        this.clientCallback = null;

        this.transition = Transition.EaseOut;
        this.style = Style.Quadratic;

        this.constructLerpFunctions();
    }

    //
    // Sets multiple values to be lerped over
    //
    define (lerpValues, duration, transition = Transition.EaseOut, style = Style.Quadratic)
    {
        this.lerpValues = lerpValues;

        this.duration = duration;
        this.currentTime = 0;

        this.transition = transition;
        this.style = style;

        this.clientCallback = null;
    }

    //
    // Lerps the given values
    //
    lerp (clientCallback)
    {

        // If duration is 0, we have nothing to do
        if (this.duration === 0)
        {
            return;
        }

        // If we're already lerping, don't bother
        if (this.clientCallback !== null)
        {
            return;
        }

        // Start our interval poll
        this.clientCallback = clientCallback;
        this.lerpIntervals.start((timeDelta) =>
        {
            return this.intervalCallback(timeDelta);
        });
    }

    //
    // Pauses this current lerp
    //
    pause (paused)
    {
        this.lerpIntervals.pause(paused);
    }

    //
    // Stops this current lerp
    //
    stop ()
    {
        this.lerpIntervals.stop();
        this.clientCallback = null;
    }

    //
    // Interval callback to lerp our values
    //
    intervalCallback (timeDelta)
    {

        // Don't bother if we don't have a client callback
        if (this.clientCallback === null)
        {
            return Continuation.Cancel;
        }

        // Increase our time
        this.currentTime += timeDelta;
        this.currentTime = Math.min(this.currentTime, this.duration);

        // Just lerp each element
        let lerpResults = [];
        for (let index = 0; index < this.lerpValues.length; ++index)
        {

            // Pull out this set of values
            let currentLerpValues = this.lerpValues[index];

            // Get the function we need to call
            let functionToCall = this.calculateLerpFunction();

            // Lerp the values
            let lerpDistance = currentLerpValues[1] - currentLerpValues[0];
            let lerpedValue = functionToCall(currentLerpValues[0], lerpDistance, this.duration, this.currentTime);

            // Add our result
            lerpResults.push(lerpedValue);
        }

        // Update our client
        let currentTime = this.currentTime / this.duration;
        this.clientCallback(lerpResults, currentTime);

        // Are we finished?
        let finished = (currentTime === 1);
        return finished === true ? Continuation.Cancel : Continuation.Continue;
    }

    //
    // Returns the lep function to call
    //
    calculateLerpFunction ()
    {

        // Get the styles we are interested in using
        let transition = Transition[this.transition];
        let style = Style[this.style];

        // Build up the function name and get our function
        let functionName = 'lerpStyle' + transition + style;
        let functionToCall = this.lerpFunctions[functionName];

        // Send back our function
        return functionToCall;
    }

    //
    // Builds up the function map for the lerp functions
    // I'd like to do this a better way using reflection, but TypeScript seems to confuse that
    //
    constructLerpFunctions ()
    {

        // Quadratic

        // lerpStyleEaseOutQuadratic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseOut] + Style[Style.Quadratic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseOutQuadratic(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInQuadratic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseIn] + Style[Style.Quadratic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInQuadratic(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInOutQuadratic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseInOut] + Style[Style.Quadratic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInOutQuadratic(initial, lerpDistance, duration, currentTime);
            };

        // Linear

        // lerpStyleLinear
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseOut] + Style[Style.Linear]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleLinear(initial, lerpDistance, duration, currentTime);
            };
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseIn] + Style[Style.Linear]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleLinear(initial, lerpDistance, duration, currentTime);
            };
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseInOut] + Style[Style.Linear]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleLinear(initial, lerpDistance, duration, currentTime);
            };

        // Sine

        // lerpStyleEaseOutSine
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseOut] + Style[Style.Sine]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseOutSine(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInSine
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseIn] + Style[Style.Sine]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInSine(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInOutSine
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseInOut] + Style[Style.Sine]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInOutSine(initial, lerpDistance, duration, currentTime);
            };

        // Exponential

        // lerpStyleEaseOutExponential
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseOut] + Style[Style.Exponential]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseOutExponential(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInExponential
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseIn] + Style[Style.Exponential]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInExponential(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInOutExponential
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseInOut] + Style[Style.Exponential]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInOutExponential(initial, lerpDistance, duration, currentTime);
            };

        // Cubic

        // lerpStyleEaseOutCubic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseOut] + Style[Style.Cubic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseOutCubic(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInCubic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseIn] + Style[Style.Cubic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInCubic(initial, lerpDistance, duration, currentTime);
            };

        // lerpStyleEaseInOutCubic
        this.lerpFunctions['lerpStyle' + Transition[Transition.EaseInOut] + Style[Style.Cubic]] =
            (initial, lerpDistance, duration, currentTime) =>
            {
                return this.lerpStyleEaseInOutCubic(initial, lerpDistance, duration, currentTime);
            };
    }

    //
    // Linear lerp
    //
    lerpStyleLinear (initial, lerpDistance, duration, currentTime)
    {
        return ((lerpDistance * currentTime) / duration) + initial;
    }

    //
    // Quadratic easing out
    //
    lerpStyleEaseOutQuadratic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration;
        return -lerpDistance * currentTime * (currentTime - 2) + initial;
    }

    //
    // Quadratic easing in
    //
    lerpStyleEaseInQuadratic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration;
        return lerpDistance * currentTime * currentTime + initial;
    }

    //
    // Quadratic easing in/out
    //
    lerpStyleEaseInOutQuadratic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration / 2;
        if (currentTime < 1)
        {
            return (lerpDistance / 2) * currentTime * currentTime + initial;
        }

        currentTime--;
        return -lerpDistance / 2 * (currentTime * (currentTime - 2) - 1) + initial;
    }

    //
    // Sine easing out
    //
    lerpStyleEaseOutSine (initial, lerpDistance, duration, currentTime)
    {
        return lerpDistance * Math.sin(currentTime / duration * (Math.PI / 2)) + initial;
    }

    //
    // Sine easing in
    //
    lerpStyleEaseInSine (initial, lerpDistance, duration, currentTime)
    {
        return -lerpDistance * Math.cos(currentTime / duration * (Math.PI / 2)) + lerpDistance + initial;
    }

    //
    // Sine easing in/out
    //
    lerpStyleEaseInOutSine (initial, lerpDistance, duration, currentTime)
    {
        return -lerpDistance / 2 * (Math.cos(Math.PI * currentTime / duration) - 1) + initial;
    }

    //
    // Exponential easing out
    //
    lerpStyleEaseOutExponential (initial, lerpDistance, duration, currentTime)
    {
        return lerpDistance * (-Math.pow(2, -10 * currentTime / duration) + 1) + initial;
    }

    //
    // Exponential easing in
    //
    lerpStyleEaseInExponential (initial, lerpDistance, duration, currentTime)
    {
        return lerpDistance * Math.pow(2, 10 * (currentTime / duration - 1)) + initial;
    }

    //
    // Exponential easing in/out
    //
    lerpStyleEaseInOutExponential (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration / 2;
        if (currentTime < 1)
        {
            return lerpDistance / 2 * Math.pow(2, 10 * (currentTime - 1)) + initial;
        }

        currentTime--;
        return lerpDistance / 2 * (-Math.pow(2, -10 * currentTime) + 2) + initial;
    }

    //
    // Cubic easing out
    //
    lerpStyleEaseOutCubic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration;
        currentTime--;
        return lerpDistance * (currentTime * currentTime * currentTime + 1) + initial;
    }

    //
    // Cubic easing in
    //
    lerpStyleEaseInCubic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration;
        return lerpDistance * currentTime * currentTime * currentTime + initial;
    }

    //
    // Cubic easing in/out
    //
    lerpStyleEaseInOutCubic (initial, lerpDistance, duration, currentTime)
    {
        currentTime /= duration / 2;
        if (currentTime < 1)
        {
            return lerpDistance / 2 * currentTime * currentTime * currentTime + initial;
        }

        currentTime -= 2;
        return lerpDistance / 2 * (currentTime * currentTime * currentTime + 2) + initial;
    }
}
