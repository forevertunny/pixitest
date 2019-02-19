import * as PIXI from "pixi.js";
import * as Tween from "gsap";
import { ApplicationFacade } from "../../../App/ApplicationFacade";
import { GameCommandEvent } from "../../../Event/GameEvent";

export class Bird extends PIXI.Container
{

    constructor()
    {
        super();

        this._bird_anima;
        this._bird_tween;

        this._bird_skins;


        this._gravity = 0.25;
        this._velocity = 0;
        this._position = 180;
        this._rotation = 0;
        this._jump = -4.6;

        this._min_rot = 0;
        this._max_rot = 0;
        this._radius = 0;
    }

    init (data)
    {
        this._min_rot = -20 * Math.PI / 90;
        this._max_rot = 45 * Math.PI / 90;

        this._bird_skins = data;

        this._bird_anima = new PIXI.extras.AnimatedSprite.fromFrames(data.red);
        this._bird_anima.anchor.set(0.5);
        this._bird_anima.animationSpeed = 0.15;
        this._bird_anima.loop = true;
        this.addChild(this._bird_anima);
        this._bird_anima.play();

        this._bird_tween = Tween.TweenMax.to(this._bird_anima, 0.5,
            {
                y: 10,
                yoyo: true,
                repeat: -1,
                ease: Tween.Sine.easeInOut,
                yoyoEase: Tween.Sine.easeInOut,
            })


        // this._bird_anima.rotation = 45 * (Math.PI / 90);
        this.randomSkin();

        this._radius = this.dis(new PIXI.Point(this.Rectangles.x1, this.Rectangles.y1), new PIXI.Point(this.x, this.y)) * 0.6;
        this.drawCircle(new PIXI.Point(0, 0), 0x0000ff, this._radius);
    }

    reset ()
    {
        this._bird_anima.rotation = 0;
        this._bird_tween.paused(false);
    }

    play ()
    {
        this._bird_anima.y = 0;
        this._bird_tween.paused(true);
        this.jump();
    }

    jump ()
    {
        this._velocity = this._jump;

        this._bird_anima.rotation = this._min_rot;
    }

    rotateAngle (point, angle)
    {

        let radius = this.dis(point, new PIXI.Point(0, 0)) / 2;

        let x = (point.x + radius * Math.sin(angle));
        let y = (point.y + radius * Math.cos(angle));
    }

    drawCircle (point, color, radius = 1, width = 1)
    {
        let numberOfPoints = 360 / 5;
        let points = [];
        for (let theta = 0; theta < 360; theta += 5)
        {
            let x = (point.x + radius * Math.cos(this.ToRadian(theta)));
            let y = (point.y + radius * Math.sin(this.ToRadian(theta)));

            points.push(new PIXI.Point(x, y));
        }
        let graphic = new PIXI.Graphics();
        graphic.lineStyle(width, color);

        for (let i = 0; i < points.length; i++)
        {
            if (i == 0)
            {
                graphic.moveTo(points[i].x, points[i].y);
            }
            else
            {
                graphic.lineTo(points[i].x, points[i].y);
            }
        }
        graphic.closePath();
        this.addChild(graphic);
    }



    ToRadian (degress)
    {
        return degress * (Math.PI / 180);
    }

    dis (point1, point2)
    {
        let a = Math.abs(point1.x - point2.x);
        let b = Math.abs(point1.y - point2.y);
        return Math.sqrt(a * a + b * b);
    }

    updata ()
    {
        this._velocity += this._gravity;
        this.upbird();
    }

    upbird ()
    {
        this.y += this._velocity;
        if (this._velocity > 0)
        {
            this._bird_anima.rotation = Math.min(this._max_rot, this._bird_anima.rotation + 1 * (Math.PI / 90));
        }

    }

    goDown (colliderH)
    {
        if (this.y > colliderH - this._radius)
        {
            ApplicationFacade.getInstance(this.parent.Key).sendNotification(GameCommandEvent.gameover);
        }
        else
        {
            this._bird_anima.rotation = this._max_rot;
            this._velocity += this._gravity;
            this.y += this._velocity;
        }
    }

    randomSkin ()
    {
        let keys = Object.keys(this._bird_skins);
        let rand = Math.floor(Math.random() * keys.length);
        let skin = this._bird_skins[keys[rand]];

        let frames = [];
        for (let i = 0; i < skin.length; i++)
        {
            frames.push(PIXI.Texture.fromFrame(skin[i]));
        }
        this._bird_anima.textures = frames;
        this._bird_anima.play();
    }

    get Rectangles ()
    {
        return {
            x1: this.x + this._bird_anima.x - this._bird_anima.width * this._bird_anima.anchor.x,
            y1: this.y + this._bird_anima.y - this._bird_anima.height * this._bird_anima.anchor.y,
            x2: this.x + this._bird_anima.x + this._bird_anima.width * (1 - this._bird_anima.anchor.x),
            y2: this.y + this._bird_anima.y + this._bird_anima.height * (1 - this._bird_anima.anchor.y)
        }
    }

    get Circle ()
    {
        return {
            x: this.x,
            y: this.y,
            r: this._radius

        }
    }
}