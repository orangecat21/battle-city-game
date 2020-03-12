import DisplayObject from "./DisplayObject.js";

export default class Sprite extends DisplayObject {
    constructor(texture, args = {}) {
        super(args);

        this.texture = texture;

        const frame = args.frame || {};
        this.frame = {
            x: frame.x || 0,
            y: frame.y || 0,
            width: frame.width || texture.width,
            height: frame.height || texture.height
        };

        args.width ? this.width : this.width = this.frame.width;
        args.height ? this.height : this.height = this.frame.height;
    }

    draw(canvas, context) {
        context.save();

        context.translate(this.x, this.y);
        context.rotate(-this.rotation);
        context.scale(this.scaleX,this.scaleY); 

        context.drawImage(
            this.texture,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.absoluteX - this.x,
            this.absoluteY - this.y,
            this.width,
            this.height
        );

        context.restore();
    }
}